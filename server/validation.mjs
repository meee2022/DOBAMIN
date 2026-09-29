export const fail = (message, status = 400) => Object.assign(new Error(message), { status });
export const clean = (value, min, max, label) => { if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw fail(label); return value.trim(); };
const nowDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Qatar', year:'numeric',month:'2-digit',day:'2-digit' }).format(new Date());
export function validate(input, catalog) {
  const customer = { name:clean(input.name, 2, 80, 'Enter your name'), phone:clean(input.phone, 7, 24, 'Enter your phone number') };
  if (!/^\+?[\d\s()-]{7,24}$/.test(customer.phone) || customer.phone.replace(/\D/g, '').length < 7) throw fail('Invalid phone number');
  const kind = input.kind;
  if (!['order','booking'].includes(kind)) throw fail('Invalid request type');
  const day = clean(input.day, 10, 10, 'Choose a date');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(Date.parse(day)) || new Date(day).toISOString().slice(0,10) !== day || day < nowDay() || day > new Date(Date.now()+366*86400000).toISOString().slice(0,10)) throw fail('Choose a date within the next year');
  const time = clean(input.time, 5, 5, 'Choose a time');
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || new Date(`${day}T${time}:00+03:00`).getTime() <= Date.now()) throw fail('Choose a future time');
  const notes = clean(input.notes || '', kind === 'booking' ? 5 : 0, 1000, 'Describe your booking');
  if (!['pickup','delivery'].includes(input.fulfillment)) throw fail('Choose pickup or delivery');
  const address = input.fulfillment === 'delivery' ? clean(input.address, 8, 300, 'Enter a delivery address') : '';
  let items = [];
  if (kind === 'order') {
    if (!Array.isArray(input.items) || !input.items.length || input.items.length > catalog.length) throw fail('Your bag is empty');
    const used = new Set();
    items = input.items.map(item => { const product = catalog.find(p => p.id === item.id); if (!product || used.has(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw fail('Invalid product quantity'); used.add(item.id); return { ...product, quantity:item.quantity }; });
  }
  return { ...customer, kind, day, time, notes, fulfillment:input.fulfillment, address, items, total:kind==='booking'||items.some(p=>p.price===null)?null:items.reduce((sum,p)=>sum+p.quantity*p.price,0), currency:'QAR' };
}
