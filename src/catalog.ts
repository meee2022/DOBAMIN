import menu from './menu-data.json';
import prices from './prices.json';
export type MenuProduct = {
  id: string;
  ar: string;
  en: string;
  category: string;
  price: number | null;
  image: any;
  packagingImage: any;
};
const images: Record<string, { image: any; packagingImage: any }> = {
  'tarte-hazelnut-praline': {
    image: require('../assets/menu/identity-2026-11-06/tarte-hazelnut-praline - تارت براليني البندق.webp'),
    packagingImage: require('../assets/menu/web/tarte-hazelnut-praline - تارت براليني البندق - تغليف - Packaging.webp'),
  },
  'tarte-caviar': {
    image: require('../assets/menu/identity-2026-11-06/tarte-caviar - تارت كافيار.webp'),
    packagingImage: require('../assets/menu/web/tarte-caviar - تارت كافيار - تغليف - Packaging.webp'),
  },
  'tarte-pistachio': {
    image: require('../assets/menu/identity-2026-11-06/tarte-pistachio - تارت فستق.webp'),
    packagingImage: require('../assets/menu/web/tarte-pistachio - تارت فستق - تغليف - Packaging.webp'),
  },
  'tarte-strawberry': {
    image: require('../assets/menu/identity-2026-11-06/tarte-strawberry - تارت فراولة.webp'),
    packagingImage: require('../assets/menu/web/tarte-strawberry - تارت فراولة - تغليف - Packaging.webp'),
  },
  'tarte-dried-apple': {
    image: require('../assets/menu/identity-2026-11-06/tarte-dried-apple - تارت تفاح مجفف.webp'),
    packagingImage: require('../assets/menu/web/tarte-dried-apple - تارت تفاح مجفف - تغليف - Packaging.webp'),
  },
  'tarte-raspberry': {
    image: require('../assets/menu/identity-2026-11-06/tarte-raspberry - تارت توت العليق.webp'),
    packagingImage: require('../assets/menu/web/tarte-raspberry - تارت توت العليق - تغليف - Packaging.webp'),
  },
  'bahamas-lava-cake': {
    image: require('../assets/menu/identity-2026-11-06/bahamas-lava-cake - باهاماس لافا كيك.webp'),
    packagingImage: require('../assets/menu/web/bahamas-lava-cake - باهاماس لافا كيك - تغليف - Packaging.webp'),
  },
  tiramisu: {
    image: require('../assets/menu/identity-2026-11-06/tiramisu - تيراميسو.webp'),
    packagingImage: require('../assets/menu/web/tiramisu - تيراميسو - تغليف - Packaging.webp'),
  },
  'rice-pudding': {
    image: require('../assets/menu/identity-2026-11-06/rice-pudding - أرز بالحليب.webp'),
    packagingImage: require('../assets/menu/web/rice-pudding - أرز بالحليب - تغليف - Packaging.webp'),
  },
  'sneakers-bar': {
    image: require('../assets/menu/identity-2026-11-06/sneakers-bar - سنيكرز بار.webp'),
    packagingImage: require('../assets/menu/web/sneakers-bar - سنيكرز بار - تغليف - Packaging.webp'),
  },
  'matcha-cheesecake': {
    image: require('../assets/menu/identity-2026-11-06/matcha-cheesecake - تشيز كيك ماتشا.webp'),
    packagingImage: require('../assets/menu/web/matcha-cheesecake - تشيز كيك ماتشا - تغليف - Packaging.webp'),
  },
  basbousa: {
    image: require('../assets/menu/identity-2026-11-06/basbousa - بسبوسة.webp'),
    packagingImage: require('../assets/menu/web/basbousa - بسبوسة - تغليف - Packaging.webp'),
  },
  'cup-chocolate-cheesecake': {
    image: require('../assets/menu/identity-2026-11-06/cup-chocolate-cheesecake - كوب تشيز كيك شوكولاتة.webp'),
    packagingImage: require('../assets/menu/web/cup-chocolate-cheesecake - كوب تشيز كيك شوكولاتة - تغليف - Packaging.webp'),
  },
  'cup-berries-cheesecake': {
    image: require('../assets/menu/identity-2026-11-06/cup-berries-cheesecake - كوب تشيز كيك توت.webp'),
    packagingImage: require('../assets/menu/web/cup-berries-cheesecake - كوب تشيز كيك توت - تغليف - Packaging.webp'),
  },
  'cup-lotus-cheesecake': {
    image: require('../assets/menu/identity-2026-11-06/cup-lotus-cheesecake - كوب تشيز كيك لوتس.webp'),
    packagingImage: require('../assets/menu/web/cup-lotus-cheesecake - كوب تشيز كيك لوتس - تغليف - Packaging.webp'),
  },
  'cup-victoria-berries': {
    image: require('../assets/menu/identity-2026-11-06/cup-victoria-berries - كوب فيكتوريا كيك بالتوت.webp'),
    packagingImage: require('../assets/menu/web/cup-victoria-berries - كوب فيكتوريا كيك بالتوت - تغليف - Packaging.webp'),
  },
  'cup-victoria-apple-cinnamon': {
    image: require('../assets/menu/identity-2026-11-06/cup-victoria-apple-cinnamon - كوب فيكتوريا كيك بالتفاح والقرفة.webp'),
    packagingImage: require('../assets/menu/web/cup-victoria-apple-cinnamon - كوب فيكتوريا كيك بالتفاح والقرفة - تغليف - Packaging.webp'),
  },
  'cup-victoria-coconut-pineapple': {
    image: require('../assets/menu/identity-2026-11-06/cup-victoria-coconut-pineapple - كوب فيكتوريا كيك بجوز الهند والأناناس.webp'),
    packagingImage: require('../assets/menu/web/cup-victoria-coconut-pineapple - كوب فيكتوريا كيك بجوز الهند والأناناس - تغليف - Packaging.webp'),
  },
  'cup-black-forest': {
    image: require('../assets/menu/identity-2026-11-06/cup-black-forest - كوب بلاك فورست.webp'),
    packagingImage: require('../assets/menu/web/cup-black-forest - كوب بلاك فورست - تغليف - Packaging.webp'),
  },
  'cup-friandise-pistachio-raspberry': {
    image: require('../assets/menu/identity-2026-11-06/cup-friandise-pistachio-raspberry - كوب فريانديز بالفستق وتوت العليق.webp'),
    packagingImage: require('../assets/menu/web/cup-friandise-pistachio-raspberry - كوب فريانديز بالفستق وتوت العليق - تغليف - Packaging.webp'),
  },
  'cup-orange-creme-brulee': {
    image: require('../assets/menu/identity-2026-11-06/cup-orange-creme-brulee - كوب كريم بروليه بالبرتقال.webp'),
    packagingImage: require('../assets/menu/web/cup-orange-creme-brulee - كوب كريم بروليه بالبرتقال - تغليف - Packaging.webp'),
  },
  'almond-cardamom-petit-four': {
    image: require('../assets/menu/identity-2026-11-06/almond-cardamom-petit-four - بيتي فور باللوز والهيل.webp'),
    packagingImage: require('../assets/menu/web/almond-cardamom-petit-four - بيتي فور باللوز والهيل - تغليف - Packaging.webp'),
  },
  'cup-libanaise-traditional': {
    image: require('../assets/menu/identity-2026-11-06/cup-libanaise-traditional - كوب ليبانيز التقليدي.webp'),
    packagingImage: require('../assets/menu/web/cup-libanaise-traditional - كوب ليبانيز التقليدي - تغليف - Packaging.webp'),
  },
  'cup-libanaise-apple-crumble': {
    image: require('../assets/menu/identity-2026-11-06/cup-libanaise-apple-crumble - كوب ليبانيز تفاح كرامبل.webp'),
    packagingImage: require('../assets/menu/web/cup-libanaise-apple-crumble - كوب ليبانيز تفاح كرامبل - تغليف - Packaging.webp'),
  },
};
export const products: MenuProduct[] = menu.map((p) => ({
  ...p,
  price:
    (prices as { id: string; price: number | null }[]).find((row) => row.id === p.id)?.price ??
    null,
  ...images[p.id],
}));
export const assetUrl = (asset: any): string => (typeof asset === 'string' ? asset : asset.uri);
