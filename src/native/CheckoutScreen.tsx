import { useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import * as Crypto from 'expo-crypto';
import * as Haptics from 'expo-haptics';
import { products } from '../catalog';
import { api, Order } from '../orders-api';
import shop from '../shop-config.json';
import { colors, fonts, space } from './theme';
import { ownerToken, useStore } from './store';
import { Body, Button, Chip, EmptyState, Field, Title } from './ui';

const QATAR_OFFSET = 3 * 3600000;
const hour = (value: string) => Number(value.slice(0, 2));
const slotTime = (day: string, time: string) => new Date(`${day}T${time}:00+03:00`).getTime();

// Offers only slots the server will accept: inside opening hours and past the lead time.
function availableSlots() {
  const earliest = Date.now() + shop.leadHours * 3600000;
  const firstDay = new Date(earliest + QATAR_OFFSET);
  const days = Array.from({ length: 14 }, (_, i) =>
    new Date(firstDay.getTime() + i * 86400000).toISOString().slice(0, 10),
  );
  const hours = Array.from(
    { length: hour(shop.closesAt) - hour(shop.opensAt) + 1 },
    (_, i) => `${String(hour(shop.opensAt) + i).padStart(2, '0')}:00`,
  );
  return days
    .map((day) => ({ day, times: hours.filter((time) => slotTime(day, time) >= earliest) }))
    .filter((d) => d.times.length);
}

export default function CheckoutScreen({ route, navigation }: any) {
  const booking = !!route.params?.booking;
  const { ar, t, cart, clearCart } = useStore();
  const slots = useMemo(availableSlots, []);
  const requestKey = useRef(Crypto.randomUUID());
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState(slots[0].day);
  const [time, setTime] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState<Order | null>(null);
  const times = slots.find((s) => s.day === day)!.times;
  const formatDay = (value: string) =>
    new Intl.DateTimeFormat(ar ? 'ar-QA' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Qatar',
    }).format(new Date(`${value}T12:00:00+03:00`));

  async function submit() {
    setBusy(true);
    setError('');
    try {
      const result = await api<{ order: Order }>('/orders', {
        method: 'POST',
        body: {
          name,
          phone,
          day,
          time,
          address,
          notes,
          kind: booking ? 'booking' : 'order',
          fulfillment: delivery ? 'delivery' : 'pickup',
          items: booking
            ? []
            : products
                .filter((p) => cart[p.id] > 0)
                .map((p) => ({ id: p.id, quantity: cart[p.id] })),
          ownerToken: await ownerToken(),
          requestKey: requestKey.current,
        },
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (!booking) clearCart();
      setSaved(result.order);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (saved)
    return (
      <View style={[styles.page, { justifyContent: 'center' }]}>
        <EmptyState
          icon="check"
          title={t('وصلنا طلبك', 'Request received')}
          body={`${saved.id}\n${saved.day} · ${saved.time} ${t('بتوقيت قطر', 'Qatar time')}`}
          action={
            <View style={{ gap: space.sm, alignSelf: 'stretch' }}>
              {!!shop.whatsapp && (
                <Button
                  secondary
                  icon="message-circle"
                  label={t('تأكيد عبر واتساب', 'Confirm on WhatsApp')}
                  onPress={() =>
                    Linking.openURL(
                      `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(saved.id)}`,
                    )
                  }
                />
              )}
              <Button
                label={t('متابعة طلباتي', 'View my requests')}
                onPress={() => navigation.navigate('OrdersTab')}
              />
            </View>
          }
        />
      </View>
    );

  const valid =
    name.trim().length >= 2 &&
    phone.replace(/\D/g, '').length >= 7 &&
    !!time &&
    (!delivery || address.trim().length >= 8) &&
    (!booking || notes.trim().length >= 5) &&
    consent;

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Body>
          {t(
            `نستقبل الطلبات قبل موعدها بـ ${shop.leadHours} ساعة على الأقل. سنراجع طلبك قبل تأكيده، ولا يتم الدفع الآن.`,
            `Orders need at least ${shop.leadHours} hours' notice. We review your request before confirming, and no payment is taken now.`,
          )}
        </Body>
        <Field
          label={t('الاسم الكامل', 'Full name')}
          value={name}
          onChangeText={setName}
          autoComplete="name"
          maxLength={80}
        />
        <Field
          label={t('رقم التواصل', 'Phone number')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoComplete="tel"
          placeholder="+974"
          maxLength={24}
        />
        <Title style={styles.section}>{t('يوم التجهيز', 'Preparation date')}</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {slots.map((s) => (
            <Chip
              key={s.day}
              label={formatDay(s.day)}
              selected={day === s.day}
              onPress={() => {
                setDay(s.day);
                setTime('');
              }}
            />
          ))}
        </ScrollView>
        <Title style={styles.section}>
          {t('الوقت المطلوب · توقيت قطر', 'Preferred time · Qatar time')}
        </Title>
        <View style={[styles.chips, { flexWrap: 'wrap' }]}>
          {times.map((value) => (
            <Chip
              key={value}
              label={value}
              selected={time === value}
              onPress={() => setTime(value)}
            />
          ))}
        </View>
        <Title style={styles.section}>{t('طريقة الاستلام', 'Fulfilment')}</Title>
        <View style={styles.chips}>
          <Chip
            label={t('استلام من المتجر', 'Store pickup')}
            selected={!delivery}
            onPress={() => setDelivery(false)}
          />
          <Chip
            label={t('طلب توصيل', 'Delivery request')}
            selected={delivery}
            onPress={() => setDelivery(true)}
          />
        </View>
        {delivery && (
          <Field
            label={t('العنوان والمنطقة', 'Address and area')}
            value={address}
            onChangeText={setAddress}
            multiline
            maxLength={300}
            autoComplete="street-address"
          />
        )}
        <Field
          label={
            booking
              ? t('تفاصيل المناسبة والكميات', 'Occasion and quantities')
              : t('ملاحظات إضافية (اختياري)', 'Additional notes (optional)')
          }
          value={notes}
          onChangeText={setNotes}
          multiline
          maxLength={1000}
        />
        <View style={styles.consent}>
          <Switch
            value={consent}
            onValueChange={setConsent}
            accessibilityLabel={t('الموافقة على مشاركة البيانات', 'Consent to share details')}
            trackColor={{ true: colors.action, false: colors.line }}
          />
          <Text style={styles.consentText} onPress={() => navigation.navigate('Privacy')}>
            {t(
              'أوافق على مشاركة بياناتي مع فريق دوبامين لمتابعة الطلب. (الخصوصية والشروط)',
              'I agree to share my details with Dopamine to handle this request. (Privacy and terms)',
            )}
          </Text>
        </View>
        {!!error && (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        )}
        <Button
          label={t('إرسال الطلب', 'Submit request')}
          busy={busy}
          disabled={!valid}
          onPress={submit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, gap: space.md, paddingBottom: space.xxl },
  section: { fontSize: 18, lineHeight: 30 },
  chips: { flexDirection: 'row', gap: space.sm },
  consent: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  consentText: { flex: 1, fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.ink },
  error: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.error },
});
