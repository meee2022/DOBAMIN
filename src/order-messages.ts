// Presentation-only translations of the existing API messages. Validation and
// response codes remain owned by the orders service.
const messages: Record<string, [string, string]> = {
  'Enter your name': ['أدخل اسمك الكامل.', 'Enter your full name.'],
  'Enter your phone number': ['أدخل رقم الهاتف.', 'Enter your phone number.'],
  'Invalid phone number': ['رقم الهاتف غير صحيح. تحقق من الرقم وأعد المحاولة.', 'Check your phone number and try again.'],
  'Invalid request number': ['رقم الطلب غير صحيح. أدخل الرقم الكامل كما يظهر في تأكيد الطلب.', 'Enter the complete request number shown in your confirmation.'],
  'Invalid customer token': ['تعذرت متابعة الطلب من جلسة التصفح الحالية. حدّث الصفحة وأعد المحاولة.', 'Refresh the page and try tracking the request again.'],
  'Invalid request key': ['تعذر إرسال الطلب من الصفحة الحالية. حدّث الصفحة وأعد المحاولة.', 'Refresh the page and submit your request again.'],
  'Invalid request type': ['تعذر تحديد نوع الطلب. حدّث الصفحة وأعد المحاولة.', 'Refresh the page and submit your request again.'],
  'Choose a date': ['حدّد تاريخ التجهيز المطلوب.', 'Choose your preparation date.'],
  'Choose a date within the next year': ['حدّد تاريخًا من اليوم وحتى عام من الآن.', 'Choose a date between today and one year from now.'],
  'Choose a time': ['حدّد وقت التجهيز المطلوب.', 'Choose your preparation time.'],
  'Choose a future time': ['حدّد موعدًا لاحقًا للوقت الحالي.', 'Choose a future preparation time.'],
  'Describe your booking': ['أدخل تفاصيل المناسبة والكميات المطلوبة.', 'Enter your occasion details and requested quantities.'],
  'Choose pickup or delivery': ['حدّد الاستلام من المتجر أو طلب التوصيل.', 'Choose store pickup or request delivery.'],
  'Enter a delivery address': ['أدخل عنوان التوصيل والمنطقة.', 'Enter the delivery address and area.'],
  'Your bag is empty': ['سلة التسوق فارغة. أضف المنتجات قبل إرسال الطلب.', 'Your shopping cart is empty. Add products before submitting.'],
  'Invalid product quantity': ['حدّد كمية من ١ إلى ٩٩ لكل منتج، ثم أعد المحاولة.', 'Choose a quantity from 1 to 99 for each product, then try again.'],
  'Request too large': ['بيانات الطلب تتجاوز الحجم المسموح. اختصر الملاحظات وأعد المحاولة.', 'Your request is too large. Shorten the notes and try again.'],
  'Invalid JSON': ['تعذر إرسال بيانات الطلب. راجع البيانات وأعد المحاولة.', 'Check your request details and try submitting again.'],
  'Too many requests. Try again in a minute.': ['أُرسلت محاولات عديدة خلال وقت قصير. يرجى الانتظار دقيقة ثم المحاولة مجددًا.', 'Too many attempts. Wait one minute and try again.'],
  'Sign in required': ['يرجى تسجيل الدخول للمتابعة.', 'Sign in to continue.'],
  'Origin not allowed': ['افتح الموقع الرسمي وأعد المحاولة.', 'Open the official website and try again.'],
  'Staff access is not configured': ['دخول فريق العمل غير متاح حاليًا. يرجى التواصل مع الإدارة.', 'Staff access is currently unavailable. Contact the administrator.'],
  'Incorrect access key': ['مفتاح الدخول غير صحيح. تحقق منه وأعد المحاولة.', 'Check the access key and try again.'],
  'No request matches this number and phone': ['لم يُعثر على طلب يطابق رقم الطلب ورقم الهاتف. تحقق من البيانات وأعد المحاولة.', 'No request matches these details. Check the request number and phone number.'],
  'Request conflict': ['تعذر إتمام الطلب بهذه البيانات. حدّث الصفحة وأعد المحاولة.', 'Refresh the page and try your request again.'],
  'Invalid status': ['حالة الطلب غير صالحة. حدّث القائمة واختر حالة أخرى.', 'Refresh the list and choose a valid request status.'],
  'Order not found': ['لم يُعثر على الطلب. حدّث القائمة وتحقق من رقم الطلب.', 'Refresh the list and check the request number.'],
  'Order changed. Refresh and try again.': ['تغيّرت بيانات الطلب. حدّث القائمة وأعد المحاولة.', 'The request has changed. Refresh the list and try again.'],
  'Not found': ['تعذر العثور على الصفحة المطلوبة. عُد إلى الصفحة الرئيسية وأعد المحاولة.', 'Return to the home page and try again.'],
  'Could not save. Please try again.': ['تعذر حفظ الطلب. يرجى المحاولة مجددًا.', 'Unable to save the request. Please try again.'],
};

export function orderMessage(message: string, ar: boolean): string {
  const known = messages[message];
  if (known) return known[ar ? 0 : 1];
  const hours = message.match(/^Orders need at least (\d+) hours to prepare$/);
  if (hours)
    return ar
      ? `يجب تقديم الطلب قبل الموعد المطلوب بما لا يقل عن ${hours[1]} ساعة.`
      : `Submit your request at least ${hours[1]} hours before the required time.`;
  const time = message.match(/^Choose a time between ([\d:]+) and ([\d:]+)$/);
  if (time)
    return ar
      ? `اختر وقتًا بين ${time[1]} و${time[2]} بتوقيت قطر.`
      : `Choose a time between ${time[1]} and ${time[2]}, Qatar time.`;
  if (message.includes('Orders service unavailable'))
    return ar
      ? 'تعذر الاتصال بخدمة الطلبات. تحقق من اتصال الإنترنت وحاول مجددًا.'
      : 'Unable to connect to the orders service. Check your internet connection and try again.';
  return ar
    ? 'تعذر إتمام العملية. يرجى المحاولة مجددًا.'
    : 'Unable to complete the action. Please try again.';
}
