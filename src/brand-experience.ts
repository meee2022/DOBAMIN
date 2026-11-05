import { lifestylePhotos } from './lifestyle-data';

export const approvedGifts = [
  {
    id: 'tarts',
    key: 'six-tarts-v1',
    ar: 'بوكس التارت',
    en: 'Tart selection',
    quantityAr: '٦ قطع تارت',
    quantityEn: 'Six tarts',
  },
  {
    id: 'cups',
    key: 'six-dessert-cups',
    ar: 'بوكس أكواب الحلوى',
    en: 'Dessert cup selection',
    quantityAr: '٦ أكواب حلوى',
    quantityEn: 'Six dessert cups',
  },
  {
    id: 'protein',
    key: 'protein-balls-12-v1',
    ar: 'بوكس البروتين بول',
    en: 'Protein ball selection',
    quantityAr: '١٢ حبة بروتين بول',
    quantityEn: 'Twelve protein balls',
  },
].map((gift) => ({ ...lifestylePhotos.find((photo) => photo.key === gift.key)!, ...gift }));

export const giftBookingLink = (id: string) => `#/booking?gift=${encodeURIComponent(id)}`;
export const requestedGift = () =>
  approvedGifts.find(
    (gift) => gift.id === new URLSearchParams(location.hash.split('?')[1] || '').get('gift'),
  );
