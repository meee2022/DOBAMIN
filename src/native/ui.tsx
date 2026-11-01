import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Order, OrderStatus, statusLabels } from '../orders-api';
import { colors, fonts, shadow, space, statusColors } from './theme';
import { useStore } from './store';

export function Title({ style, ...props }: TextProps) {
  const { ar } = useStore();
  return <Text {...props} style={[styles.title, { fontFamily: fonts.heading(ar) }, style]} />;
}

export function Body({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.body, style]} />;
}

export function FadeIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(value, { toValue: 1, duration: 300, delay, useNativeDriver: true }).start();
  }, [value, delay]);
  const translateY = value.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
  return (
    <Animated.View style={{ opacity: value, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export function Button({
  label,
  onPress,
  secondary,
  busy,
  disabled,
  icon,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  busy?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
}) {
  const color = secondary ? colors.action : colors.white;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!busy }}
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.buttonSecondary,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        (disabled || busy) && { opacity: 0.55 },
      ]}
    >
      {busy ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {icon && <Feather name={icon} size={18} color={color} />}
          <Text style={[styles.buttonText, { color }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[styles.input, props.multiline && { minHeight: 88, textAlignVertical: 'top' }]}
      />
    </View>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.chipText, selected && { color: colors.white }]}>{label}</Text>
    </Pressable>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Feather name={icon} size={30} color={colors.action} />
      </View>
      <Title style={{ textAlign: 'center' }}>{title}</Title>
      <Body style={{ textAlign: 'center' }}>{body}</Body>
      {action}
    </View>
  );
}

export function money(price: number | null, t: (a: string, e: string) => string) {
  return price === null
    ? t('السعر عند التأكيد', 'Price on confirmation')
    : `${price} ${t('ر.ق', 'QAR')}`;
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const { ar } = useStore();
  const tone = statusColors[status];
  return (
    <View style={[styles.badge, { backgroundColor: tone.bg }]}>
      <Text style={[styles.badgeText, { color: tone.text }]}>
        {statusLabels[status][ar ? 0 : 1]}
      </Text>
    </View>
  );
}

export function OrderCard({ order }: { order: Order }) {
  const { ar, t } = useStore();
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text selectable style={styles.orderId}>
          {order.id}
        </Text>
        <StatusBadge status={order.status} />
      </View>
      <Title style={{ fontSize: 20 }}>
        {order.day} · {order.time}
      </Title>
      <Body>{t('بتوقيت قطر', 'Qatar time')}</Body>
      {order.items.map((item) => (
        <View key={item.id} style={styles.row}>
          <Body>{ar ? item.ar : item.en}</Body>
          <Body>× {item.quantity}</Body>
        </View>
      ))}
      <Body>
        {order.fulfillment === 'delivery'
          ? t('توصيل مطلوب', 'Delivery requested')
          : t('استلام من المتجر', 'Store pickup')}
      </Body>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, color: colors.ink, lineHeight: 40 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 26, color: colors.muted },
  button: {
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: colors.action,
    paddingHorizontal: space.xl,
    flexDirection: 'row',
    gap: space.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.action,
  },
  buttonText: { fontFamily: fonts.bodyBold, fontSize: 16 },
  field: { gap: space.xs },
  label: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.controlBorder,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.ink,
  },
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipSelected: { backgroundColor: colors.action, borderColor: colors.action },
  chipText: { fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  empty: { alignItems: 'center', gap: space.md, padding: space.xxl },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: space.lg,
    gap: space.xs,
    ...shadow,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: space.sm,
  },
  orderId: { fontSize: 13, color: colors.muted, writingDirection: 'ltr' },
  badge: { borderRadius: 12, paddingHorizontal: space.md, paddingVertical: space.xs },
  badgeText: { fontFamily: fonts.bodyBold, fontSize: 13 },
});
