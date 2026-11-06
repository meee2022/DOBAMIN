import type { Order } from '../orders-api';
import shop from '../shop-config.json';
import { Props, text } from './OrderParts.web';

export default function OrderReceipt({
  ar,
  order,
  onContinue,
}: Props & { order: Order; onContinue: () => void }) {
  const t = (a: string, e: string) => text(ar, a, e);
  return (
    <div className="order-receipt">
      <svg
        className="receipt-mark"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
      <h2>{t('تم استلام طلبك', 'Request received')}</h2>
      <p>
        {t(
          'حُفظ طلبك وهو بانتظار مراجعة فريق التجهيز وتأكيده.',
          'It is saved for the preparation team and awaits confirmation.',
        )}
      </p>
      <strong dir="ltr">{order.id}</strong>
      <p>
        {order.day} · {order.time} {t('بتوقيت قطر', 'Qatar time')}
      </p>
      {shop.whatsapp && (
        <a
          className="button secondary"
          href={`https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(`${t('طلب رقم', 'Request')} ${order.id}`)}`}
          target="_blank"
          rel="noreferrer"
        >
          {t('تأكيد عبر واتساب', 'Confirm on WhatsApp')}
        </a>
      )}
      <a className="button primary" href="#/orders" onClick={onContinue}>
        {t('متابعة طلباتي', 'View my requests')}
      </a>
      <button
        className="text-button"
        onClick={() => {
          onContinue();
          location.hash = 'collection';
        }}
      >
        {t('متابعة التسوق', 'Continue shopping')}
      </button>
    </div>
  );
}
