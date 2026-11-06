import { lifestylePhotos } from './lifestyle-data';

export const approvedGifts = [
  {
    id: 'tarts',
    key: 'six-tarts-v1',
    ar: 'علبة التارت',
    en: 'Tart selection',
    quantityAr: '٦ قطع تارت',
    quantityEn: 'Six tarts',
  },
  {
    id: 'cups',
    key: 'six-dessert-cups',
    ar: 'علبة أكواب الحلوى',
    en: 'Dessert cup selection',
    quantityAr: '٦ أكواب حلوى',
    quantityEn: 'Six dessert cups',
  },
  {
    id: 'protein',
    key: 'protein-balls-12-v1',
    ar: 'علبة كرات البروتين',
    en: 'Protein ball selection',
    quantityAr: '١٢ كرة بروتين',
    quantityEn: 'Twelve protein balls',
  },
].map((gift) => ({ ...lifestylePhotos.find((photo) => photo.key === gift.key)!, ...gift }));

export const giftBookingLink = (id: string) => `#/booking?gift=${encodeURIComponent(id)}`;
export const requestedGift = () =>
  approvedGifts.find(
    (gift) => gift.id === new URLSearchParams(location.hash.split('?')[1] || '').get('gift'),
  );
