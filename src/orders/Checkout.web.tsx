import React, { useRef, useState } from 'react';
import { api, customerToken, Order, qatarToday } from '../orders-api';
import { products } from '../catalog';
import shop from '../shop-config.json';
import { text } from './OrderParts.web';

export default function Checkout({
  ar,
  cart,
  onSaved,
  onBack,
  booking = false,
}: {
  ar: boolean;
  cart: Record<string, number>;
  onSaved: (order: Order) => void;
  onBack: () => void;
  booking?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [delivery, setDelivery] = useState(false);
  const requestKey = useRef(crypto.randomUUID());
  const t = (a: string, e: string) => text(ar, a, e);
  const selected = products.filter((p) => (cart[p.id] || 0) > 0);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const result = await api<{ order: Order }>('/orders', {
        method: 'POST',
        body: {
          ...fields,
          kind: booking ? 'booking' : 'order',
          fulfillment: delivery ? 'delivery' : 'pickup',
          items: selected.map((p) => ({ id: p.id, quantity: cart[p.id] })),
          ownerToken: customerToken(),
          requestKey: requestKey.current,
        },
      });
      onSaved(result.order);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="order-form-wrap">
      <button className="text-button" onClick={onBack}>
        {t('العودة', 'Back')}
      </button>
      <h2>
        {booking
          ? t('احجز لحظتك الخاصة', 'Plan your special moment')
          : t('تفاصيل طلبك', 'Your order details')}
      </h2>
      <p className="form-intro">
        {t(
          `نستقبل الطلبات قبل موعدها بـ ${shop.leadHours} ساعة على الأقل، من ${shop.opensAt} إلى ${shop.closesAt} بتوقيت قطر. سنراجع طلبك قبل تأكيده.`,
          `Orders need at least ${shop.leadHours} hours' notice, between ${shop.opensAt} and ${shop.closesAt} Qatar time. We review your request before confirming.`,
        )}
      </p>
      <form onSubmit={submit} className="order-form">
        <fieldset disabled={busy}>
          <label>
            {t('الاسم الكامل', 'Full name')}
            <input name="name" autoComplete="name" minLength={2} maxLength={80} required />
          </label>
          <label>
            {t('رقم التواصل', 'Phone number')}
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder="+974 …"
              pattern="\+?[0-9\s()\-]{7,24}"
              minLength={7}
              maxLength={24}
              required
            />
          </label>
          <div className="form-row">
            <label>
              {t('يوم التجهيز', 'Preparation date')}
              <input
                name="day"
                type="date"
                min={qatarToday()}
                max={new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10)}
                required
              />
            </label>
            <label>
              {t('الوقت المطلوب', 'Preferred time')}
              <input name="time" type="time" min={shop.opensAt} max={shop.closesAt} required />
            </label>
          </div>
          <label>
            {t('طريقة الاستلام', 'Fulfilment')}
            <select
              value={delivery ? 'delivery' : 'pickup'}
              onChange={(e) => setDelivery(e.target.value === 'delivery')}
            >
              <option value="pickup">{t('استلام من المتجر', 'Store pickup')}</option>
              <option value="delivery">
                {t('طلب توصيل، يحتاج تأكيدًا', 'Delivery request, subject to confirmation')}
              </option>
            </select>
          </label>
          {delivery && (
            <label>
              {t('العنوان والمنطقة', 'Address and area')}
              <textarea
                name="address"
                autoComplete="street-address"
                minLength={8}
                maxLength={300}
                required
                rows={2}
              />
            </label>
          )}
          <label>
            {booking
              ? t('تفاصيل المناسبة والكميات المطلوبة', 'Occasion and requested quantities')
              : t('ملاحظات إضافية (اختياري)', 'Additional notes (optional)')}
            <textarea
              name="notes"
              rows={3}
              minLength={booking ? 5 : undefined}
              maxLength={1000}
              required={booking}
            />
          </label>
          {!booking && (
            <div className="checkout-summary">
              {selected.map((p) => (
                <div key={p.id}>
                  <span>
                    {ar ? p.ar : p.en} × {cart[p.id]}
                  </span>
                  <span>
                    {p.price === null
                      ? t('عند التأكيد', 'On confirmation')
                      : `${p.price * cart[p.id]} ${t('ر.ق', 'QAR')}`}
                  </span>
                </div>
              ))}
              <div className="checkout-total">
                <strong>{t('إجمالي الطلب', 'Order total')}</strong>
                <strong>
                  {selected.some((p) => p.price === null)
                    ? t('يُحدّد عند التأكيد', 'On confirmation')
                    : `${selected.reduce((n, p) => n + (p.price ?? 0) * cart[p.id], 0)} ${t('ر.ق', 'QAR')}`}
                </strong>
              </div>
            </div>
          )}
          <p className="form-disclaimer">
            {t(
              'لا يتم الدفع الآن. التوفر والتوصيل والسعر النهائي تحتاج تأكيد الفريق.',
              'No payment is taken now. Availability, delivery and final pricing need team confirmation.',
            )}
          </p>
          <label className="consent">
            <input type="checkbox" required />
            {t(
              'أوافق على مشاركة بياناتي مع فريق دوبامين لمتابعة الطلب (الخصوصية والشروط في أسفل الصفحة).',
              'I agree to share my details with Dopamine to handle this request (see Privacy and terms in the footer).',
            )}
          </label>
        </fieldset>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button
          className="button primary"
          disabled={busy || (!booking && !selected.length)}
          type="submit"
        >
          {busy ? t('جارٍ حفظ طلبك…', 'Saving your request…') : t('إرسال الطلب', 'Submit request')}
        </button>
      </form>
    </div>
  );
}
