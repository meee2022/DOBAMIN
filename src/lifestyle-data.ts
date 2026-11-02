// Latest approved brush artwork, photographed in the boutique lifestyle setting.
// Full images are preserved; responsive copies change size only, without cropping.
export const lifestylePhotos = [
  {
    key: 'six-tarts-v1',
    ar: 'بوكس ٦ تارت — تشكيلة أولى',
    en: 'Six tarts — first selection',
    width: 1024,
    height: 1536,
  },
  {
    key: 'six-dessert-cups',
    ar: 'بوكس ٦ أكواب حلوى',
    en: 'Six dessert cups',
    width: 1024,
    height: 1536,
  },
  {
    key: 'six-tarts-v2',
    ar: 'بوكس ٦ تارت — تشكيلة ثانية',
    en: 'Six tarts — second selection',
    width: 1024,
    height: 1536,
  },
  {
    key: 'protein-balls-12-v1',
    ar: 'بوكس ١٢ بروتين بول — تصميم أول',
    en: 'Twelve protein balls — first design',
    width: 1536,
    height: 1024,
  },
  {
    key: 'protein-balls-12-v2',
    ar: 'بوكس ١٢ بروتين بول — تصميم ثانٍ',
    en: 'Twelve protein balls — second design',
    width: 1536,
    height: 1024,
  },
  {
    key: 'cookies-and-sauce',
    ar: 'كوكيز مع الصوص',
    en: 'Cookies and sauce',
    width: 1448,
    height: 1086,
  },
  {
    key: 'window-cup-carrier',
    ar: 'حامل أكواب بنافذة',
    en: 'Window dessert cup carrier',
    width: 1254,
    height: 1254,
  },
  {
    key: 'protein-pillow-box',
    ar: 'علبة وسادة للبروتين بول',
    en: 'Protein ball pillow box',
    width: 1254,
    height: 1254,
  },
  {
    key: 'hexagonal-protein-box',
    ar: 'بوكس بروتين سداسي مع الصوص',
    en: 'Hexagonal protein box with sauce',
    width: 1254,
    height: 1254,
  },
].map((photo) => ({
  ...photo,
  src: `/collections/brush-lifestyle/${photo.key}.webp`,
  srcSet: `/collections/brush-lifestyle/${photo.key}-640.webp 640w, /collections/brush-lifestyle/${photo.key}.webp ${photo.width}w`,
}));

export const lifestyleHero = lifestylePhotos.find((photo) => photo.key === 'window-cup-carrier')!;
export const lifestyleGift = lifestylePhotos.find(
  (photo) => photo.key === 'hexagonal-protein-box',
)!;
