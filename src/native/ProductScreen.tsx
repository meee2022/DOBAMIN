import { useState } from 'react';
import { Image, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { products } from '../catalog';
import { colors, space } from './theme';
import { useStore } from './store';
import { Body, Button, Chip, FadeIn, money, Title } from './ui';

export default function ProductScreen({ route, navigation }: any) {
  const { ar, t, cart, change } = useStore();
  const [view, setView] = useState<'plate' | 'packaging'>('plate');
  const product = products.find((p) => p.id === route.params.id)!;
  const inBag = cart[product.id] || 0;
  const { width } = useWindowDimensions();
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: space.xxl }}>
      <Image
        source={view === 'plate' ? product.image : product.packagingImage}
        accessibilityLabel={ar ? product.ar : product.en}
        style={{ width, height: width }}
      />
      <FadeIn>
        <View style={styles.copy}>
          <View style={styles.views}>
            <Chip
              label={t('على الطبق', 'On the plate')}
              selected={view === 'plate'}
              onPress={() => setView('plate')}
            />
            <Chip
              label={t('بتغليف دوبامين', 'Dopamine packaging')}
              selected={view === 'packaging'}
              onPress={() => setView('packaging')}
            />
          </View>
          <Title>{ar ? product.ar : product.en}</Title>
          <Body>{money(product.price, t)}</Body>
          <Body style={{ fontSize: 13 }}>
            {t(
              'صور تصورية لتقديم المنتج وتغليفه. تفاصيل الوصفة تُؤكّد عند الطلب.',
              'Concept images of the product and its packaging. Recipe details are confirmed when ordering.',
            )}
          </Body>
          <Button
            icon="plus"
            label={
              inBag
                ? t(`أضف المزيد (${inBag} في الحقيبة)`, `Add more (${inBag} in bag)`)
                : t('أضف للحقيبة', 'Add to bag')
            }
            disabled={inBag >= 99}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              change(product.id, 1);
            }}
          />
          {inBag > 0 && (
            <Button
              secondary
              label={t('افتح الحقيبة', 'Open bag')}
              onPress={() => navigation.navigate('BagTab')}
            />
          )}
        </View>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  copy: { padding: space.lg, gap: space.md },
  views: { flexDirection: 'row', gap: space.sm },
});
