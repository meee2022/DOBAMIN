import React, { useState } from 'react';
import { products, assetUrl } from './catalog';
import Icon from './Icon.web';
import Checkout from './orders/Checkout.web';
import OrderReceipt from './orders/OrderReceipt.web';
import type { Order } from './orders-api';

type CartItems = Record<string, number>;
type Props = {
  ar: boolean;
  t: (a: string, e: string) => string;
  cart: CartItems;
  setCart: React.Dispatch<React.SetStateAction<CartItems>>;
  change: (id: string, amount: number) => void;
  dialog: React.RefObject<HTMLDialogElement | null>;
};

export default function Cart({ ar, t, cart, setCart, change, dialog }: Props) {
  const [checkout, setCheckout] = useState(false);
  const [savedOrder, setSavedOrder] = useState<Order | null>(null);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.some((p) => (cart[p.id] || 0) > 0 && p.price === null)
    ? null
    : products.reduce((sum, p) => sum + (p.price ?? 0) * (cart[p.id] || 0), 0);
  const money = (n: number | null) =>
    n === null ? t('يُحدّد عند التأكيد', 'On confirmation') : `${n} ${t('ر.ق', 'QAR')}`;
  return (
    <dialog
      ref={dialog}
      aria-label={t('حقيبتك الحلوة', 'Your sweet bag')}
      className="cart-dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
      onClose={() => {
        document.body.style.overflow = '';
        setCheckout(false);
        setSavedOrder(null);
      }}
    >
      <div className="cart-panel">
        <div className="cart-header">
          <h2>{t('حقيبتك الحلوة', 'Your sweet bag')}</h2>
          <button
            onClick={() => dialog.current?.close()}
            aria-label={t('إغلاق الحقيبة', 'Close bag')}
          >
            <Icon name="close" />
          </button>
        </div>
        {savedOrder ? (
          <OrderReceipt ar={ar} order={savedOrder} onContinue={() => dialog.current?.close()} />
        ) : checkout ? (
          <Checkout
            ar={ar}
            cart={cart}
            onBack={() => setCheckout(false)}
            onSaved={(order) => {
              setSavedOrder(order);
              setCart({});
              setCheckout(false);
            }}
          />
        ) : count === 0 ? (
          <div className="empty">
            <Icon name="bag" size={46} />
            <h3>{t('لحظتك الحلوة في انتظارك', 'Your sweet moment awaits')}</h3>
            <p>
              {t(
                'اكتشف المجموعة وأضف ما تحب إلى حقيبتك.',
                'Explore the collection and add something you love.',
              )}
            </p>
            <a
              href="#collection"
              className="button primary"
              onClick={() => dialog.current?.close()}
            >
              {t('تصفح المجموعة', 'Explore collection')}
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {products
                .filter((p) => cart[p.id] > 0)
                .map((p) => (
                  <div className="cart-item" key={p.id}>
                    <img src={assetUrl(p.image)} alt="" />
                    <div>
                      <h3>{ar ? p.ar : p.en}</h3>
                      <span>{money(p.price)}</span>
                      <div className="quantity">
                        <button
                          aria-label={t(`تقليل ${p.ar}`, `Decrease ${p.en}`)}
                          onClick={() => change(p.id, -1)}
                        >
                          <Icon name="minus" size={15} />
                        </button>
                        <span>{cart[p.id]}</span>
                        <button
                          aria-label={t(`زيادة ${p.ar}`, `Increase ${p.en}`)}
                          disabled={cart[p.id] >= 99}
                          onClick={() => change(p.id, 1)}
                        >
                          <Icon name="plus" size={15} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove"
                      aria-label={t(`حذف ${p.ar}`, `Remove ${p.en}`)}
                      onClick={() => setCart((old) => ({ ...old, [p.id]: 0 }))}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>{t('إجمالي الطلب', 'Order total')}</span>
                <strong>{money(total)}</strong>
              </div>
              <p>
                {t(
                  'أرسل اختياراتك وسنؤكّد السعر والتوفر قبل تجهيز الطلب. لا يتم الدفع الآن.',
                  'Send your selection. Price and availability are confirmed before preparation. No payment now.',
                )}
              </p>
              <button className="button primary" onClick={() => setCheckout(true)}>
                {t('اختيار موعد وإرسال الطلب', 'Schedule and submit request')}
                <Icon name="arrow" />
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
