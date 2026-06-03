import { useAuth } from "@/contexts/AuthContext";
import { PropsWithChildren, useEffect } from "react";

import useLoadAssets from "@/hooks/utils/useLoadAssets";
import * as SplashScreen from "expo-splash-screen";

type SplashScreenProviderProps = PropsWithChildren & {};

export default function SplashScreenProvider({
  children,
}: SplashScreenProviderProps) {
  const { isFetched } = useAuth();
  const isReady = useLoadAssets();
  const shouldHideSplashScreen = isFetched && isReady;

  // Hide splash screen on auth load
  useEffect(() => {
    if (shouldHideSplashScreen) (async () => await SplashScreen.hideAsync())();
  }, [shouldHideSplashScreen]);

  return children;
}
