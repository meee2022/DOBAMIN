import React, { useCallback, useEffect, useState } from 'react';
import { api, Order, qatarToday, statusLabels } from '../orders-api';
import { Details, Props, Status, text } from './OrderParts.web';
import { orderMessage } from '../order-messages';

export default function AdminOrders({ ar }: Props) {
  const [token, setToken] = useState(() => sessionStorage.getItem('dopamine-admin-session') || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [day, setDay] = useState(qatarToday());
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState('');
  const [stamp, setStamp] = useState('');
  const t = (a: string, e: string) => text(ar, a, e);
  const load = useCallback(async () => {
    if (!token) return;
    try {
      const result = await api<{ orders: Order[] }>('/admin/orders', { token });
      setOrders(result.orders);
      setError('');
      setStamp(new Date().toLocaleTimeString(ar ? 'ar-QA' : 'en-GB'));
    } catch (e) {
      if ((e as { status?: number }).status === 401) {
        setToken('');
        sessionStorage.removeItem('dopamine-admin-session');
      }
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [token, ar]);
  useEffect(() => {
    if (!token) return;
    setBusy(true);
    load();
    const timer = setInterval(load, 10000);
    return () => clearInterval(timer);
  }, [load, token]);
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const key = String(new FormData(e.currentTarget).get('key'));
    try {
      const result = await api<{ token: string }>('/admin/login', {
        method: 'POST',
        body: { key },
      });
      sessionStorage.setItem('dopamine-admin-session', result.token);
      setToken(result.token);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function update(order: Order, next: string) {
    setUpdating(order.id);
    setError('');
    try {
      const result = await api<{ order: Order }>(`/admin/orders/${order.id}`, {
        method: 'PATCH',
        token,
        body: { status: next, updatedAt: order.updatedAt },
      });
      setOrders((old) => old.map((o) => (o.id === order.id ? result.order : o)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUpdating('');
    }
  }
  if (!token)
    return (
      <section className="admin-login">
        <h1>{t('مساحة فريق دوبامين', 'Dopamine team space')}</h1>
        <p>
          {t(
            'سجّل الدخول لمتابعة الطلبات ومواعيد التجهيز.',
            'Sign in to manage requests and preparation dates.',
          )}
        </p>
        <form className="order-form" onSubmit={login}>
          <label>
            {t('مفتاح دخول الإدارة', 'Admin access key')}
            <input name="key" type="password" autoComplete="current-password" required />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {orderMessage(error, ar)}
            </p>
          )}
          <button className="button primary" disabled={busy}>
            {busy ? t('جارٍ الدخول…', 'Signing in…') : t('تسجيل الدخول', 'Sign in')}
          </button>
        </form>
      </section>
    );
  const today = qatarToday();
  const active = orders.filter((o) => !['cancelled', 'completed'].includes(o.status));
  const shown = orders.filter(
    (o) =>
      (!day || o.day === day) &&
      (status === 'all' || o.status === status) &&
      `${o.name} ${o.phone} ${o.id}`.toLowerCase().includes(search.toLowerCase().trim()),
  );
  const groups = [...new Set(shown.map((o) => o.day))].sort();
  return (
    <section className="orders-page admin-page">
      <div className="orders-heading">
        <div>
          <h1>{t('جدول التجهيز', 'Preparation schedule')}</h1>
          <p>
            {t(
              'تُحدّث قائمة الطلبات تلقائيًا كل ١٠ ثوانٍ.',
              'Every request, on time. Refreshes every 10 seconds.',
            )}
          </p>
        </div>
        <div className="admin-actions">
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
          <button
            className="text-button"
            onClick={async () => {
              try {
                await api('/admin/logout', { method: 'POST', token });
              } catch {
              } finally {
                sessionStorage.removeItem('dopamine-admin-session');
                setToken('');
                setOrders([]);
              }
            }}
          >
            {t('تسجيل الخروج', 'Sign out')}
          </button>
        </div>
      </div>
      <div className="order-stats">
        <div>
          <strong>{active.filter((o) => o.day === today).length}</strong>
          <span>{t('للتجهيز اليوم', 'To prepare today')}</span>
        </div>
        <div>
          <strong>{orders.filter((o) => o.status === 'pending').length}</strong>
          <span>{t('بانتظار التأكيد', 'Awaiting confirmation')}</span>
        </div>
        <div>
          <strong>{active.filter((o) => o.day < today).length}</strong>
          <span>{t('طلبات متأخرة', 'Overdue requests')}</span>
        </div>
        <div>
          <strong>{active.filter((o) => o.day > today).length}</strong>
          <span>{t('مواعيد قادمة', 'Upcoming requests')}</span>
        </div>
      </div>
      <div className="admin-filters">
        <label>
          {t('يوم التجهيز', 'Preparation day')}
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
        </label>
        <button className="text-button" onClick={() => setDay(today)}>
          {t('اليوم', 'Today')}
        </button>
        <button className="text-button" onClick={() => setDay('')}>
          {t('جميع الأيام', 'All dates')}
        </button>
        <label>
          {t('الحالة', 'Status')}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">{t('جميع الحالات', 'All statuses')}</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label[ar ? 0 : 1]}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label">
          {t('البحث عن طلب', 'Find customer or request')}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('اسم العميل، رقم الهاتف، رقم الطلب…', 'Name, phone, request number…')}
          />
        </label>
      </div>
      <div className="results-meta">
        <span>
          {shown.length} {t('طلب', 'requests')}
        </span>
        <span aria-live="polite">
          {busy
            ? t('جارٍ التحديث…', 'Refreshing…')
            : stamp
              ? `${t('آخر تحديث', 'Updated')} ${stamp}`
              : ''}
        </span>
      </div>
      {error && (
        <p role="alert" className="form-error">
          {orderMessage(error, ar)}
        </p>
      )}
      {!busy && !error && !shown.length && (
        <div className="orders-empty">
          <h2>{t('لا توجد طلبات مطابقة', 'No matching requests')}</h2>
          <p>
            {t(
              'اعرض جميع الأيام أو غيّر معايير البحث. ستظهر الطلبات الجديدة تلقائيًا.',
              'Try all dates or change the filters. New requests appear automatically.',
            )}
          </p>
          <button
            className="button secondary"
            onClick={() => {
              setDay('');
              setStatus('all');
              setSearch('');
            }}
          >
            {t('عرض جميع الطلبات', 'Show all requests')}
          </button>
        </div>
      )}
      {groups.map((date) => (
        <div className="day-group" key={date}>
          <h2>
            {new Intl.DateTimeFormat(ar ? 'ar-QA' : 'en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'Asia/Qatar',
            }).format(new Date(date + 'T12:00:00+03:00'))}
          </h2>
          {shown
            .filter((o) => o.day === date)
            .map((order) => (
              <article className="admin-order" key={order.id}>
                <div className="order-time">
                  <strong>{order.time}</strong>
                  <span>{t('توقيت قطر', 'Qatar time')}</span>
                </div>
                <div className="admin-order-content">
                  <div className="order-card-top">
                    <h3>{order.name}</h3>
                    <Status ar={ar} status={order.status} />
                  </div>
                  <div className="customer-contact">
                    <a href={`tel:${order.phone.replace(/[^\d+]/g, '')}`} dir="ltr">
                      {order.phone}
                    </a>
                    <span dir="ltr">{order.id}</span>
                  </div>
                  <Details ar={ar} order={order} />
                </div>
                <label className="status-control">
                  {t('تحديث حالة الطلب', 'Update status')}
                  <select
                    value={order.status}
                    disabled={!!updating}
                    onChange={(e) => update(order, e.target.value)}
                  >
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label[ar ? 0 : 1]}
                      </option>
                    ))}
                  </select>
                  {updating === order.id && (
                    <span role="status">{t('جارٍ الحفظ…', 'Saving…')}</span>
                  )}
                </label>
              </article>
            ))}
        </div>
      ))}
    </section>
  );
}
