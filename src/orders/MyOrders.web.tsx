import React, { useCallback, useEffect, useState } from 'react';
import { api, customerToken, Order } from '../orders-api';
import { Details, Props, Status, text } from './OrderParts.web';
import BrandPageHeader from '../BrandPageHeader.web';
import { orderMessage } from '../order-messages';

export default function MyOrders({ ar }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [tracked, setTracked] = useState<Order | null>(null);
  const [trackError, setTrackError] = useState('');
  const t = (a: string, e: string) => text(ar, a, e);
  const load = useCallback(async () => {
    setError('');
    try {
      const data = await api<{ orders: Order[] }>('/my-orders', {
        method: 'POST',
        body: { ownerToken: customerToken() },
      });
      setOrders(data.orders);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, [load]);
  async function track(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTrackError('');
    setTracked(null);
    const body = Object.fromEntries(new FormData(event.currentTarget));
    try {
      setTracked((await api<{ order: Order }>('/track', { method: 'POST', body })).order);
    } catch (e) {
      setTrackError((e as Error).message);
    }
  }
  return (
    <section className="orders-page">
      <BrandPageHeader
        ar={ar}
        title={t('متابعة الطلبات والحجوزات', 'Track orders and bookings')}
        description={t(
          'تابع طلباتك وحجوزاتك، أو ابحث برقم الطلب ورقم الهاتف.',
          'Follow your orders and bookings, or look up a request with its number and phone.',
        )}
        actions={
          <button
            className="button secondary"
            onClick={() => {
              setBusy(true);
              load();
            }}
            disabled={busy}
          >
            {t('تحديث', 'Refresh')}
          </button>
        }
      />
      {error && (
        <p className="form-error" role="alert">
          {orderMessage(error, ar)}
        </p>
      )}
      {busy && <p role="status">{t('جارٍ تحميل الطلبات…', 'Loading requests…')}</p>}
      {!busy && !error && !orders.length && (
        <div className="orders-empty">
          <h2>{t('لا توجد طلبات مسجّلة', 'No requests have been recorded')}</h2>
          <p>
            {t(
              'تصفح المنتجات وأضف اختياراتك إلى سلة التسوق، أو أرسل طلب حجز لمناسبتك.',
              'Browse the products, add your selections to the shopping cart, or submit an occasion booking request.',
            )}
          </p>
          <a className="button primary" href="#collection">
            {t('تصفح المنتجات', 'Browse the collection')}
          </a>
        </div>
      )}
      <div className="customer-orders">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-card-top">
              <strong dir="ltr">{order.id}</strong>
              <Status ar={ar} status={order.status} />
            </div>
            <h2>
              {order.day} <span>· {order.time}</span>
            </h2>
            <p className="timezone">
              {t('موعد التجهيز المطلوب · توقيت قطر', 'Requested preparation · Qatar time')}
            </p>
            <Details ar={ar} order={order} />
          </article>
        ))}
      </div>
      <form className="order-form" onSubmit={track}>
        <h2>{t('متابعة طلب من جهاز آخر', 'Track a request from another device')}</h2>
        <div className="form-row">
          <label>
            {t('رقم الطلب', 'Request number')}
            <input name="id" dir="ltr" placeholder="DP-…" minLength={15} maxLength={15} required />
          </label>
          <label>
            {t('رقم الهاتف', 'Phone number')}
            <input name="phone" type="tel" dir="ltr" minLength={7} maxLength={24} required />
          </label>
        </div>
        {trackError && (
          <p className="form-error" role="alert">
            {orderMessage(trackError, ar)}
          </p>
        )}
        <button className="button secondary">{t('تتبّع الطلب', 'Track request')}</button>
      </form>
      {tracked && (
        <article className="order-card">
          <div className="order-card-top">
            <strong dir="ltr">{tracked.id}</strong>
            <Status ar={ar} status={tracked.status} />
          </div>
          <h2>
            {tracked.day} <span>· {tracked.time}</span>
          </h2>
          <Details ar={ar} order={tracked} />
        </article>
      )}
    </section>
  );
}
