import { assetUrl } from './catalog';
import Icon from './Icon.web';
import { logo } from './brand-assets';

type Props = {
  t: (a: string, e: string) => string;
  count: number;
  toggleLang: () => void;
  openCart: () => void;
};

export default function SiteHeader({ t, count, toggleLang, openCart }: Props) {
  return (
    <>
      <div className="announcement">
        {t('لحظات حلوة، بتوازن جميل', 'Sweet moments. Beautifully balanced.')}
      </div>
      <header className="header">
        <nav aria-label={t('القائمة الرئيسية', 'Main navigation')}>
          <a href="#collection">{t('المجموعة', 'The collection')}</a>
          <a href="#/gallery">{t('عالم الصور', 'Image gallery')}</a>
          <a href="#gifting">{t('فن الإهداء', 'The art of gifting')}</a>
        </nav>
        <a href="#" className="logo" aria-label="Dopamine home">
          <img src={assetUrl(logo)} alt="Dopamine Healthy sweets" />
        </a>
        <div className="header-actions">
          <button className="language" onClick={toggleLang}>
            {t('EN', 'العربية')}
          </button>
          <span className="divider" />
          <button
            className="bag"
            onClick={openCart}
            aria-label={t(`الحقيبة، ${count} منتجات`, `Bag, ${count} items`)}
          >
            <Icon name="bag" />
            <span className="bag-label">{t('الحقيبة', 'Bag')}</span>
            <span className="count">{count}</span>
          </button>
        </div>
      </header>
      <div className="order-nav">
        <div>
          <a href="#/booking">{t('حجز مناسبة', 'Book an occasion')}</a>
          <a href="#/orders">{t('طلباتي', 'My requests')}</a>
        </div>
      </div>
    </>
  );
}
