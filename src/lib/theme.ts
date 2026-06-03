import {
  DarkTheme,
  DefaultTheme,
  type Theme as RNTheme,
} from "@react-navigation/native";
import TAILWIND_COLORS from "tailwindcss/colors";

export type SupportedTheme = (typeof SUPPORTED_THEMES)[number];
export type Theme = (typeof THEME)[SupportedTheme];
export const SUPPORTED_THEMES = ["light", "dark"] as const;
export const DEFAULT_THEME: SupportedTheme = "light";

const TAILWINDCSS_COLORS = {
  ...TAILWIND_COLORS,
  white: "#F5F5F5",
  black: "#0A0A0A",
};

export const THEME = {
  /**
   * Light theme
   */
  light: {
    colorScheme: "light" as SupportedTheme,
    ...TAILWINDCSS_COLORS,

    radius: "1.25rem",

    background: "#EEEEEE",
    backgroundMax: "#FFFFFF",
    foreground: "#0A0A0A",

    secondary: "#F5F5F5",
    secondaryHover: "#E6E6E6",
    secondaryForeground: "#171717",

    muted: "#DDDDDD",
    mutedForeground: "#737373",

    card: "#FFFFFF",
    cardForeground: "#0A0A0A",

    popover: "#FFFFFF",
    popoverForeground: "#0A0A0A",
    accent: "#E7E7E7",
    accentForeground: "#DDDDDD",
    border: "#C9C9C9",
    borderForeground: "#E0E0E0",

    input: "#E5E5E5",
    loadingFrom: "#DDDDDD",
    loadingTo: "#C5C5C5",

    ring: "#A1A1A1",
    ringPrimary: "#836701",

    primary: "#FFD238",
    primaryHover: "#F0C01D",
    primaryForeground: "#FFCC14",

    destructive: "#EF4444",
    destructiveHover: "#E62626",
    destructiveForeground: "#ff5252",

    chart1: "#EF4444",
    chart2: "#EF5272",
    chart3: "#F97415",
    chart4: "#FFA033",
    chart5: "#FEF08B",
  },

  dark: {
    colorScheme: "dark" as SupportedTheme,
    ...TAILWINDCSS_COLORS,

    radius: "1.25rem",

    background: "#0A0A0A",
    backgroundMax: "#000000",
    foreground: "#F5F5F5",

    secondary: "#1C1C1C",
    secondaryHover: "#474747",
    secondaryForeground: "#F5F5F5",

    muted: "#262626",
    mutedForeground: "#A3A3A3",

    card: "#141414",
    cardForeground: "#F5F5F5",

    popover: "#262626",
    popoverForeground: "#F5F5F5",
    accent: "#262626",
    accentForeground: "#3b3b3b",
    border: "#464646",
    borderForeground: "#858585",

    input: "#262626",
    loadingFrom: "#262626",
    loadingTo: "#404040",

    ring: "#525252",
    ringPrimary: "#FFD238",

    primary: "#FFD238",
    primaryHover: "#FFDB61",
    primaryForeground: "#453700",

    destructive: "#EF4444",
    destructiveHover: "#E62626",
    destructiveForeground: "#ff5252",

    chart1: "#EF4444",
    chart2: "#EF5272",
    chart3: "#F97415",
    chart4: "#FFA033",
    chart5: "#FEF08B",
  },
} as const;

export const NAV_THEME: Record<SupportedTheme, RNTheme> = {
  /**
   * Light navigation theme
   */
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },

  /**
   * Dark navigation theme
   */
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
} as const;
