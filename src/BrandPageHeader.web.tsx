import type { ReactNode } from 'react';
import { approvedGifts } from './brand-experience';

export default function BrandPageHeader({
  title,
  description,
  ar,
  actions,
  photo = 'cups',
}: {
  title: string;
  description: string;
  ar: boolean;
  actions?: ReactNode;
  photo?: string;
}) {
  const image = approvedGifts.find((gift) => gift.id === photo) || approvedGifts[1];
  return (
    <header className="brand-page-heading">
      <div className="brand-page-copy">
        <a className="page-breadcrumb" href="#">
          {ar ? 'دوبامين / الرئيسية' : 'Dopamine / Home'}
        </a>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions && <div className="brand-page-actions">{actions}</div>}
      </div>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(max-width: 700px) 28vw, 220px"
        width={image.width}
        height={image.height}
        alt={ar ? image.ar : image.en}
        decoding="async"
      />
    </header>
  );
}
