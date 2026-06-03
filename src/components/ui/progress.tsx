import * as ProgressPrimitive from "@rn-primitives/progress";
import { Platform, StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";

function Progress({
  className,
  color,
  value,
  children,
  indicatorClassName,
  indicatorStyle,
  ...props
}: ProgressPrimitive.RootProps &
  React.RefAttributes<ProgressPrimitive.RootRef> & {
    value: number;
    indicatorClassName?: string;
    indicatorStyle?: StyleProp<ViewStyle>;
    color?: string;
  }) {
  const { THEME } = useTheme();

  return (
    <ProgressPrimitive.Root
      className={cn(
        "bg-accent relative h-3 w-full flex-1 border border-border overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <Indicator
        value={value}
        color={color ?? THEME.primary}
        style={indicatorStyle}
        className={cn("rounded-full", indicatorClassName)}
      />

      {children && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          pointerEvents="none"
        >
          <Text
            className="font-bold leading-none text-center"
            style={{
              fontSize: 10,
              color: value >= 50 ? THEME.background : THEME.mutedForeground,
              marginTop: Platform.OS === "android" ? -1 : 0,
            }}
          >
            {children}
          </Text>
        </View>
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress };

const Indicator = Platform.select({
  web: WebIndicator,
  native: NativeIndicator,
  default: NullIndicator,
});

type IndicatorProps = {
  value: number | undefined | null;
  color?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

function WebIndicator({ value, color, className, style }: IndicatorProps) {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View
      className={cn(
        "bg-primary h-full w-full flex-1 transition-all",
        className,
      )}
      style={[
        {
          transform: `translateX(-${100 - (value ?? 0)}%)`,
          backgroundColor: color,
        },
        style,
      ]}
    >
      <ProgressPrimitive.Indicator className={cn("h-full w-full", className)} />
    </View>
  );
}

function NativeIndicator({ value, color, className }: IndicatorProps) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  }, [value]);

  if (Platform.OS === "web") {
    return null;
  }

  return (
    <Animated.View
      style={[indicator, { backgroundColor: color }]}
      className={cn("bg-primary h-full", className)}
    />
  );
}

function NullIndicator(_props: IndicatorProps) {
  return null;
}
