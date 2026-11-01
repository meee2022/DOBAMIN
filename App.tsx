import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Alert, Linking, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { products } from './src/catalog';
import { productWebsiteUrl, websiteLinks } from './src/site-config';
export default function App() {
  const [opening, setOpening] = useState<string | null>(null);
  const openingRef = useRef(false);
  async function openWebsite(url: string) {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpening(url);
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('تعذّر فتح الموقع', 'تأكد من الاتصال بالإنترنت وحاول مجددًا. يمكنك فتح dopaminsweets.com في المتصفح.');
    } finally {
      openingRef.current = false;
      setOpening(null);
    }
  }
  function action(label: string, url: string) {
    return <Pressable accessibilityRole="link" accessibilityLabel={`${label} على موقع دوبامين`} accessibilityHint="يفتح الموقع في المتصفح" accessibilityState={{ disabled: opening !== null, busy: opening === url }} disabled={opening !== null} style={({ pressed }) => [styles.button, pressed && styles.pressed, opening !== null && styles.disabled]} onPress={() => openWebsite(url)}>
      {opening === url ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>{label}</Text>}
    </Pressable>;
  }
  return <ScrollView style={styles.page} contentContainerStyle={{ paddingTop: 64, paddingBottom: 40 }}>
    <StatusBar style="dark"/>
    <Image source={require('./assets/logo.png')} accessibilityLabel="Dopamine Healthy sweets" style={styles.logo}/>
    <Text style={styles.title}>لذّة تُشبهك. وتوازن يليق بك.</Text>
    <View style={styles.websiteActions}>
      {action('المنيو والطلب', websiteLinks.menu)}
      {action('طلباتي', websiteLinks.orders)}
      {action('حجز مناسبة', websiteLinks.booking)}
    </View>
    <Text style={styles.note}>الطلب والحجز متاحان على موقع دوبامين في المتصفح.</Text>
    <Image source={require('./assets/hero.webp')} accessibilityLabel="حلوى دوبامين" style={styles.hero}/>
    <Text style={styles.heading}>لكل لحظة، حلاها.</Text>
    <Text style={styles.note}>معاينة أولية للتطبيق — صور المنتجات تصورية، والأسعار عند التأكيد</Text>
    <View style={styles.grid}>{products.map(p => <View key={p.id} style={styles.product}>
      <Image source={p.image} accessibilityLabel={p.ar} style={styles.image}/>
      <Text style={styles.name}>{p.ar}</Text>
      <Text style={styles.note}>{p.price === null ? 'السعر عند التأكيد' : `${p.price} ر.ق`}</Text>
      {action('عرض وطلب على الموقع', productWebsiteUrl(p.en))}
    </View>)}</View>
  </ScrollView>;
}
const styles = StyleSheet.create({
  page: { backgroundColor: '#F9F5F2' },
  logo: { width: 240, height: 73, alignSelf: 'center', resizeMode: 'contain' },
  title: { fontSize: 31, textAlign: 'center', color: '#462d27', margin: 28, lineHeight: 48 },
  websiteActions: { marginHorizontal: 20, marginBottom: 12, gap: 10 },
  hero: { width: '100%', height: 350 },
  heading: { fontSize: 28, color: '#462d27', textAlign: 'right', margin: 24 },
  note: { fontSize: 13, color: '#786057', textAlign: 'right', marginHorizontal: 20, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 14, gap: 14 },
  product: { width: '47%', paddingBottom: 18 },
  image: { width: '100%', height: 220, borderRadius: 4 },
  name: { fontSize: 19, textAlign: 'right', color: '#462d27', marginVertical: 12 },
  button: { backgroundColor: '#650015', minHeight: 48, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 3 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.65 },
});
