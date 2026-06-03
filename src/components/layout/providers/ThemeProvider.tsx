import useTheme from "@/hooks/utils/useTheme";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider as RNThemeProvider } from "@react-navigation/native";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren & {};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme } = useTheme();

  const { setColorScheme } = useNativewindColorScheme();
  setColorScheme(colorScheme);

  return (
    <RNThemeProvider value={NAV_THEME[colorScheme]}>{children}</RNThemeProvider>
  );
}
