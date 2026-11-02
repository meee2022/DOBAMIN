import React, { useState } from 'react';
import { gallery } from './gallery-data';
import { assetUrl } from './catalog';
import { MediaImage, PhotoViewer, Photo } from './PhotoViewer.web';
import { lifestylePhotos } from './lifestyle-data';

type GalleryPhoto = {
  key: string;
  ar: string;
  en: string;
  category: string;
  src: string;
  fallback?: string;
  original?: string;
  srcSet?: string;
  width?: number;
  height?: number;
};
const newest: GalleryPhoto[] = lifestylePhotos.map((p) => ({ ...p, category: 'latest' }));
const archive: GalleryPhoto[] = [...gallery]
  .sort(
    (a, b) =>
      ['concept', 'packaging', 'plate', 'brand'].indexOf(a.category) -
      ['concept', 'packaging', 'plate', 'brand'].indexOf(b.category),
  )
  .map((p) => ({
    key: p.key,
    ar: p.ar,
    en: p.en,
    category: p.category,
    src: p.url!,
    fallback: assetUrl(p.local),
    original: p.originalUrl!,
  }));
const allPhotos = [...newest, ...archive];

export default function Gallery({ ar }: { ar: boolean }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [photo, setPhoto] = useState<Photo | null>(null);
  const t = (a: string, e: string) => (ar ? a : e);
  const tabs = [
    ['all', 'كل الصور', 'All images'],
    ['latest', 'الهوية الجديدة', 'New identity'],
    ['concept', 'أفكار التغليف', 'Packaging concepts'],
    ['packaging', 'تغليف المنتجات', 'Product packaging'],
    ['plate', 'على الطبق', 'On the plate'],
    ['brand', 'هوية دوبامين', 'Brand collection'],
  ];
  const visible = allPhotos.filter(
    (p) =>
      (filter === 'all' || p.category === filter) &&
      `${p.ar} ${p.en}`.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <main className="gallery-page section-wrap">
      <header className="gallery-heading">
        <div>
          <h1>{t('تفاصيل تستحق التأمّل.', 'Details worth a closer look.')}</h1>
          <p>
            {t(
              'من أول قضمة إلى آخر لمسة في التغليف. اكتشف عالم دوبامين بالصور.',
              'From the first bite to the finishing touch. Explore Dopamine in pictures.',
            )}
          </p>
        </div>
        <a className="gallery-return" href="#collection">
          {t('العودة للمنيو', 'Back to the menu')}
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </header>
      <div className="gallery-toolbar">
        <div
          className="gallery-filters"
          role="group"
          aria-label={t('تصفية الصور', 'Filter images')}
        >
          {tabs.map(([id, a, e]) => (
            <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {t(a, e)}
              <span>
                {id === 'all'
                  ? allPhotos.length
                  : allPhotos.filter((p) => p.category === id).length}
              </span>
            </button>
          ))}
        </div>
        <label className="gallery-search">
          <span>{t('ابحث عن صورة', 'Find an image')}</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('تارت، بوكس، شوكولاتة…', 'Tart, box, chocolate…')}
          />
        </label>
      </div>
      <div className="gallery-context">
        <p>
          {t(
            'تصورات للمنتجات والتغليف. اضغط على أي صورة لمشاهدتها بحجم أكبر.',
            'Product and packaging concepts. Select any image to see the details.',
          )}
        </p>
        <span role="status">
          {visible.length}{' '}
          {t(visible.length >= 3 && visible.length <= 10 ? 'صور' : 'صورة', 'images')}
        </span>
      </div>
      {['latest', 'archive'].map((group) => {
        const images = visible.filter((p) => (group === 'latest') === (p.category === 'latest'));
        if (!images.length) return null;
        return (
          <section className="gallery-collection" key={group} aria-labelledby={`gallery-${group}`}>
            <div className="gallery-collection-heading">
              <h2 id={`gallery-${group}`}>
                {group === 'latest'
                  ? t('الهوية الجديدة، بكل تفاصيلها.', 'A fresh expression of Dopamine.')
                  : t('المزيد من عالم دوبامين.', 'More from the Dopamine collection.')}
              </h2>
              {group === 'latest' && (
                <p>
                  {t(
                    'فرشاة بألوان هادئة، وتفاصيل تجعل الهدية أجمل.',
                    'Soft brushstrokes. Thoughtful details. Beautifully wrapped.',
                  )}
                </p>
              )}
            </div>
            <div className={`gallery-grid ${group === 'latest' ? 'gallery-lifestyle-grid' : ''}`}>
              {images.map((p, index) => (
                <article className="gallery-card" key={p.key}>
                  <button
                    className="gallery-photo"
                    onClick={() =>
                      setPhoto({
                        src: p.src,
                        fallback: p.fallback,
                        original: p.original,
                        title: ar ? p.ar : p.en,
                        subtitle: ar ? p.en : p.ar,
                      })
                    }
                    aria-label={`${t('تكبير', 'Enlarge')} ${ar ? p.ar : p.en}`}
                  >
                    <MediaImage
                      src={p.src}
                      srcSet={p.srcSet}
                      sizes={
                        p.srcSet
                          ? '(max-width: 600px) 88vw, (max-width: 1050px) 43vw, 29vw'
                          : undefined
                      }
                      width={p.width}
                      height={p.height}
                      fallback={p.fallback}
                      alt={ar ? p.ar : p.en}
                      loading={group === 'latest' && index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <span className="image-expand" aria-hidden="true">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4" />
                      </svg>
                    </span>
                  </button>
                  <div className="gallery-card-copy">
                    <span className="gallery-kind">
                      {tabs.find((t) => t[0] === p.category)?.[ar ? 1 : 2]}
                    </span>
                    <h3>{ar ? p.ar : p.en}</h3>
                    <p dir={ar ? 'ltr' : 'rtl'}>{ar ? p.en : p.ar}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      {!visible.length && (
        <div className="gallery-empty">
          <h2>{t('لم نجد صورًا بهذا الاسم.', 'No images found.')}</h2>
          <button
            onClick={() => {
              setSearch('');
              setFilter('all');
            }}
          >
            {t('عرض كل الصور', 'Show all images')}
          </button>
        </div>
      )}
      <PhotoViewer photo={photo} onClose={() => setPhoto(null)} ar={ar} />
    </main>
  );
}
