import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

import {
  SUPABASE_PUBLIC_ANON_KEY,
  SUPABASE_PUBLIC_URL,
} from "@/services/supabase/config";

const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return Promise.resolve(null);
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return Promise.resolve();
    return AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return Promise.resolve();
    return AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLIC_ANON_KEY,
  {
    auth: {
      storage: ExpoWebSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  },
);
