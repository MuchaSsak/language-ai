import { Dialog, DialogPortal } from "@/components/ui/dialog";
import useTheme from "@/hooks/utils/useTheme";
import { cn, darkenColor } from "@/lib/utils";
import * as DialogPrimitive from "@rn-primitives/dialog";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type OverlayDialogProps = DialogPrimitive.ContentProps &
  React.RefAttributes<DialogPrimitive.ContentRef> & {
    isOpen: boolean;
    onClose: () => void;
    portalHost?: string;
    hasCloseButton?: boolean;
  };

export default function OverlayDialog({
  className,
  isOpen,
  onClose,
  portalHost,
  children,
  hasCloseButton = true,
  ...props
}: OverlayDialogProps) {
  const { THEME } = useTheme();
  const animation = useSharedValue(0);

  // Cycle the animation infinitely while the dialog is open
  useEffect(() => {
    if (isOpen) {
      animation.value = withRepeat(
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else {
      animation.value = 0;
    }
  }, [isOpen, animation]);

  const darkeningPercentage = 85;
  const darkerChart5 = darkenColor(THEME.chart5, darkeningPercentage);
  const darkerPrimary = darkenColor(THEME.primary, darkeningPercentage);
  const darkerChart1 = darkenColor(THEME.chart1, darkeningPercentage);

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [0, 0.5, 1],
        [darkerChart5, darkerPrimary, darkerChart1],
      ),
    };
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal hostName={portalHost}>
        <Animated.View
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          style={[StyleSheet.absoluteFill]}
          pointerEvents="box-none"
        >
          {/* Animated background overlay */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { opacity: 0.6 },
              animatedOverlayStyle,
            ]}
            pointerEvents="none"
          />

          <DialogPrimitive.Content
            className={cn(
              "z-50 mx-auto flex h-full w-full min-w-[100vw] flex-col items-center justify-center bg-transparent",
              Platform.select({
                web: "animate-in fade-in-0 zoom-in-95 duration-200",
              }),
              className,
            )}
            style={{ backgroundColor: "transparent" }} // Double-confirming content wrapper is transparent
            {...props}
          >
            <>{children}</>

            {hasCloseButton && (
              <DialogPrimitive.Close
                className={cn(
                  "absolute right-6 top-16 rounded opacity-70 active:opacity-100",
                  Platform.select({
                    web: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  }),
                )}
                hitSlop={24}
                onPress={() => onClose()}
              >
                <X size={20} color={THEME.white || "#FFFFFF"} />
                <Text className="sr-only">Close</Text>
              </DialogPrimitive.Close>
            )}

            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.75)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 200,
              }}
              pointerEvents="none"
            />
          </DialogPrimitive.Content>
        </Animated.View>
      </DialogPortal>
    </Dialog>
  );
}
