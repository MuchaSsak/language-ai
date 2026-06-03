import { cva, type VariantProps } from "class-variance-authority";
import * as Haptics from "expo-haptics";
import {
  AnimatedPressableOptions,
  CustomPressableProps,
  PressableScale,
  PressablesConfig,
} from "pressto";
import { MouseEvent as ReactMouseEvent, ReactNode, RefAttributes } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { TextClassContext } from "@/components/ui/text";
import { presstoConfigDefault, presstoConfigIcon } from "@/lib/animations";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group shrink-0 flex-row items-center justify-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        solid: "bg-primary border-primary-hover border",
        destructive: "bg-destructive",
        "destructive-accent": "border-destructive border bg-destructive/15",
        outline: "border-border border",
        accent: "bg-accent border-border border",
        "accent-foreground":
          "bg-accent-foreground border-border-foreground border",
        secondary: "bg-secondary",
        invisible: "",
        ghost: "",
        link: "",
        foreground: "bg-foreground",
        background: "bg-background",
        white: "bg-white",
        black: "bg-black",
      },
      size: {
        xs: "h-8 gap-1.5 rounded-full px-3",
        sm: "h-10 gap-1.5 rounded-full px-3",
        default: "h-12 px-8 py-2 rounded-full",
        md: "h-[3.25rem] px-8 py-2 rounded-full",
        lg: "h-[3.625rem] rounded-full px-6",
        xl: "h-[3.625rem] rounded-full px-6",
        "2xl": "h-16 rounded-xl px-6",
        slim: "p-0",
        icon: "h-12 w-12 rounded-full items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("text-foreground font-semibold", {
  variants: {
    variant: {
      solid: "text-black",
      destructive: "text-white",
      "destructive-accent": "text-white",
      outline: "",
      accent: "text-foreground",
      secondary: "text-foreground",
      "accent-foreground": "text-foreground",
      ghost: "",
      invisible: "",
      link: "text-foreground",
      foreground: "text-background",
      background: "text-foreground",
      white: "text-black",
      black: "text-white",
    },
    size: {
      default: "",
      xs: "text-xs",
      sm: "",
      md: "",
      lg: "",
      xl: "text-xl",
      "2xl": "text-xl",
      icon: "",
      slim: "",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "default",
  },
});

const presstoVariantsConfig = {
  variants: {
    size: {
      default: presstoConfigDefault,
      xs: presstoConfigIcon,
      sm: presstoConfigIcon,
      md: presstoConfigDefault,
      lg: presstoConfigDefault,
      xl: presstoConfigDefault,
      "2xl": presstoConfigDefault,
      slim: presstoConfigDefault,
      icon: presstoConfigIcon,
    },
  },
  defaultVariants: {
    size: "default" as const,
  },
};

function presstoVariants(props: {
  size?: keyof typeof presstoVariantsConfig.variants.size;
}) {
  const size = props.size || presstoVariantsConfig.defaultVariants.size;
  return presstoVariantsConfig.variants.size[size];
}

type ButtonProps = RefAttributes<any> &
  CustomPressableProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    isLoading?: boolean;
    loaderClassName?: string;
    isPressableScale?: boolean;
    children?: ReactNode;
    dataSet?: any;
    size?: keyof typeof presstoVariantsConfig.variants.size;
    target?: "_blank" | "_self" | "_parent" | "_top";
    onPress?: (
      event:
        | GestureResponderEvent
        | ReactMouseEvent<HTMLAnchorElement>
        | AnimatedPressableOptions,
    ) => void;
    tabIndex?: 0 | -1;
    style?:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
    config?: {
      minScale?: number;
      activeOpacity?: number;
      baseScale?: number;
    };
  };

function Button({
  className,
  variant = "solid",
  size = "default",
  isLoading,
  loaderClassName,
  isPressableScale = true,
  children,
  dataSet,
  onPress,
  target = "_blank",
  tabIndex,
  config,
  style,
  ...props
}: ButtonProps) {
  const [mmkvIsHapticsOn] = useMMKVBoolean("is_haptics_on");
  const isHapticsOn = mmkvIsHapticsOn ?? true;

  const isDisabled =
    !((props as CustomPressableProps).enabled ?? true) || isLoading;

  function handlePress(
    e:
      | GestureResponderEvent
      | ReactMouseEvent<HTMLAnchorElement>
      | AnimatedPressableOptions,
  ) {
    if (isHapticsOn) {
      Haptics.selectionAsync();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onPress?.(e);
  }

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <PressablesConfig
        animationType="spring"
        {...presstoVariants({ size })}
        globalHandlers={{
          onPress: () => {
            if (isHapticsOn) {
              Haptics.selectionAsync();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          },
        }}
      >
        {/* Pressable scale */}
        {isPressableScale && (
          <PressableScale
            style={[
              {
                pointerEvents: isDisabled ? "none" : undefined,
              },
            ]}
            rippleColor="transparent"
            enabled={!isDisabled}
            // @ts-ignore web-only prop
            tabIndex={-1}
            dataSet={{ focusVisibleRing: true, ring: variant, ...dataSet }}
            onPress={handlePress}
            android_ripple={null}
            {...(props as CustomPressableProps)}
          >
            <Pressable
              android_ripple={null}
              className={cn(
                isDisabled && "opacity-50 cursor-default",
                buttonVariants({ variant, size }),
                className,
              )}
              style={style}
              tabIndex={isDisabled ? -1 : tabIndex}
            >
              {isLoading ? <LoadingSpinner variant={variant} /> : children}
            </Pressable>
          </PressableScale>
        )}

        {/* Pressable */}
        {!isPressableScale && (
          <Pressable
            android_ripple={null}
            className={cn(
              isDisabled && "opacity-50",
              buttonVariants({ variant, size }),
              className,
            )}
            style={style}
            disabled={isDisabled}
            tabIndex={variant === "invisible" || isDisabled ? -1 : tabIndex}
            onPress={handlePress}
            {...(props as PressableProps)}
          >
            {isLoading ? <LoadingSpinner variant={variant} /> : children}
          </Pressable>
        )}
      </PressablesConfig>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
