import config from '../app.json';

export const WEBSITE_URL = config.expo.extra.websiteUrl;
export const websiteLinks = {
  menu: `${WEBSITE_URL}/#collection`,
  orders: `${WEBSITE_URL}/#/orders`,
  booking: `${WEBSITE_URL}/#/booking`,
};

export function productWebsiteUrl(productName: string) {
  return `${WEBSITE_URL}/?q=${encodeURIComponent(productName)}#collection`;
}
