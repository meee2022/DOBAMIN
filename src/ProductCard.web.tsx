import React, { useState } from 'react';
import { assetUrl } from './catalog';
import { MediaImage, PhotoViewer, Photo } from './PhotoViewer.web';
type Product = {
  id: string;
  ar: string;
  en: string;
  category: string;
  price: number | null;
  image: any;
};
export default function ProductCard({
  product: p,
  ar,
  add,
}: {
  product: Product;
  ar: boolean;
  add: (id: string) => void;
}) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const label = ar ? p.ar : p.en;
  const fallback = assetUrl(p.image);
  const category =
    p.category === 'tarte'
      ? ar
        ? 'تارت'
        : 'Tarte'
      : p.category === 'cups'
        ? ar
          ? 'أكواب'
          : 'Cups'
        : ar
          ? 'حلويات'
          : 'Desserts';
  return (
    <article className="product menu-product">
      <button
        className="product-image product-photo-single"
        onClick={() =>
          setPhoto({
            src: fallback,
            fallback,
            original: fallback,
            title: label,
            subtitle: ar ? p.en : p.ar,
          })
        }
        aria-label={`${ar ? 'تكبير صورة' : 'Enlarge image of'} ${label}`}
      >
        <MediaImage
          src={fallback}
          fallback={fallback}
          alt={label}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
        />
        <span className="product-photo-open">{ar ? 'تكبير الصورة' : 'Enlarge image'}</span>
      </button>
      <div className="product-card-copy">
        <span className="product-type">{category}</span>
        <h3>{label}</h3>
        <p className="product-translation" lang={ar ? 'en' : 'ar'} dir={ar ? 'ltr' : 'rtl'}>
          {ar ? p.en : p.ar}
        </p>
        <div className="product-card-bottom">
          <span className="product-price">
            {p.price === null
              ? ar
                ? 'السعر عند التأكيد'
                : 'Price on confirmation'
              : `${p.price} ${ar ? 'ر.ق' : 'QAR'}`}
          </span>
          <button
            className="product-add"
            onClick={() => add(p.id)}
            aria-label={ar ? `أضف ${p.ar}` : `Add ${p.en}`}
          >
            <span>{ar ? 'أضف للحقيبة' : 'Add to bag'}</span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
      <PhotoViewer photo={photo} onClose={() => setPhoto(null)} ar={ar} />
    </article>
  );
}
