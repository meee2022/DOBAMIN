import { useState } from 'react';
import { products } from './catalog';
import { approvedGifts, giftBookingLink } from './brand-experience';
import { sectionPhotos } from './section-photography';
import Icon from './Icon.web';
import ProductCard from './ProductCard.web';

const categories = [
  { id: 'all', ar: 'جميع المنتجات', en: 'Full menu' },
  { id: 'tarte', ar: 'تارت', en: 'Tarts' },
  { id: 'desserts', ar: 'حلويات', en: 'Desserts' },
  { id: 'cups', ar: 'أكواب', en: 'Dessert cups' },
];
const gifts = approvedGifts;
const photoCategories = [
  { id: 'tarte', photo: sectionPhotos.tarts, ar: 'التارت', en: 'Tarts', descriptionAr: 'الفستق والفواكه والشوكولاتة', descriptionEn: 'Pistachio, fruit and chocolate' },
  { id: 'cups', photo: sectionPhotos.cups, ar: 'أكواب الحلوى', en: 'Dessert cups', descriptionAr: 'طبقات متنوّعة من النكهات', descriptionEn: 'Layers of flavour' },
  { id: 'desserts', photo: sectionPhotos.desserts, ar: 'الحلويات', en: 'Desserts', descriptionAr: 'تشكيلة تستحق التجربة', descriptionEn: 'A selection to discover' },
];

