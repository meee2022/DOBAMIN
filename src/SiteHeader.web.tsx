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
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        {t('انتقل إلى المحتوى', 'Skip to content')}
      </a>
      <div className="announcement">
        {t('حلويات وهدايا لمختلف المناسبات', 'Sweets and gifts for every occasion.')}
      </div>
      <header className="header">
        <a href="#" className="logo" aria-label={t('الصفحة الرئيسية لدوبامين', 'Dopamine home')}>
          <img src={assetUrl(logo)} width={2172} height={724} alt="Dopamine Healthy sweets" />
        </a>
        <nav aria-label={t('القائمة الرئيسية', 'Main navigation')}>
          <a href="#collection">{t('قائمة المنتجات', 'Menu')}</a>
          <a href="#gifting">{t('الهدايا', 'Gifts')}</a>
          <a href="#/booking">{t('حجز مناسبة', 'Occasions')}</a>
          <a href="#/orders">{t('طلباتي', 'My requests')}</a>
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={toggleLang}
            aria-label={t('التبديل إلى الإنجليزية', 'Switch to Arabic')}
          >
            {t('EN', 'العربية')}
          </button>
          <span className="divider" />
          <button
            className="bag"
            onClick={openCart}
            aria-label={t(`سلة التسوق، عدد المنتجات: ${count}`, `Shopping cart, item count: ${count}`)}
          >
            <Icon name="bag" />
            <span className="bag-label">{t('سلة التسوق', 'Shopping cart')}</span>
            <span className="count">{count}</span>
          </button>
        </div>
      </header>
    </>
  );
}
