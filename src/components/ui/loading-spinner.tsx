import { buttonVariants } from "@/components/ui/button";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import { VariantProps } from "class-variance-authority";
import { View, ViewProps } from "react-native";

type LoadingSpinnerProps = ViewProps &
  Omit<VariantProps<typeof buttonVariants>, "size"> & {
    color?: string;
    size?: number;
  };

export default function LoadingSpinner({
  className,
  color,
  size = 24,
  variant,
  ...props
}: LoadingSpinnerProps) {
  const { THEME } = useTheme();

  const iconColorMap = {
    solid: THEME.black,
    destructive: THEME.white,
    "destructive-accent": THEME.white,
    outline: THEME.foreground,
    "accent-foreground": THEME.foreground,
    accent: THEME.foreground,
    secondary: THEME.foreground,
    invisible: THEME.foreground,
    link: THEME.foreground,
    ghost: THEME.foreground,
    foreground: THEME.background,
    background: THEME.foreground,
    white: THEME.black,
    black: THEME.white,
  } as const;

  return (
    <View
      {...props}
      className={cn(
        "pointer-events-none animate-spin bg-transparent border-0",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Feather
        name="loader"
        size={size}
        color={color || iconColorMap[variant || "solid"]}
      />
    </View>
  );
}
