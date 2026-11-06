import React, { useEffect, useRef, useState } from 'react';
import { products } from './src/catalog';
import './src/brand-tokens.css';
import './src/web.css';
import './src/menu.css';
import './src/brand.css';
import './src/orders.css';
import './src/storefront.css';
import './src/identity.css';
import Icon from './src/Icon.web';
import SiteHeader from './src/SiteHeader.web';
import SiteFooter from './src/SiteFooter.web';
import Home from './src/Home.web';
import Cart from './src/Cart.web';
import Privacy from './src/Privacy.web';
import MyOrders from './src/orders/MyOrders.web';
import Booking from './src/orders/Booking.web';
import AdminOrders from './src/orders/AdminOrders.web';

// Assets are served before any worker runs, so non-primary hosts redirect here.
if (/^www.dopaminsweets.com$|.pages.dev$|.workers.dev$/.test(location.hostname))
  location.replace(
    `https://dopaminsweets.com${location.pathname}${location.search}${location.hash}`,
  );

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  const [route, setRoute] = useState(location.hash);
  useEffect(() => {
    const update = () => {
      // Old gallery links now lead to the customer-facing gifts collection.
      if (location.hash === '#/gallery') history.replaceState(null, '', '#gifting');
      setRoute(location.hash);
      if (location.hash.startsWith('#/'))
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      else
        requestAnimationFrame(() =>
          document.getElementById(location.hash.slice(1))?.scrollIntoView(),
        );
    };
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const dialog = useRef<HTMLDialogElement>(null);
  const ar = lang === 'ar';
  const currentRoute = route.split('?')[0];
  const t = (a: string, e: string) => (ar ? a : e);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dopamine-cart') || '{}');
      const clean: Record<string, number> = {};
      products.forEach((p) => {
        if (Number.isInteger(saved[p.id]) && saved[p.id] > 0)
          clean[p.id] = Math.min(99, saved[p.id]);
      });
      setCart(clean);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem('dopamine-cart', JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.title = ar
      ? 'دوبامين — حلويات وهدايا للمناسبات'
      : 'Dopamine — Sweets and gifts for every occasion';
  }, [lang]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(timer);
  }, [toast]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const change = (id: string, amount: number) => {
    setCart((old) => ({ ...old, [id]: Math.max(0, Math.min(99, (old[id] || 0) + amount)) }));
  };
  const add = (id: string) => {
    change(id, 1);
    setToast(t('أُضيف المنتج إلى سلة التسوق.', 'Product added to shopping cart.'));
  };
  const openCart = () => {
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
  };

  return (
    <div className="site" dir={ar ? 'rtl' : 'ltr'}>
      <SiteHeader
        t={t}
        count={count}
        toggleLang={() => setLang(ar ? 'en' : 'ar')}
        openCart={openCart}
      />
      <div
        id="main-content"
        className="route-content"
        tabIndex={-1}
        role={currentRoute.startsWith('#/') ? 'main' : undefined}
      >
        {currentRoute === '#/admin' ? (
          <AdminOrders ar={ar} />
        ) : currentRoute === '#/orders' ? (
          <MyOrders ar={ar} />
        ) : currentRoute === '#/privacy' ? (
          <Privacy t={t} ar={ar} />
        ) : currentRoute === '#/booking' ? (
          <Booking key={route} ar={ar} />
        ) : (
          <Home ar={ar} t={t} add={add} />
        )}
      </div>
      <SiteFooter t={t} />
      <div role="status" className={`toast ${toast ? 'visible' : ''}`}>
        <Icon name="check" size={18} />
        {toast}
      </div>
      <Cart ar={ar} t={t} cart={cart} setCart={setCart} change={change} dialog={dialog} />
    </div>
  );
}