export default function Home({
  ar,
  t,
  add,
}: {
  ar: boolean;
  t: (a: string, e: string) => string;
  add: (id: string) => void;
}) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState(() => new URLSearchParams(location.search).get('q') || '');
  const [expanded, setExpanded] = useState(false);
  const matches = products.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      `${p.ar} ${p.en}`.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const visible = expanded || search.trim() || category !== 'all' ? matches : matches.slice(0, 9);
  const browseCategory = (id: string) => {
    setCategory(id);
    setSearch('');
    setExpanded(false);
    requestAnimationFrame(() => {
      document.getElementById('menu-heading')?.focus({ preventScroll: true });
      document.getElementById('collection')?.scrollIntoView();
    });
  };

  return (
    <main className="storefront">
      <section className="section-hero">
        <img {...sectionPhotos.hero} className="section-hero-photo" sizes="(max-width: 1360px) 100vw, 1360px" fetchPriority="high" alt={t('تارت الفستق والبندق مع كوب تشيز كيك التوت بألوان دوبامين', 'Pistachio and hazelnut tarts with a berry cheesecake cup in Dopamine colours')} />
        <div className="storefront-intro">
          <h1>
            {t('حلويات مميّزة،', 'Distinctive sweets,')}
            <br />
            {t('بلمسة دوبامين.', 'with the Dopamine touch.')}
          </h1>
          <p>
            {t(
              'تشكيلة من التارت والحلويات وأكواب الحلوى، للاستمتاع بها أو تقديمها هدية في مختلف المناسبات.',
              'Explore tarts, desserts and dessert cups, for your own enjoyment or as a gift for any occasion.',
            )}
          </p>
          <div className="storefront-actions">
            <a className="button primary" href="#collection">
              {t('تصفّح المنتجات', 'Explore the menu')}
              <Icon name="arrow" />
            </a>
            <a className="storefront-text-link" href="#gifting">
              {t('هدايا ومناسبات', 'Gifts & occasions')}
            </a>
          </div>
        </div>
      </section>
      <div className="storefront-brush" aria-hidden="true" />

      <section className="section-categories storefront-wrap" aria-labelledby="category-heading">
        <div className="storefront-section-heading"><div><h2 id="category-heading">{t('لكل ذوق، اختيار.', 'A selection for every taste.')}</h2><p>{t('تعرّف إلى أصنافنا واختر ما يناسبك.', 'Discover our collections and find your favourite.')}</p></div></div>
        <div className="section-category-grid">
          {photoCategories.map((c) => <button type="button" className="section-category" key={c.id} onClick={() => browseCategory(c.id)} aria-label={t('عرض أصناف ' + c.ar, 'Browse ' + c.en)}>
            <img {...c.photo} sizes="(max-width: 700px) 44vw, 22vw" alt="" loading="lazy" decoding="async" />
            <span className="section-category-title">{ar ? c.ar : c.en}</span><span className="section-category-description">{ar ? c.descriptionAr : c.descriptionEn}</span>
          </button>)}
          <a className="section-category" href={giftBookingLink('protein')} aria-label={t('حجز علبة كرات البروتين', 'Book a protein ball gift box')}>
            <img {...sectionPhotos.protein} sizes="(max-width: 700px) 44vw, 22vw" alt="" loading="lazy" decoding="async" />
            <span className="section-category-title">{t('كرات البروتين', 'Protein balls')}</span><span className="section-category-description">{t('المكسرات والسمسم وجوز الهند', 'Nuts, sesame and coconut')}</span>
          </a>
        </div>
      </section>

      <section id="collection" className="storefront-menu storefront-wrap">
        <div className="storefront-section-heading">
          <div>
            <h2 id="menu-heading" tabIndex={-1}>{t('قائمة المنتجات', 'Our product selection')}</h2>
            <p>
              {t(
                'تعرّف إلى أصنافنا واختر ما يناسب ذوقك.',
                'Explore our selection and choose your preferred products.',
              )}
            </p>
          </div>
          <span className="storefront-menu-total">
            {new Intl.NumberFormat(ar ? 'ar-QA' : 'en').format(products.length)}{' '}
            {t('منتجًا في القائمة', 'creations on the menu')}
          </span>
        </div>
        <div className="storefront-menu-tools">
          <div
            className="storefront-categories"
            role="group"
            aria-label={t('تصفية المنتجات', 'Filter menu')}
          >
            {categories.map((c) => (
              <button
                key={c.id}
                aria-pressed={category === c.id}
                onClick={() => {
                  setCategory(c.id);
                  setExpanded(false);
                }}
              >
                {ar ? c.ar : c.en}
              </button>
            ))}
          </div>
          <label className="storefront-search">
            <span className="sr-only">{t('البحث في المنتجات', 'Search menu')}</span>
            <input
              type="search"
              placeholder={t('ابحث باسم المنتج…', 'Search by product name…')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <p className="storefront-result-count" role="status">
          {t(
            `المنتجات المعروضة: ${visible.length} من ${matches.length}`,
            `Showing ${visible.length} of ${matches.length} creations`,
          )}
        </p>
        <div className="products storefront-products">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} ar={ar} add={add} />
          ))}
        </div>
        {!matches.length && (
          <div className="storefront-empty">
            <h3>{t('لم نعثر على منتجات مطابقة.', 'No matching products.')}</h3>
            <button
              className="button secondary"
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
            >
              {t('عرض جميع المنتجات', 'Show the full menu')}
            </button>
          </div>
        )}
        {visible.length < matches.length && (
          <div className="storefront-more">
            <button className="button secondary" onClick={() => setExpanded(true)}>
              {t('عرض المزيد من المنتجات', 'Explore the rest of the menu')}
              <Icon name="arrow" />
            </button>
          </div>
        )}
        <p className="storefront-photo-note">
          {t(
            'الصور توضيحية. نؤكّد السعر والمكونات والتوفر قبل اعتماد الطلب.',
            'Images are illustrative. Price, ingredients and availability are confirmed before your request is accepted.',
          )}
        </p>
      </section>

      <section id="gifting" className="storefront-gifting">
        <div className="storefront-wrap">
          <div className="section-gift-intro">
            <img {...sectionPhotos.gifts} sizes="(max-width: 700px) 88vw, 48vw" loading="lazy" decoding="async" alt={t('علبتا هدايا دوبامين برسمة الفرشاة المعتمدة', 'Dopamine gift boxes with our signature brush artwork')} />
            <div><h2>{t('هدايا للمناسبات', 'Gifts for every occasion')}</h2><p>{t('تشكيلات من حلويات دوبامين في علب هدايا بتصميمنا الخاص، للتجمعات والمناسبات.', 'Dopamine dessert selections in our signature gift boxes, for gatherings and special occasions.')}</p><a className="button primary" href="#/booking">{t('احجز لمناسبتك', 'Plan your occasion')}<Icon name="arrow" /></a></div>
          </div>
          <div className="storefront-gift-grid">
            {gifts.map((p) => (
              <article className="storefront-gift" key={p.key}>
                <a
                  href={giftBookingLink(p.id)}
                  className="storefront-gift-photo"
                  aria-label={t(`احجز ${p.ar}`, `Plan a ${p.en} gift`)}
                >
                  <img
                    src={p.src}
                    srcSet={p.srcSet}
                    sizes="(max-width: 700px) 88vw, 29vw"
                    width={p.width}
                    height={p.height}
                    alt={ar ? p.ar : p.en}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="storefront-gift-copy">
                  <h3>{ar ? p.ar : p.en}</h3>
                  <p>{ar ? p.quantityAr : p.quantityEn}</p>
                  <a className="storefront-text-link" href={giftBookingLink(p.id)}>
                    {t('اطلب لمناسبتك', 'Plan your gift')}
                    <Icon name="arrow" size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="storefront-photo-note">
            {t(
              'نراجع التشكيلة والموعد والتوفر معك قبل التأكيد.',
              'We review the selection, date and availability with you before confirming.',
            )}
          </p>
        </div>
      </section>

      <section id="story" className="storefront-story storefront-wrap">
        <div className="storefront-story-mark">
          <img
            src={gifts[2].src}
            srcSet={gifts[2].srcSet}
            sizes="(max-width: 700px) 88vw, 36vw"
            width={gifts[2].width}
            height={gifts[2].height}
            alt={ar ? gifts[2].ar : gifts[2].en}
            loading="lazy"
          />
        </div>
        <div>
          <h2>{t('العناية بالتفاصيل', 'Attention to detail')}</h2>
          <p>
            {t(
              'تقدّم دوبامين تشكيلة من الحلويات تجمع بين تنوّع المذاق والعناية بالتفاصيل، للاستمتاع بها في يومك أو مشاركتها في مناسباتك.',
              'Dopamine offers a varied selection of desserts with thoughtful attention to detail, for everyday enjoyment and special occasions.',
            )}
          </p>
        </div>
      </section>

      <section className="storefront-ordering">
        <div className="storefront-wrap">
          <h2>{t('خطوات تقديم الطلب', 'How to place an order')}</h2>
          <ol>
            {[
              [
                t('اختَر من قائمة المنتجات', 'Choose from the menu'),
                t('أضف المنتجات التي ترغب في طلبها إلى سلة التسوق.', 'Add your selected products to the shopping cart.'),
              ],
              [
                t('حدّد الموعد', 'Choose your date'),
                t(
                  'أدخل بياناتك والموعد المطلوب وطريقة الاستلام.',
                  'Enter your details, date and collection preference.',
                ),
              ],
              [
                t('نراجع ونؤكّد', 'We review and confirm'),
                t(
                  'يراجع فريقنا الطلب قبل تأكيد موعد التجهيز.',
                  'Our team reviews your request before confirming preparation.',
                ),
              ],
            ].map(([title, copy]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
          <a className="storefront-text-link" href="#/orders">
            {t('متابعة طلباتي', 'Track my requests')}
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
