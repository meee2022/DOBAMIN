import { useState } from 'react';
import { products } from './catalog';
import { lifestyleHero, lifestyleGift } from './lifestyle-data';
import Icon from './Icon.web';
import ProductCard from './ProductCard.web';

const categories = [
  { id: 'all', ar: 'كل المنيو', en: 'Full menu' },
  { id: 'tarte', ar: 'تارت', en: 'Tarte' },
  { id: 'desserts', ar: 'حلويات', en: 'Desserts' },
  { id: 'cups', ar: 'أكواب', en: 'Cups' },
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
  const visibleProducts = products.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      `${p.ar} ${p.en}`.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="fine-line" />
          <h1>
            {t('لذّة تُشبهك.', 'A little pleasure.')}
            <br />
            <em>{t('وتوازن يليق بك.', 'A lovely balance.')}</em>
          </h1>
          <p>
            {t(
              'بين ما تحبّ وما يناسبك، لحظة حلوة تستحقّها. حلويات صُنعت لتجمع المتعة والتوازن في كل قضمة.',
              'Between what you love and what feels right, a sweet moment awaits. Discover desserts that bring pleasure and balance to every bite.',
            )}
          </p>
          <a className="button primary" href="#collection">
            {t('اكتشف لحظتك الحلوة', 'Find your sweet moment')}
            <Icon name="arrow" />
          </a>
          <div className="hero-note">
            <Icon name="heart" size={17} />
            {t('صُنعت للحظات التي تشتهيها', 'Made for the moments you crave')}
          </div>
        </div>
        <div className="hero-photo">
          <img
            src={lifestyleHero.src}
            srcSet={lifestyleHero.srcSet}
            sizes="(max-width: 700px) 100vw, 50vw"
            width={lifestyleHero.width}
            height={lifestyleHero.height}
            alt={t(
              'حامل أكواب دوبامين بشعار رمادي وفرشاة خضراء وزرقاء، على حجر طبيعي في ضوء الشباك',
              'Dopamine dessert cup carriers with sage and blue brushstrokes, on natural stone in window light',
            )}
            fetchPriority="high"
          />
        </div>
      </section>
      <div className="brand-strip">
        <span>{t('لذّة بلا تنازل', 'Pleasure without compromise')}</span>
        <Icon name="heart" size={16} />
        <span>{t('تفاصيل تُلامس القلب', 'Thoughtful in every detail')}</span>
        <Icon name="heart" size={16} />
        <span>{t('توازن في كل قضمة', 'Balance in every bite')}</span>
      </div>
      <section id="collection" className="collection section-wrap">
        <div className="section-head">
          <div>
            <h2>{t('لكل لحظة، حلاها.', 'Every moment has its sweetness.')}</h2>
            <p>
              {t(
                'لنفسك، لمن تحبّ، وللّمة التي تنتظرها.',
                'For yourself, for someone special, for coming together.',
              )}
            </p>
          </div>
          <span className="section-script">Choose your sweet moment</span>
        </div>
        <div className="collection-tools menu-tabs">
          <div className="tabs" role="group" aria-label={t('تصفية المجموعة', 'Filter collection')}>
            {categories.map((c) => (
              <button
                key={c.id}
                aria-pressed={category === c.id}
                className={category === c.id ? 'active' : ''}
                onClick={() => setCategory(c.id)}
              >
                {ar ? c.ar : c.en}
              </button>
            ))}
          </div>
          <span className="demo-note">{t('٢٤ صنفًا', '24 creations')}</span>
        </div>
        <div className="menu-search">
          <input
            type="search"
            aria-label={t('ابحث في المنيو', 'Search menu')}
            placeholder={t('ابحث عن لحظتك الحلوة…', 'Find your sweet moment…')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="menu-results-count" role="status">
            {visibleProducts.length} {t('صنفًا', 'creations')}
          </span>
        </div>
        <p className="menu-photo-note">
          {t(
            'صور تصورية مولّدة بالذكاء الاصطناعي لتقديم المنتجات وتغليفها. الأسعار وتفاصيل الوصفات تُؤكّد عند الطلب.',
            'AI-generated concepts of the products and their packaging. Prices and recipe details are confirmed when ordering.',
          )}
        </p>
        <div className="products">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} ar={ar} add={add} />
          ))}
        </div>
        {!visibleProducts.length && (
          <p className="menu-no-results">
            {t(
              'لا توجد أصناف مطابقة. جرّب اسمًا آخر أو اختر كل المنيو.',
              'No matching creations. Try another name or select the full menu.',
            )}
          </p>
        )}
      </section>
      <section className="gallery-teaser">
        <div>
          <h2>{t('التغليف… جزء من الهدية.', 'The wrapping is part of the gift.')}</h2>
          <p>
            {t(
              'اكتشف كل صور المنتجات وتصاميم التغليف في معرض دوبامين.',
              'Explore every product image and packaging concept in our gallery.',
            )}
          </p>
        </div>
        <a className="button primary" href="#/gallery">
          {t('شاهد كل الصور', 'Explore all images')}
          <Icon name="arrow" />
        </a>
      </section>
      <section id="story" className="story">
        <div className="story-heart">
          <Icon name="heart" size={58} />
        </div>
        <p className="english-statement">
          The sweet spot between
          <br />
          <i>discipline and desire.</i>
        </p>
        <div className="story-copy">
          <h2>{t('نؤمن أن الحلا جزء من التوازن.', 'Sweetness belongs in balance.')}</h2>
          <p>
            {t(
              'دوبامين مساحة صغيرة للمتعة في يومك. نعيد تخيّل الحلويات بروح دافئة وتفاصيل مدروسة، لأن الاختيار الذي يشعرك بالرضا يستحق أن يكون لذيذًا أيضًا.',
              'Dopamine is a little space for pleasure in your day. We reimagine sweets with warmth and thoughtful details, because a feel-good choice deserves to taste beautiful, too.',
            )}
          </p>
          <span className="story-signature">With love, Dopamine</span>
        </div>
      </section>
      <section id="gifting" className="gifting section-wrap">
        <div className="gift-photo">
          <img
            src={lifestyleGift.src}
            srcSet={lifestyleGift.srcSet}
            sizes="(max-width: 700px) 88vw, 44vw"
            width={lifestyleGift.width}
            height={lifestyleGift.height}
            loading="lazy"
            alt={t(
              'بوكس دوبامين السداسي للبروتين بول مع الصوص والفرشاة المعتمدة في مشهد إهداء فاخر',
              'Dopamine hexagonal protein ball gift box with sauce and the approved brush artwork in a boutique setting',
            )}
          />
        </div>
        <div className="gift-copy">
          <h2>
            {t('بعض الهدايا', 'Some gifts')}
            <br />
            <em>{t('تُقال بقضمة.', 'say it sweetly.')}</em>
          </h2>
          <p>
            {t(
              'شكرًا، أحبّك، أو لمجرّد أنك تستحقّ. اختَر هدية تحمل مشاعرك، بتغليف يليق باللحظة.',
              'Thank you. I love you. Or simply, you deserve it. Find a thoughtful gift, beautifully wrapped for the moment.',
            )}
          </p>
          <a className="button secondary" href="#/booking">
            {t('اطلب هديتك لمناسبتك', 'Plan a gift for your occasion')}
            <Icon name="arrow" />
          </a>
        </div>
      </section>
    </main>
  );
}
