export default function Privacy({ t }: { t: (a: string, e: string) => string }) {
  return (
    <section className="orders-page">
      <div className="orders-heading">
        <div>
          <h1>{t('الخصوصية وشروط الطلب', 'Privacy and order terms')}</h1>
        </div>
      </div>
      <h2>{t('البيانات التي نجمعها', 'What we collect')}</h2>
      <p>
        {t(
          'الاسم ورقم التواصل وموعد الطلب وملاحظاتك، والعنوان عند طلب التوصيل. لا نجمع بيانات دفع.',
          'Your name, phone number, requested time and notes, plus your address for delivery requests. We collect no payment details.',
        )}
      </p>
      <h2>{t('كيف نستخدمها', 'How we use it')}</h2>
      <p>
        {t(
          'لتجهيز طلبك والتواصل معك بشأنه فقط. لا نبيعها ولا نشاركها لأغراض تسويقية. تُخزَّن لدى Cloudflare، ويراها فريق دوبامين المصرّح له.',
          'Only to prepare your request and contact you about it. We do not sell it or share it for marketing. It is stored with Cloudflare and visible to authorised Dopamine staff.',
        )}
      </p>
      <h2>{t('حقيبتك وسجلّ طلباتك', 'Your bag and request history')}</h2>
      <p>
        {t(
          'نحفظ الحقيبة ورمز متابعة الطلبات على جهازك فقط، ويمكنك حذفهما بمسح بيانات الموقع.',
          'Your bag and request-tracking token stay on your device. Clearing site data removes them.',
        )}
      </p>
      <h2>{t('شروط الطلب', 'Order terms')}</h2>
      <p>
        {t(
          'الطلب لا يصبح مؤكدًا إلا بعد مراجعة الفريق. يتأكد السعر والتوفر والتوصيل عند التأكيد، ولا يتم الدفع عبر الموقع.',
          'A request is confirmed only after our team reviews it. Price, availability and delivery are settled at confirmation. No payment is taken on this site.',
        )}
      </p>
    </section>
  );
}
