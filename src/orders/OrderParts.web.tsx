import { Order, OrderStatus, statusLabels } from '../orders-api';

export type Props = { ar: boolean };
export const text = (ar: boolean, a: string, e: string) => (ar ? a : e);

export function Status({ status, ar }: Props & { status: OrderStatus }) {
  return (
    <span className={`order-status status-${status}`}>{statusLabels[status][ar ? 0 : 1]}</span>
  );
}
export function Details({ order, ar }: Props & { order: Order }) {
  const t = (a: string, e: string) => text(ar, a, e);
  return (
    <>
      <div className="order-info">
        <span>
          {order.fulfillment === 'delivery'
            ? t('توصيل مطلوب', 'Delivery requested')
            : t('استلام من المتجر', 'Store pickup')}
        </span>
        <span>
          {order.kind === 'booking'
            ? t('حجز مناسبة', 'Occasion booking')
            : t('طلب منتجات', 'Product order')}
        </span>
      </div>
      {order.items.length > 0 && (
        <ul className="order-lines">
          {order.items.map((p) => (
            <li key={p.id}>
              <span>{ar ? p.ar : p.en}</span>
              <strong>× {p.quantity}</strong>
            </li>
          ))}
        </ul>
      )}
      {order.address && (
        <p className="order-note">
          <b>{t('العنوان: ', 'Address: ')}</b>
          {order.address}
        </p>
      )}
      {order.notes && (
        <p className="order-note">
          <b>{t('ملاحظات: ', 'Notes: ')}</b>
          {order.notes}
        </p>
      )}
      <p className="order-amount">
        {order.kind === 'booking' || order.total === null
          ? t('السعر بعد مراجعة التفاصيل', 'Price after review')
          : `${t('إجمالي الطلب', 'Order total')}: ${order.total} ${t('ر.ق', 'QAR')}`}
      </p>
    </>
  );
}
