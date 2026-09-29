import React, { useEffect, useRef, useState } from 'react';
import { products, assetUrl } from './src/catalog';
import './src/web.css';
import './src/menu.css';
import ProductCard from './src/ProductCard.web';
import Gallery from './src/Gallery.web';
import { Checkout, OrderReceipt, MyOrders, AdminOrders, Booking } from './src/Orders.web';
import type { Order } from './src/orders-api';

const logo = require('./assets/logo.png');
const hero = require('./assets/hero.webp');
const signature = require('./assets/signature.webp');
type IconName = 'bag' | 'arrow' | 'close' | 'plus' | 'minus' | 'heart' | 'check';
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    arrow: <><path d="M20 12H4m6-6-6 6 6 6"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>, plus: <path d="M12 5v14M5 12h14"/>, minus: <path d="M5 12h14"/>,
    heart: <path d="M12 20S3 14.5 3 8.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9 1.5C21 14.5 12 20 12 20Z"/>, check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [savedOrder, setSavedOrder] = useState<Order | null>(null);
  const [route, setRoute] = useState(location.hash);
  useEffect(() => { const update = () => { setRoute(location.hash); if(location.hash.startsWith('#/')) window.scrollTo(0,0); else requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView()); }; window.addEventListener('hashchange',update); return () => window.removeEventListener('hashchange',update); }, []);
  const dialog = useRef<HTMLDialogElement>(null);
  const ar = lang === 'ar';
  const t = (a: string, e: string) => ar ? a : e;
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('dopamine-cart') || '{}'); const clean: Record<string, number> = {}; products.forEach(p => { if (Number.isInteger(saved[p.id]) && saved[p.id] > 0) clean[p.id] = Math.min(99, saved[p.id]); }); setCart(clean); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem('dopamine-cart', JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = ar ? 'rtl' : 'ltr'; document.title = 'Dopamine — Indulgence, in balance.'; }, [lang]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2400); return () => clearTimeout(timer); }, [toast]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.some(p => (cart[p.id] || 0) > 0 && p.price === null) ? null : products.reduce((sum,p)=>sum+(p.price??0)*(cart[p.id]||0),0);
  const visibleProducts = products.filter(p => (category === 'all' || p.category === category) && `${p.ar} ${p.en}`.toLowerCase().includes(search.trim().toLowerCase()));
  const change = (id: string, amount: number) => { setSavedOrder(null); setCheckout(false); setCart(old => ({ ...old, [id]: Math.max(0, Math.min(99, (old[id] || 0) + amount)) })); };
  const add = (id: string) => { change(id, 1); setToast(t('أضفنا لحظة حلوة إلى حقيبتك', 'A sweet moment added to your bag')); };
  const openCart = () => { setSavedOrder(null); setCheckout(false); document.body.style.overflow = 'hidden'; dialog.current?.showModal(); };
  const money = (n: number | null) => n === null ? t('يُحدّد عند التأكيد', 'On confirmation') : `${n} ${t('ر.ق', 'QAR')}`;
  const categories = [{ id:'all',ar:'كل المنيو',en:'Full menu' },{id:'tarte',ar:'تارت',en:'Tarte'},{id:'desserts',ar:'حلويات',en:'Desserts'},{id:'cups',ar:'أكواب',en:'Cups'}];

  return <div className="site" dir={ar ? 'rtl' : 'ltr'}>
    <div className="announcement">{t('لحظات حلوة، بتوازن جميل', 'Sweet moments. Beautifully balanced.')}<span> · </span>{t('نسخة تجريبية', 'Demo boutique')}</div>
    <header className="header">
      <nav aria-label={t('القائمة الرئيسية', 'Main navigation')}><a href="#collection">{t('المجموعة', 'The collection')}</a><a href="#/gallery">{t('عالم الصور', 'Image gallery')}</a><a href="#gifting">{t('فن الإهداء', 'The art of gifting')}</a></nav>
      <a href="#" className="logo" aria-label="Dopamine home"><img src={assetUrl(logo)} alt="Dopamine Healthy sweets" /></a>
      <div className="header-actions"><button className="language" onClick={() => setLang(ar ? 'en' : 'ar')}>{t('EN', 'العربية')}</button><span className="divider"/><button className="bag" onClick={openCart} aria-label={t(`الحقيبة، ${count} منتجات`, `Bag, ${count} items`)}><Icon name="bag"/><span className="bag-label">{t('الحقيبة', 'Bag')}</span><span className="count">{count}</span></button></div>
    </header>
    <div className="order-nav"><div><a href="#/booking">{t('حجز مناسبة', 'Book an occasion')}</a><a href="#/orders">{t('طلباتي', 'My requests')}</a></div><a href="#/admin">{t('إدارة الطلبات', 'Team orders')}</a></div>
    {route === '#/gallery' ? <Gallery ar={ar}/> : route === '#/admin' ? <AdminOrders ar={ar}/> : route === '#/orders' ? <MyOrders ar={ar}/> : route === '#/booking' ? <Booking ar={ar}/> : <main>
      <section className="hero">
        <div className="hero-copy"><div className="fine-line"/><h1>{t('لذّة تُشبهك.', 'A little pleasure.')}<br/><em>{t('وتوازن يليق بك.', 'A lovely balance.')}</em></h1><p>{t('بين ما تحبّ وما يناسبك، لحظة حلوة تستحقّها. حلويات صُنعت لتجمع المتعة والتوازن في كل قضمة.', 'Between what you love and what feels right, a sweet moment awaits. Discover desserts that bring pleasure and balance to every bite.')}</p><a className="button primary" href="#collection">{t('اكتشف لحظتك الحلوة', 'Find your sweet moment')}<Icon name="arrow"/></a><div className="hero-note"><Icon name="heart" size={17}/>{t('صُنعت للحظات التي تشتهيها', 'Made for the moments you crave')}</div></div>
        <div className="hero-photo"><img src={assetUrl(hero)} alt={t('طبقات حلوى كريمية بلمسة كاكاو على قماش كتاني', 'Creamy dessert layers with cocoa on natural linen')} fetchPriority="high"/><div className="photo-stamp"><Icon name="heart" size={26}/><span>A FEEL-GOOD<br/>MOMENT</span></div></div>
      </section>
      <div className="brand-strip"><span>{t('لذّة بلا تنازل', 'Pleasure without compromise')}</span><Icon name="heart" size={16}/><span>{t('تفاصيل تُلامس القلب', 'Thoughtful in every detail')}</span><Icon name="heart" size={16}/><span>{t('توازن في كل قضمة', 'Balance in every bite')}</span></div>
      <section id="collection" className="collection section-wrap">
        <div className="section-head"><div><h2>{t('لكل لحظة، حلاها.', 'Every moment has its sweetness.')}</h2><p>{t('لنفسك، لمن تحبّ، وللّمة التي تنتظرها.', 'For yourself, for someone special, for coming together.')}</p></div><span className="section-script">Choose your sweet moment</span></div>
        <div className="collection-tools menu-tabs"><div className="tabs" role="group" aria-label={t('تصفية المجموعة', 'Filter collection')}>{categories.map(c => <button key={c.id} aria-pressed={category === c.id} className={category === c.id ? 'active' : ''} onClick={() => setCategory(c.id)}>{ar ? c.ar : c.en}</button>)}</div><span className="demo-note">{t('منيو مبدئي · ٢٤ صنفًا', 'Initial menu · 24 creations')}</span></div>
        <div className="menu-search"><input type="search" aria-label={t('ابحث في المنيو', 'Search menu')} placeholder={t('ابحث عن لحظتك الحلوة…', 'Find your sweet moment…')} value={search} onChange={e=>setSearch(e.target.value)}/><span className="menu-results-count" role="status">{visibleProducts.length} {t('صنفًا', 'creations')}</span></div>
        <p className="menu-photo-note">{t('صور تصورية مولّدة بالذكاء الاصطناعي لتقديم المنتجات وتغليفها. الأسعار وتفاصيل الوصفات تُؤكّد عند الطلب.', 'AI-generated concepts of the products and their packaging. Prices and recipe details are confirmed when ordering.')}</p>
        <div className="products">{visibleProducts.map((p,i)=><ProductCard key={p.id} product={p} ar={ar} add={add} index={i}/>)}</div>
        {!visibleProducts.length && <p className="menu-no-results">{t('لا توجد أصناف مطابقة. جرّب اسمًا آخر أو اختر كل المنيو.', 'No matching creations. Try another name or select the full menu.')}</p>}
      </section>
      <section className="gallery-teaser"><div><h2>{t('التغليف… جزء من الهدية.','The wrapping is part of the gift.')}</h2><p>{t('اكتشف كل صور المنتجات وتصاميم التغليف في معرض دوبامين.','Explore every product image and packaging concept in our gallery.')}</p></div><a className="button primary" href="#/gallery">{t('شاهد كل الصور','Explore all images')}<Icon name="arrow"/></a></section>
      <section id="story" className="story"><div className="story-heart"><Icon name="heart" size={58}/></div><p className="english-statement">The sweet spot between<br/><i>discipline and desire.</i></p><div className="story-copy"><h2>{t('نؤمن أن الحلا جزء من التوازن.', 'Sweetness belongs in balance.')}</h2><p>{t('دوبامين مساحة صغيرة للمتعة في يومك. نعيد تخيّل الحلويات الصحية بروح دافئة وتفاصيل مدروسة، لأن الاختيار الذي يشعرك بالرضا يستحق أن يكون لذيذًا أيضًا.', 'Dopamine is a little space for pleasure in your day. We reimagine healthy sweets with warmth and thoughtful details, because a feel-good choice deserves to taste beautiful, too.')}</p><span className="story-signature">With love, Dopamine</span></div></section>
      <section id="gifting" className="gifting section-wrap"><div className="gift-photo"><img src={assetUrl(signature)} loading="lazy" alt={t('صندوق دوبامين الكريمي بتفاصيل الهوية الأصلية', 'Dopamine signature cream gift box')}/></div><div className="gift-copy"><h2>{t('بعض الهدايا', 'Some gifts')}<br/><em>{t('تُقال بقضمة.', 'say it sweetly.')}</em></h2><p>{t('شكرًا، أحبّك، أو لمجرّد أنك تستحقّ. اختَر هدية تحمل مشاعرك، بتغليف يليق باللحظة.', 'Thank you. I love you. Or simply, you deserve it. Find a thoughtful gift, beautifully wrapped for the moment.')}</p><a className="button secondary" href="#collection" onClick={() => setCategory('all')}>{t('اكتشف هدايا دوبامين', 'Explore thoughtful gifts')}<Icon name="arrow"/></a></div></section>
    </main>}
    <footer><div className="footer-top"><img src={assetUrl(logo)} alt="Dopamine Healthy sweets"/><p>{t('لحظة لك. وابتسامة لمن تحب.', 'A moment for you. A smile for someone you love.')}</p><a href="#collection">{t('اختر لحظتك', 'Find your moment')}<Icon name="arrow" size={18}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dopamine</span><span>{t('نسخة تجريبية — تُحفظ الطلبات للمراجعة دون مدفوعات', 'Demo — requests are saved for review; no payments')}</span><a href="#">{t('العودة للأعلى', 'Back to top')}</a></div></footer>
    <div role="status" className={`toast ${toast ? 'visible' : ''}`}><Icon name="check" size={18}/>{toast}</div>
    <dialog ref={dialog} aria-label={t('حقيبتك الحلوة', 'Your sweet bag')} className="cart-dialog" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onClose={() => { document.body.style.overflow = ''; }}>
      <div className="cart-panel"><div className="cart-header"><h2>{t('حقيبتك الحلوة', 'Your sweet bag')}</h2><button onClick={() => dialog.current?.close()} aria-label={t('إغلاق الحقيبة', 'Close bag')}><Icon name="close"/></button></div>
      {savedOrder ? <OrderReceipt ar={ar} order={savedOrder} onContinue={() => dialog.current?.close()}/> : checkout ? <Checkout ar={ar} cart={cart} onBack={() => setCheckout(false)} onSaved={order => { setSavedOrder(order); setCart({}); setCheckout(false); }}/>  : count === 0 ? <div className="empty"><Icon name="bag" size={46}/><h3>{t('لحظتك الحلوة في انتظارك', 'Your sweet moment awaits')}</h3><p>{t('اكتشف المجموعة وأضف ما تحب إلى حقيبتك.', 'Explore the collection and add something you love.')}</p><a href="#collection" className="button primary" onClick={() => dialog.current?.close()}>{t('تصفح المجموعة', 'Explore collection')}</a></div> : <><div className="cart-items">{products.filter(p => cart[p.id] > 0).map(p => <div className="cart-item" key={p.id}><img src={assetUrl(p.image)} alt=""/><div><h3>{ar ? p.ar : p.en}</h3><span>{money(p.price)}</span><div className="quantity"><button aria-label={t(`تقليل ${p.ar}`, `Decrease ${p.en}`)} onClick={() => change(p.id, -1)}><Icon name="minus" size={15}/></button><span>{cart[p.id]}</span><button aria-label={t(`زيادة ${p.ar}`, `Increase ${p.en}`)} disabled={cart[p.id] >= 99} onClick={() => change(p.id, 1)}><Icon name="plus" size={15}/></button></div></div><button className="remove" aria-label={t(`حذف ${p.ar}`, `Remove ${p.en}`)} onClick={() => setCart(old => ({ ...old, [p.id]: 0 }))}><Icon name="close" size={16}/></button></div>)}</div><div className="cart-summary"><div><span>{t('إجمالي الطلب', 'Order total')}</span><strong>{money(total)}</strong></div><p>{t('أرسل اختياراتك وسنؤكّد السعر والتوفر قبل تجهيز الطلب. لا يتم الدفع الآن.', 'Send your selection. Price and availability are confirmed before preparation. No payment now.')}</p><button className="button primary" onClick={() => setCheckout(true)}>{t('اختيار موعد وإرسال الطلب', 'Schedule and submit request')}<Icon name="arrow"/></button></div></>}
      </div>
    </dialog>
  </div>;
}



