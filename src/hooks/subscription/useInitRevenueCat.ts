import { useEffect } from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

export default function useInitRevenueCat() {
  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.ERROR);

    // Platform-specific API keys
    const iosApiKey = __DEV__
      ? "test_eZsLrQUqjwDzasTboTDVtoByCik"
      : "appl_BTYcwfDHUivvLUQHqWjwZCfasgC";
    const androidApiKey = __DEV__
      ? "test_eZsLrQUqjwDzasTboTDVtoByCik"
      : "goog_YIXOlFuYkTIATnjOWNZwYjWyrwM";

    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: iosApiKey });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: androidApiKey });
    }
  }, []);
}
