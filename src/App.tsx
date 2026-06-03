import * as Crypto from "expo-standard-web-crypto";

import { useKeepAwake } from "expo-keep-awake";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";

import RootProviders from "@/components/layout/providers/RootProviders";
import "@/globals.css";
import useInitRevenueCat from "@/hooks/subscription/useInitRevenueCat";
import useTheme from "@/hooks/utils/useTheme";
import { NAV_THEME } from "@/lib/theme";
import { Navigation } from "@/navigation";
import { setAudioModeAsync } from "expo-audio";
import { vexo } from "vexo-analytics";

// Web crypto
if (!globalThis.crypto) (globalThis as any).crypto = Crypto;

// Splash Screen
SplashScreen.preventAutoHideAsync();

// Audio
setAudioModeAsync({
  playsInSilentMode: true,
});

// Vexo Analytics
vexo("6eaab8b5-102f-4e79-91f0-166ba548984a");

// Navigation
const prefix = createURL("/");

function App() {
  const { colorScheme } = useTheme();
  useKeepAwake();
  useInitRevenueCat();

  return (
    <RootProviders>
      <Navigation
        theme={NAV_THEME[colorScheme]}
        linking={{
          enabled: true,
          prefixes: [prefix],
        }}
      />
    </RootProviders>
  );
}

export default App;
