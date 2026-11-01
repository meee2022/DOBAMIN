import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { products } from '../catalog';
import { colors, fonts, shadow, space } from './theme';
import { useStore } from './store';
import { Body, Button, EmptyState, money, Title } from './ui';

function Step({
  icon,
  label,
  onPress,
  disabled,
}: {
  icon: 'plus' | 'minus';
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.step,
        pressed && { backgroundColor: colors.surface },
        disabled && { opacity: 0.4 },
      ]}
    >
      <Feather name={icon} size={16} color={colors.ink} />
    </Pressable>
  );
}

export default function CartScreen({ navigation }: any) {
  const { ar, t, cart, change, count } = useStore();
  const selected = products.filter((p) => cart[p.id] > 0);
  const total = selected.some((p) => p.price === null)
    ? null
    : selected.reduce((sum, p) => sum + (p.price ?? 0) * cart[p.id], 0);
  if (!count)
    return (
      <View style={[styles.page, { justifyContent: 'center' }]}>
        <EmptyState
          icon="shopping-bag"
          title={t('لحظتك الحلوة في انتظارك', 'Your sweet moment awaits')}
          body={t(
            'اكتشف المنيو وأضف ما تحب إلى حقيبتك.',
            'Explore the menu and add something you love.',
          )}
          action={
            <Button
              label={t('تصفح المنيو', 'Browse the menu')}
              onPress={() => navigation.navigate('MenuTab')}
            />
          }
        />
      </View>
    );
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      {selected.map((p) => (
        <View key={p.id} style={styles.item}>
          <Image source={p.image} style={styles.image} />
          <View style={{ flex: 1, gap: space.xs }}>
            <Text style={styles.name}>{ar ? p.ar : p.en}</Text>
            <Body style={{ fontSize: 13 }}>{money(p.price, t)}</Body>
            <View style={styles.quantity}>
              <Step
                icon="minus"
                label={t(`تقليل ${p.ar}`, `Decrease ${p.en}`)}
                onPress={() => change(p.id, -1)}
              />
              <Text style={styles.name}>{cart[p.id]}</Text>
              <Step
                icon="plus"
                label={t(`زيادة ${p.ar}`, `Increase ${p.en}`)}
                disabled={cart[p.id] >= 99}
                onPress={() => change(p.id, 1)}
              />
            </View>
          </View>
        </View>
      ))}
      <View style={styles.summary}>
        <Title style={{ fontSize: 20 }}>{t('إجمالي الطلب', 'Order total')}</Title>
        <Body>{money(total, t)}</Body>
        <Body style={{ fontSize: 14 }}>
          {t(
            'أرسل اختياراتك وسنؤكّد السعر والتوفر قبل التجهيز. لا يتم الدفع الآن.',
            'Send your selection. Price and availability are confirmed before preparation. No payment now.',
          )}
        </Body>
        <Button
          icon="calendar"
          label={t('اختيار موعد وإرسال الطلب', 'Schedule and submit')}
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, gap: space.md },
  item: {
    flexDirection: 'row',
    gap: space.md,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: space.md,
    ...shadow,
  },
  image: { width: 88, height: 88, borderRadius: 16 },
  name: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink },
  quantity: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  step: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: { gap: space.sm, paddingTop: space.md },
});
