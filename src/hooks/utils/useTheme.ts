import { DEFAULT_THEME, SupportedTheme, THEME } from "@/lib/theme";
import { useColorScheme } from "react-native";
import { useMMKVString } from "react-native-mmkv";

export default function useTheme() {
  const colorScheme = useColorScheme();
  const [mmkvTheme, setMmkvTheme] = useMMKVString("theme");

  let theme;
  if (mmkvTheme) theme = THEME[mmkvTheme as SupportedTheme];
  else if (colorScheme === "unspecified") theme = THEME[DEFAULT_THEME];
  else theme = THEME[colorScheme];

  function handleChangeTheme(newTheme: SupportedTheme) {
    setMmkvTheme(newTheme);
  }

  return { THEME: theme, colorScheme: theme.colorScheme, handleChangeTheme };
}
