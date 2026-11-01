import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as Updates from 'expo-updates';
import { products } from '../catalog';

type Cart = Record<string, number>;
type Store = {
  ar: boolean;
  t: (a: string, e: string) => string;
  toggleLang: () => void;
  cart: Cart;
  count: number;
  change: (id: string, amount: number) => void;
  clearCart: () => void;
};

const StoreContext = createContext<Store | null>(null);
export const useStore = () => useContext(StoreContext)!;

export async function ownerToken() {
  let token = await AsyncStorage.getItem('dopamine-customer-token');
  if (!token) {
    token = Crypto.randomUUID() + Crypto.randomUUID();
    await AsyncStorage.setItem('dopamine-customer-token', token);
  }
  return token;
}

// React Native only applies a layout direction after a reload, so try it once per language.
async function applyDirection(lang: string) {
  const rtl = lang === 'ar';
  if (I18nManager.isRTL === rtl) return false;
  const attempted = await AsyncStorage.getItem('dopamine-rtl-attempt');
  if (attempted === lang) return false;
  await AsyncStorage.setItem('dopamine-rtl-attempt', lang);
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(rtl);
  try {
    await Updates.reloadAsync();
    return true;
  } catch {
    return false;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('ar');
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      const [storedLang, storedCart] = await Promise.all([
        AsyncStorage.getItem('dopamine-lang'),
        AsyncStorage.getItem('dopamine-cart'),
      ]);
      const nextLang = storedLang || 'ar';
      if (await applyDirection(nextLang)) return;
      setLang(nextLang);
      try {
        const saved = JSON.parse(storedCart || '{}');
        const clean: Cart = {};
        products.forEach((p) => {
          if (Number.isInteger(saved[p.id]) && saved[p.id] > 0)
            clean[p.id] = Math.min(99, saved[p.id]);
        });
        setCart(clean);
      } catch {}
      setReady(true);
    })();
  }, []);
  useEffect(() => {
    if (ready) AsyncStorage.setItem('dopamine-cart', JSON.stringify(cart));
  }, [cart, ready]);
  const value = useMemo<Store>(() => {
    const ar = lang === 'ar';
    return {
      ar,
      t: (a, e) => (ar ? a : e),
      toggleLang: async () => {
        const next = ar ? 'en' : 'ar';
        await AsyncStorage.setItem('dopamine-lang', next);
        await AsyncStorage.removeItem('dopamine-rtl-attempt');
        setLang(next);
        applyDirection(next);
      },
      cart,
      count: Object.values(cart).reduce((a, b) => a + b, 0),
      change: (id, amount) =>
        setCart((old) => ({ ...old, [id]: Math.max(0, Math.min(99, (old[id] || 0) + amount)) })),
      clearCart: () => setCart({}),
    };
  }, [lang, cart]);
  return ready ? <StoreContext.Provider value={value}>{children}</StoreContext.Provider> : null;
}
