import { useState } from 'react';
import { products, assetUrl } from './catalog';
import { lifestylePhotos } from './lifestyle-data';
import { logo } from './brand-assets';
import Icon from './Icon.web';
import ProductCard from './ProductCard.web';

const categories = [
  { id: 'all', ar: 'كل المنيو', en: 'Full menu' },
  { id: 'tarte', ar: 'تارت', en: 'Tarts' },
  { id: 'desserts', ar: 'حلويات', en: 'Desserts' },
  { id: 'cups', ar: 'أكواب', en: 'Dessert cups' },
];
const cups = lifestylePhotos.find((p) => p.key === 'six-dessert-cups')!;
const gifts = [
  { key: 'six-tarts-v1', ar: 'بوكس التارت', en: 'Tart gift box' },
  { key: 'six-dessert-cups', ar: 'بوكس أكواب الحلوى', en: 'Dessert cup gift box' },
  { key: 'protein-balls-12-v1', ar: 'بوكس البروتين بول', en: 'Protein ball gift box' },
].map((gift) => ({ ...lifestylePhotos.find((p) => p.key === gift.key)!, ...gift }));
const heroTart = products.find((p) => p.id === 'tarte-pistachio')!;
const heroCup =
  products.find((p) => p.id === 'cup-berries-cheesecake') ||
  products.find((p) => p.category === 'cups')!;

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

  return (
    <main className="storefront">
      <section className="storefront-hero storefront-wrap">
        <div className="storefront-intro">
          <h1>
            {t('لحظتك الحلوة،', 'Your sweet moment,')}
            <br />
            {t('بروح دوبامين.', 'the Dopamine way.')}
          </h1>
          <p>
            {t(
              'تارت، حلويات وأكواب حلوى. اختَر ما تحبّ لنفسك، أو شارك لحظة حلوة مع من تحبّ.',
              'Tarts, desserts and sweet little cups. A moment for you, or a gift to share.',
            )}
          </p>
          <div className="storefront-actions">
            <a className="button primary" href="#collection">
              {t('تصفّح المنيو', 'Explore the menu')}
              <Icon name="arrow" />
            </a>
            <a className="storefront-text-link" href="#gifting">
              {t('هدايا ومناسبات', 'Gifts & occasions')}
            </a>
          </div>
        </div>
        <div className="storefront-hero-images">
          <img
            className="storefront-cups"
            src={cups.src}
            srcSet={cups.srcSet}
            sizes="(max-width: 700px) 56vw, 29vw"
            width={cups.width}
            height={cups.height}
            alt={t(
              'تشكيلة من ستة أكواب حلوى في بوكس دوبامين المعتمد',
              'Six dessert cups in the approved Dopamine gift box',
            )}
            fetchPriority="high"
          />
          <div className="storefront-hero-plates">
            <img
              src={assetUrl(heroTart.image)}
              width={1024}
              height={1024}
              alt={ar ? heroTart.ar : heroTart.en}
            />
            <img
              src={assetUrl(heroCup.image)}
              width={1024}
              height={1024}
              alt={ar ? heroCup.ar : heroCup.en}
            />
          </div>
        </div>
      </section>
      <div className="storefront-brush" aria-hidden="true" />

      <section id="collection" className="storefront-menu storefront-wrap">
        <div className="storefront-section-heading">
          <div>
            <h2>{t('اختَر حلاك.', 'Find your favourite.')}</h2>
            <p>
              {t(
                'من أول تارت لآخر ملعقة، لكل لحظة اختيار.',
                'From the first bite to the last spoonful, a little something for every moment.',
              )}
            </p>
          </div>
          <span className="storefront-menu-total">
            {new Intl.NumberFormat(ar ? 'ar-QA' : 'en').format(products.length)}{' '}
            {t('صنفًا في المنيو', 'creations on the menu')}
          </span>
        </div>
        <div className="storefront-menu-tools">
          <div
            className="storefront-categories"
            role="group"
            aria-label={t('تصفية المنيو', 'Filter menu')}
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
            <span className="sr-only">{t('ابحث في المنيو', 'Search menu')}</span>
            <input
              type="search"
              placeholder={t('بتدور على إيه؟', 'Find a favourite…')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <p className="storefront-result-count" role="status">
          {t(
            `نعرض ${visible.length} من ${matches.length} صنفًا`,
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
            <h3>{t('جرّب اسمًا آخر.', 'Try another favourite.')}</h3>
            <button
              className="button secondary"
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
            >
              {t('عرض كل المنيو', 'Show the full menu')}
            </button>
          </div>
        )}
        {visible.length < matches.length && (
          <div className="storefront-more">
            <button className="button secondary" onClick={() => setExpanded(true)}>
              {t('عرض باقي المنيو', 'Explore the rest of the menu')}
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
          <div className="storefront-section-heading">
            <div>
              <h2>{t('حلوى تُهدى.', 'Sweetness, shared.')}</h2>
              <p>
                {t(
                  'للمّة، لهدية، أو لمناسبة تستحق. تشكيلة دوبامين في بوكساتنا المعتمدة.',
                  'For a gathering, a gift, or a moment worth celebrating. Dopamine selections in our signature boxes.',
                )}
              </p>
            </div>
            <a className="storefront-text-link" href="#/booking">
              {t('احجز لمناسبتك', 'Plan your occasion')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="storefront-gift-grid">
            {gifts.map((p, index) => (
              <article className="storefront-gift" key={p.key}>
                <a
                  href="#/booking"
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
                  <h3>
                    {t(
                      ['بوكس التارت', 'بوكس أكواب الحلوى', 'بوكس البروتين بول'][index],
                      [
                        'The tart selection',
                        'The dessert cup selection',
                        'The protein ball selection',
                      ][index],
                    )}
                  </h3>
                  <p>
                    {t(
                      ['٦ قطع تارت', '٦ أكواب حلوى', '١٢ حبة بروتين بول'][index],
                      ['Six tarts', 'Six dessert cups', 'Twelve protein balls'][index],
                    )}
                  </p>
                  <a className="storefront-text-link" href="#/booking">
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
            src={assetUrl(logo)}
            width={640}
            height={213}
            alt="Dopamine Healthy sweets"
            loading="lazy"
          />
        </div>
        <div>
          <h2>{t('حلاوتها في التفاصيل.', 'The pleasure is in the details.')}</h2>
          <p>
            {t(
              'دوبامين مساحة صغيرة للمتعة في يومك. نعيد تخيّل الحلويات بروح دافئة وتفاصيل مدروسة، لأن الاختيار الذي يشعرك بالرضا يستحق أن يكون لذيذًا أيضًا.',
              'Dopamine is a little space for pleasure in your day. We reimagine sweets with warmth and thoughtful details, because a feel-good choice deserves to taste beautiful, too.',
            )}
          </p>
        </div>
      </section>

      <section className="storefront-ordering">
        <div className="storefront-wrap">
          <h2>{t('من اختيارك، لحد لحظتك.', 'From your choice to your moment.')}</h2>
          <ol>
            {[
              [
                t('اختَر من المنيو', 'Choose from the menu'),
                t('أضف الأصناف اللي تحبّها لحقيبتك.', 'Add your favourites to your bag.'),
              ],
              [
                t('حدّد الموعد', 'Choose your date'),
                t(
                  'اكتب بياناتك والموعد وطريقة الاستلام.',
                  'Enter your details, date and collection preference.',
                ),
              ],
              [
                t('نراجع ونؤكّد', 'We review and confirm'),
                t(
                  'فريقنا يراجع الطلب قبل تأكيد التجهيز.',
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
