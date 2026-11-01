import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import shop from '../shop-config.json';
import { colors, fonts, shadow, space } from './theme';
import { useStore } from './store';
import { Body, Title } from './ui';

function Row({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.surface }]}
    >
      <Feather name={icon} size={20} color={colors.action} />
      <Text style={styles.rowText}>{label}</Text>
    </Pressable>
  );
}

export default function MoreScreen({ navigation }: any) {
  const { t, toggleLang } = useStore();
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.group}>
        <Row
          icon="gift"
          label={t('حجز مناسبة', 'Book an occasion')}
          onPress={() => navigation.navigate('Booking', { booking: true })}
        />
        <Row icon="globe" label={t('English', 'العربية')} onPress={toggleLang} />
        <Row
          icon="shield"
          label={t('الخصوصية والشروط', 'Privacy and terms')}
          onPress={() => navigation.navigate('Privacy')}
        />
        {!!shop.whatsapp && (
          <Row
            icon="message-circle"
            label="WhatsApp"
            onPress={() => Linking.openURL(`https://wa.me/${shop.whatsapp}`)}
          />
        )}
        {!!shop.instagram && (
          <Row
            icon="instagram"
            label="Instagram"
            onPress={() => Linking.openURL(`https://instagram.com/${shop.instagram}`)}
          />
        )}
      </View>
    </ScrollView>
  );
}

export function PrivacyScreen() {
  const { t } = useStore();
  const sections = [
    [
      t('البيانات التي نجمعها', 'What we collect'),
      t(
        'الاسم ورقم التواصل وموعد الطلب وملاحظاتك، والعنوان عند طلب التوصيل. لا نجمع بيانات دفع.',
        'Your name, phone number, requested time and notes, plus your address for delivery requests. We collect no payment details.',
      ),
    ],
    [
      t('كيف نستخدمها', 'How we use it'),
      t(
        'لتجهيز طلبك والتواصل معك بشأنه فقط. لا نبيعها ولا نشاركها لأغراض تسويقية. تُخزَّن لدى Cloudflare، ويراها فريق دوبامين المصرّح له.',
        'Only to prepare your request and contact you about it. We do not sell it or share it for marketing. It is stored with Cloudflare and visible to authorised Dopamine staff.',
      ),
    ],
    [
      t('حقيبتك وسجلّ طلباتك', 'Your bag and request history'),
      t(
        'نحفظ الحقيبة ورمز متابعة الطلبات على جهازك فقط، ويُحذفان بحذف التطبيق.',
        'Your bag and request-tracking token stay on your device and are removed with the app.',
      ),
    ],
    [
      t('شروط الطلب', 'Order terms'),
      t(
        'الطلب لا يصبح مؤكدًا إلا بعد مراجعة الفريق. يتأكد السعر والتوفر والتوصيل عند التأكيد، ولا يتم الدفع عبر التطبيق.',
        'A request is confirmed only after our team reviews it. Price, availability and delivery are settled at confirmation. No payment is taken in the app.',
      ),
    ],
  ];
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      {sections.map(([title, body]) => (
        <View key={title}>
          <Title style={{ fontSize: 20, lineHeight: 32 }}>{title}</Title>
          <Body>{body}</Body>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, gap: space.lg },
  group: { backgroundColor: colors.white, borderRadius: 20, overflow: 'hidden', ...shadow },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: 56,
    paddingHorizontal: space.lg,
  },
  rowText: { fontFamily: fonts.body, fontSize: 17, color: colors.ink },
});
