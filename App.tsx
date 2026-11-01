import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';
import { ArefRuqaa_700Bold } from '@expo-google-fonts/aref-ruqaa';
import { AnticDidone_400Regular } from '@expo-google-fonts/antic-didone';
import { colors, fonts } from './src/native/theme';
import { StoreProvider, useStore } from './src/native/store';
import MenuScreen from './src/native/MenuScreen';
import ProductScreen from './src/native/ProductScreen';
import CartScreen from './src/native/CartScreen';
import CheckoutScreen from './src/native/CheckoutScreen';
import OrdersScreen from './src/native/OrdersScreen';
import MoreScreen, { PrivacyScreen } from './src/native/MoreScreen';

const Tab = createBottomTabNavigator();
const MenuStack = createNativeStackNavigator();
const BagStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.bg,
    primary: colors.action,
    text: colors.ink,
    border: colors.line,
  },
};

function useStackOptions() {
  const { ar, t } = useStore();
  return {
    headerStyle: { backgroundColor: colors.bg },
    headerShadowVisible: false,
    headerTintColor: colors.ink,
    headerTitleStyle: { fontFamily: fonts.heading(ar), fontSize: 20 },
    headerBackTitle: t('رجوع', 'Back'),
  };
}

function MenuTab() {
  const { t } = useStore();
  const options = useStackOptions();
  return (
    <MenuStack.Navigator screenOptions={options}>
      <MenuStack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
      <MenuStack.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: t('تفاصيل الصنف', 'Details') }}
      />
    </MenuStack.Navigator>
  );
}

function BagTab() {
  const { t } = useStore();
  const options = useStackOptions();
  return (
    <BagStack.Navigator screenOptions={options}>
      <BagStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: t('حقيبتك الحلوة', 'Your sweet bag') }}
      />
      <BagStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: t('تفاصيل طلبك', 'Your order details') }}
      />
      <BagStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: t('الخصوصية والشروط', 'Privacy and terms') }}
      />
    </BagStack.Navigator>
  );
}

function MoreTab() {
  const { t } = useStore();
  const options = useStackOptions();
  return (
    <MoreStack.Navigator screenOptions={options}>
      <MoreStack.Screen
        name="More"
        component={MoreScreen}
        options={{ title: t('المزيد', 'More') }}
      />
      <MoreStack.Screen
        name="Booking"
        component={CheckoutScreen}
        options={{ title: t('احجز مناسبتك', 'Book an occasion') }}
      />
      <MoreStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: t('الخصوصية والشروط', 'Privacy and terms') }}
      />
    </MoreStack.Navigator>
  );
}

const tabIcons = {
  MenuTab: 'home',
  BagTab: 'shopping-bag',
  OrdersTab: 'clipboard',
  MoreTab: 'menu',
} as const;

function Tabs() {
  const { t, count } = useStore();
  const options = useStackOptions();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.action,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20 },
        tabBarIcon: ({ color, size }) => (
          <Feather name={tabIcons[route.name as keyof typeof tabIcons]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="MenuTab" component={MenuTab} options={{ title: t('المنيو', 'Menu') }} />
      <Tab.Screen
        name="BagTab"
        component={BagTab}
        options={{
          title: t('الحقيبة', 'Bag'),
          tabBarBadge: count || undefined,
          tabBarBadgeStyle: { backgroundColor: colors.action },
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{ ...options, headerShown: true, title: t('طلباتي', 'My requests') }}
      />
      <Tab.Screen name="MoreTab" component={MoreTab} options={{ title: t('المزيد', 'More') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
    ArefRuqaa_700Bold,
    AnticDidone_400Regular,
  });
  if (!loaded) return null;
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <NavigationContainer theme={theme}>
          <StatusBar style="dark" />
          <Tabs />
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
