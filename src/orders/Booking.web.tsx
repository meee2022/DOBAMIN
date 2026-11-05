import { useState } from 'react';
import type { Order } from '../orders-api';
import Checkout from './Checkout.web';
import OrderReceipt from './OrderReceipt.web';
import type { Props } from './OrderParts.web';
import BrandPageHeader from '../BrandPageHeader.web';
import { approvedGifts, requestedGift } from '../brand-experience';

export default function Booking({ ar }: Props) {
  const [saved, setSaved] = useState<Order | null>(null);
  const gift = requestedGift();
  const photo = gift || approvedGifts[1];
  const t = (a: string, e: string) => (ar ? a : e);
  return (
    <section className="booking-page">
      <BrandPageHeader
        ar={ar}
        photo={photo.id}
        title={t('لمناسبة حلوة، بتفاصيلك.', 'A sweet occasion, your way.')}
        description={
          gift
            ? t(
                `اختيارك: ${gift.ar} — ${gift.quantityAr}. حدّد المناسبة والموعد، وسنراجع التفاصيل معك.`,
                `Your selection: ${gift.en} — ${gift.quantityEn}. Tell us your occasion and date; we will confirm the details with you.`,
              )
            : t(
                'اختَر التشكيلة والموعد، واترك لنا مراجعة التفاصيل معك.',
                'Tell us your selection and date. We will review the details with you.',
              )
        }
      />
      <div className="booking-layout">
        <aside
          className="booking-visual"
          aria-label={t('اختيار دوبامين', 'Your Dopamine selection')}
        >
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(max-width: 700px) 88vw, 34vw"
            width={photo.width}
            height={photo.height}
            alt={ar ? photo.ar : photo.en}
          />
          <h2>{ar ? photo.ar : photo.en}</h2>
          <p>{ar ? photo.quantityAr : photo.quantityEn}</p>
          <a href="#gifting" className="text-button">
            {t('شاهد التشكيلات', 'Explore the selections')}
          </a>
        </aside>
        <div className="booking-form-panel">
          {saved ? (
            <OrderReceipt ar={ar} order={saved} onContinue={() => {}} />
          ) : (
            <Checkout
              ar={ar}
              cart={{}}
              booking
              initialNotes={
                gift ? `${ar ? gift.ar : gift.en} — ${ar ? gift.quantityAr : gift.quantityEn}` : ''
              }
              onSaved={setSaved}
              onBack={() => {
                location.hash = 'collection';
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
