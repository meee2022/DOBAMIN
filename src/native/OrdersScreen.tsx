import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api, Order } from '../orders-api';
import { colors, fonts, space } from './theme';
import { ownerToken, useStore } from './store';
import { Button, EmptyState, Field, OrderCard, Title } from './ui';

export default function OrdersScreen({ navigation }: any) {
  const { t } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [tracked, setTracked] = useState<Order | null>(null);
  const [trackError, setTrackError] = useState('');
  const load = useCallback(async () => {
    try {
      const data = await api<{ orders: Order[] }>('/my-orders', {
        method: 'POST',
        body: { ownerToken: await ownerToken() },
      });
      setOrders(data.orders);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoaded(true);
      setRefreshing(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      load();
      const timer = setInterval(load, 15000);
      return () => clearInterval(timer);
    }, [load]),
  );
  async function track() {
    setTrackError('');
    setTracked(null);
    try {
      setTracked(
        (await api<{ order: Order }>('/track', { method: 'POST', body: { id, phone } })).order,
      );
    } catch (e) {
      setTrackError((e as Error).message);
    }
  }
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            load();
          }}
        />
      }
    >
      {!!error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      {loaded && !error && !orders.length && (
        <EmptyState
          icon="clipboard"
          title={t('أول لحظة حلوة تبدأ هنا', 'Your first sweet moment starts here')}
          body={t('طلباتك من هذا الجهاز ستظهر هنا.', 'Requests from this device appear here.')}
          action={
            <Button
              label={t('تصفح المنيو', 'Browse the menu')}
              onPress={() => navigation.navigate('MenuTab')}
            />
          }
        />
      )}
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      <View style={styles.track}>
        <Title style={{ fontSize: 20, lineHeight: 32 }}>
          {t('طلبت من جهاز آخر؟', 'Ordered from another device?')}
        </Title>
        <Field
          label={t('رقم الطلب', 'Request number')}
          value={id}
          onChangeText={setId}
          autoCapitalize="characters"
          placeholder="DP-"
          maxLength={15}
        />
        <Field
          label={t('رقم التواصل', 'Phone number')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={24}
        />
        {!!trackError && (
          <Text accessibilityRole="alert" style={styles.error}>
            {trackError}
          </Text>
        )}
        <Button
          secondary
          label={t('تتبّع الطلب', 'Track request')}
          disabled={id.length !== 15 || phone.length < 7}
          onPress={track}
        />
        {tracked && <OrderCard order={tracked} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, gap: space.md },
  track: { gap: space.md, paddingTop: space.lg },
  error: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.error },
});
