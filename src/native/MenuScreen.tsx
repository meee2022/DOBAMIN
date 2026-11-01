import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MenuProduct, products } from '../catalog';
import { logo } from '../brand-assets';
import { colors, fonts, shadow, space } from './theme';
import { useStore } from './store';
import { Body, Chip, EmptyState, FadeIn, money, Title } from './ui';

const categories = [
  { id: 'all', ar: 'كل المنيو', en: 'Full menu' },
  { id: 'tarte', ar: 'تارت', en: 'Tarte' },
  { id: 'desserts', ar: 'حلويات', en: 'Desserts' },
  { id: 'cups', ar: 'أكواب', en: 'Cups' },
];

function ProductTile({ product, onOpen }: { product: MenuProduct; onOpen: () => void }) {
  const { ar, t, change } = useStore();
  const size = (useWindowDimensions().width - space.lg * 2 - space.md) / 2;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={ar ? product.ar : product.en}
      onPress={onOpen}
      style={({ pressed }) => [styles.tile, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <Image
        source={product.image}
        style={[styles.tileImage, { width: size, height: size }]}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.tileCopy}>
        <Text numberOfLines={2} style={styles.tileName}>
          {ar ? product.ar : product.en}
        </Text>
        <Body numberOfLines={1} style={{ fontSize: 13 }}>
          {money(product.price, t)}
        </Body>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t(`أضف ${product.ar}`, `Add ${product.en}`)}
          hitSlop={6}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            change(product.id, 1);
          }}
          style={({ pressed }) => [
            styles.add,
            pressed && { backgroundColor: colors.actionPressed },
          ]}
        >
          <Feather name="plus" size={16} color={colors.white} />
          <Text style={styles.addText}>{t('أضف', 'Add')}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function MenuScreen({ navigation }: any) {
  const { ar, t } = useStore();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const visible = products.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      `${p.ar} ${p.en}`.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <FlatList
      style={styles.page}
      data={visible}
      keyExtractor={(p) => p.id}
      numColumns={2}
      columnWrapperStyle={{ gap: space.md }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={{ gap: space.md }}>
          <FadeIn>
            <Image source={logo} accessibilityLabel="Dopamine" style={styles.logo} />
            <Title style={styles.hero}>
              {t('لكل لحظة، حلاها.', 'Every moment has its sweetness.')}
            </Title>
            <Body style={{ textAlign: 'center' }}>
              {t(
                'لنفسك، لمن تحبّ، وللّمة التي تنتظرها.',
                'For yourself, for someone special, for coming together.',
              )}
            </Body>
          </FadeIn>
          <View style={styles.search}>
            <Feather name="search" size={18} color={colors.muted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              accessibilityLabel={t('ابحث في المنيو', 'Search menu')}
              placeholder={t('ابحث عن لحظتك الحلوة', 'Find your sweet moment')}
              placeholderTextColor={colors.muted}
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: space.sm }}
          >
            {categories.map((c) => (
              <Chip
                key={c.id}
                label={ar ? c.ar : c.en}
                selected={category === c.id}
                onPress={() => setCategory(c.id)}
              />
            ))}
          </ScrollView>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          icon="search"
          title={t('لا توجد أصناف مطابقة', 'No matching creations')}
          body={t('جرّب اسمًا آخر أو اختر كل المنيو.', 'Try another name or select the full menu.')}
        />
      }
      renderItem={({ item }) => (
        <ProductTile
          product={item}
          onOpen={() => navigation.navigate('Product', { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, gap: space.md },
  logo: { width: 190, height: 62, alignSelf: 'center', resizeMode: 'contain' },
  hero: { textAlign: 'center', fontSize: 30, lineHeight: 48, marginTop: space.sm },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.ink,
  },
  tile: { flex: 1, maxWidth: '50%', backgroundColor: colors.white, borderRadius: 20, ...shadow },
  tileImage: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  tileCopy: { padding: space.md, gap: space.xs, flex: 1 },
  tileName: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
    minHeight: 48,
  },
  add: {
    marginTop: space.xs,
    minHeight: 44,
    borderRadius: 14,
    backgroundColor: colors.action,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
  },
  addText: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.white },
});
