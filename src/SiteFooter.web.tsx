import { assetUrl } from './catalog';
import { logo } from './brand-assets';
import shop from './shop-config.json';
import Icon from './Icon.web';

export default function SiteFooter({ t }: { t: (a: string, e: string) => string }) {
  return (
    <footer>
      <div className="footer-top">
        <img src={assetUrl(logo)} width={2172} height={724} alt="Dopamine Healthy sweets" />
        <p>{t('حلويات وهدايا تحمل طابع دوبامين.', 'Sweets and gifts with the Dopamine signature.')}</p>
        <a href="#collection">
          {t('تصفح المنتجات', 'Browse products')}
          <Icon name="arrow" size={18} />
        </a>
      </div>
      <nav className="footer-navigation" aria-label={t('روابط دوبامين', 'Dopamine links')}>
        <a href="#collection">{t('قائمة المنتجات', 'Menu')}</a>
        <a href="#gifting">{t('الهدايا', 'Gifts')}</a>
        <a href="#/booking">{t('حجز مناسبة', 'Occasions')}</a>
        <a href="#/orders">{t('طلباتي', 'My requests')}</a>
        <a href="#story">{t('عن دوبامين', 'Our story')}</a>
      </nav>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dopamine</span>
        <a href="#/privacy">{t('الخصوصية والشروط', 'Privacy and terms')}</a>
        {shop.instagram && (
          <a href={`https://instagram.com/${shop.instagram}`} target="_blank" rel="noreferrer">
            Instagram
          </a>
        )}
        {shop.whatsapp && (
          <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        )}
        <a href="#">{t('العودة إلى الأعلى', 'Back to top')}</a>
      </div>
    </footer>
  );
}
