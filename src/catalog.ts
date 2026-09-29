import menu from './menu-data.json';
import prices from './prices.json';
export type MenuProduct = { id:string; ar:string; en:string; category:string; price:number|null; image:any; packagingImage:any };
const images: Record<string,{image:any;packagingImage:any}> = {
  'tarte-hazelnut-praline': {image:require('../assets/menu/web/tarte-hazelnut-praline - تارت براليني البندق - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tarte-hazelnut-praline - تارت براليني البندق - تغليف - Packaging.webp')},
  'tarte-caviar': {image:require('../assets/menu/web/tarte-caviar - تارت كافيار - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tarte-caviar - تارت كافيار - تغليف - Packaging.webp')},
  'tarte-pistachio': {image:require('../assets/menu/web/tarte-pistachio - تارت فستق - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tarte-pistachio - تارت فستق - تغليف - Packaging.webp')},
  'tarte-strawberry': {image:require('../assets/menu/web/tarte-strawberry - تارت فراولة - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tarte-strawberry - تارت فراولة - تغليف - Packaging.webp')},
  'tarte-dried-apple': {image:require('../assets/menu/web/tarte-dried-apple - تارت تفاح مجفف - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tarte-dried-apple - تارت تفاح مجفف - تغليف - Packaging.webp')},
  'tarte-raspberry': {image:require('../assets/menu/web/tarte-raspberry - تارت توت العليق - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tarte-raspberry - تارت توت العليق - تغليف - Packaging.webp')},
  'bahamas-lava-cake': {image:require('../assets/menu/web/bahamas-lava-cake - باهاماس لافا كيك - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/bahamas-lava-cake - باهاماس لافا كيك - تغليف - Packaging.webp')},
  'tiramisu': {image:require('../assets/menu/web/tiramisu - تيراميسو - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/tiramisu - تيراميسو - تغليف - Packaging.webp')},
  'rice-pudding': {image:require('../assets/menu/web/rice-pudding - أرز بالحليب - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/rice-pudding - أرز بالحليب - تغليف - Packaging.webp')},
  'sneakers-bar': {image:require('../assets/menu/web/sneakers-bar - سنيكرز بار - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/sneakers-bar - سنيكرز بار - تغليف - Packaging.webp')},
  'matcha-cheesecake': {image:require('../assets/menu/web/matcha-cheesecake - تشيز كيك ماتشا - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/matcha-cheesecake - تشيز كيك ماتشا - تغليف - Packaging.webp')},
  'basbousa': {image:require('../assets/menu/web/basbousa - بسبوسة - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/basbousa - بسبوسة - تغليف - Packaging.webp')},
  'cup-chocolate-cheesecake': {image:require('../assets/menu/web/cup-chocolate-cheesecake - كوب تشيز كيك شوكولاتة - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-chocolate-cheesecake - كوب تشيز كيك شوكولاتة - تغليف - Packaging.webp')},
  'cup-berries-cheesecake': {image:require('../assets/menu/web/cup-berries-cheesecake - كوب تشيز كيك توت - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-berries-cheesecake - كوب تشيز كيك توت - تغليف - Packaging.webp')},
  'cup-lotus-cheesecake': {image:require('../assets/menu/web/cup-lotus-cheesecake - كوب تشيز كيك لوتس - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-lotus-cheesecake - كوب تشيز كيك لوتس - تغليف - Packaging.webp')},
  'cup-victoria-berries': {image:require('../assets/menu/web/cup-victoria-berries - كوب فيكتوريا كيك بالتوت - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-victoria-berries - كوب فيكتوريا كيك بالتوت - تغليف - Packaging.webp')},
  'cup-victoria-apple-cinnamon': {image:require('../assets/menu/web/cup-victoria-apple-cinnamon - كوب فيكتوريا كيك بالتفاح والقرفة - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-victoria-apple-cinnamon - كوب فيكتوريا كيك بالتفاح والقرفة - تغليف - Packaging.webp')},
  'cup-victoria-coconut-pineapple': {image:require('../assets/menu/web/cup-victoria-coconut-pineapple - كوب فيكتوريا كيك بجوز الهند والأناناس - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-victoria-coconut-pineapple - كوب فيكتوريا كيك بجوز الهند والأناناس - تغليف - Packaging.webp')},
  'cup-black-forest': {image:require('../assets/menu/web/cup-black-forest - كوب بلاك فورست - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-black-forest - كوب بلاك فورست - تغليف - Packaging.webp')},
  'cup-friandise-pistachio-raspberry': {image:require('../assets/menu/web/cup-friandise-pistachio-raspberry - كوب فريانديز بالفستق وتوت العليق - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-friandise-pistachio-raspberry - كوب فريانديز بالفستق وتوت العليق - تغليف - Packaging.webp')},
  'cup-orange-creme-brulee': {image:require('../assets/menu/web/cup-orange-creme-brulee - كوب كريم بروليه بالبرتقال - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-orange-creme-brulee - كوب كريم بروليه بالبرتقال - تغليف - Packaging.webp')},
  'almond-cardamom-petit-four': {image:require('../assets/menu/web/almond-cardamom-petit-four - بيتي فور باللوز والهيل - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/almond-cardamom-petit-four - بيتي فور باللوز والهيل - تغليف - Packaging.webp')},
  'cup-libanaise-traditional': {image:require('../assets/menu/web/cup-libanaise-traditional - كوب ليبانيز التقليدي - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-libanaise-traditional - كوب ليبانيز التقليدي - تغليف - Packaging.webp')},
  'cup-libanaise-apple-crumble': {image:require('../assets/menu/web/cup-libanaise-apple-crumble - كوب ليبانيز تفاح كرامبل - طبق - Plate.webp'),packagingImage:require('../assets/menu/web/cup-libanaise-apple-crumble - كوب ليبانيز تفاح كرامبل - تغليف - Packaging.webp')}
};
export const products: MenuProduct[] = menu.map(p=>({...p,price:(prices as {id:string;price:number|null}[]).find(row=>row.id===p.id)?.price??null,...images[p.id]}));
export const assetUrl = (asset:any):string => typeof asset === 'string' ? asset : asset.uri;
