import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LinguiProvider from "@/components/layout/providers/LinguiProvider";
import ReactNativeReusables from "@/components/layout/providers/ReactNativeReusables";
import SplashScreenProvider from "@/components/layout/providers/SplashScreenProvider";
import TanstackQueryProvider from "@/components/layout/providers/TanstackQueryProvider";
import ThemeProvider from "@/components/layout/providers/ThemeProvider";
import AuthProvider from "@/contexts/AuthContext";
import CameraProvider from "@/contexts/CameraContext";
import ConfettiProvider from "@/contexts/ConfettiContext";
import OnboardingProvider from "@/contexts/OnboardingContext";
import TimeSpentProvider from "@/contexts/TimeSpentContext";
import { KeyboardProvider } from "react-native-keyboard-controller";

type RootProvidersProps = PropsWithChildren & {};

export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <LinguiProvider>
          <TanstackQueryProvider>
            <ConfettiProvider>
              <AuthProvider>
                <SplashScreenProvider>
                  <TimeSpentProvider>
                    <OnboardingProvider>
                      <CameraProvider>
                        <ThemeProvider>
                          <ReactNativeReusables>
                            <SafeAreaProvider>{children}</SafeAreaProvider>
                          </ReactNativeReusables>
                        </ThemeProvider>
                      </CameraProvider>
                    </OnboardingProvider>
                  </TimeSpentProvider>
                </SplashScreenProvider>
              </AuthProvider>
            </ConfettiProvider>
          </TanstackQueryProvider>
        </LinguiProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
