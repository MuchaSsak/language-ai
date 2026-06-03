import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import LoadingText from "@/components/ui/loading-text";
import useListenAchievements from "@/hooks/achievements/useListenAchievements";
import useListenLiveNotifications from "@/hooks/live-notifications/useListenLiveNotifications";
import useListenQuests from "@/hooks/quests/useListenQuests";
import useTheme from "@/hooks/utils/useTheme";
import { cn, formatNumber } from "@/lib/utils";
import { Enums } from "@/typings/database.types";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Crypto from "expo-crypto";
import { Image, ImageStyle } from "expo-image";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  MessageCircleMore,
  Trophy,
  X,
} from "lucide-react-native";
import { PressableScale } from "pressto";
import React, { PropsWithChildren, ReactNode, useEffect } from "react";
import { Platform, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";
import Toast, { ToastProps, ToastShowParams } from "react-native-toast-message";

const VISIBILITY_TIME = 5_000;
const NEXT_TOAST_IN_BETWEEN_TRANSITIONING_TIME = 200;

/**
 * Toast queue engine
 */
let queue: ToastParams[] = [];
let processing = false;
let cancelSleep: (() => void) | null = null;
let currentToastId: string | null = null;

async function runQueue() {
  if (processing || queue.length === 0) return;
  processing = true;

  while (queue.length > 0) {
    const current = queue[0];
    const duration = current.visibilityTime || VISIBILITY_TIME;
    const isPersistent = current.type === "loading";

    currentToastId = current.props?.id || null;

    Toast.show({
      position: current.position ?? "top",
      autoHide: !isPersistent, // Disable internal autoHide for loading toasts
      ...current,
    });

    // Create a breakable sleep promise
    await new Promise<void>((resolve) => {
      if (!isPersistent) {
        const timer = setTimeout(() => {
          cancelSleep = null;
          resolve();
        }, duration + NEXT_TOAST_IN_BETWEEN_TRANSITIONING_TIME);

        // If called before the timer completes, clear the timer and skip ahead immediately
        cancelSleep = () => {
          clearTimeout(timer);
          resolve();
        };
      } else {
        // If it's persistent, we don't start a timer. It will only resolve when cancelSleep is called.
        cancelSleep = () => {
          resolve();
        };
      }
    });

    currentToastId = null;
    queue.shift();
  }

  processing = false;
}

function CustomToast({
  text1,
  text2,
  type = "success",
  visibilityTime,
  onPress,
  props,
}: ToastParams) {
  const { THEME, colorScheme } = useTheme();
  const progress = useSharedValue(0);

  const customVisibilityTime = visibilityTime || VISIBILITY_TIME;

  const variants = {
    blank: {
      icon: CheckCircle2,
      lightColor:
        colorScheme === "dark" ? THEME.neutral[500] : THEME.neutral[500],
      neutralColor:
        colorScheme === "dark" ? THEME.neutral[500] : THEME.neutral[500],
      darkColor:
        colorScheme === "dark" ? THEME.neutral[500] : THEME.neutral[500],
    },

    loading: {
      icon: null,
      lightColor:
        colorScheme === "dark" ? THEME.neutral[300] : THEME.neutral[200],
      neutralColor:
        colorScheme === "dark" ? THEME.neutral[500] : THEME.neutral[400],
      darkColor:
        colorScheme === "dark" ? THEME.neutral[700] : THEME.neutral[300],
    },

    success: {
      icon: CheckCircle2,
      lightColor: colorScheme === "dark" ? "#3FE863" : "#E8FFEF",
      neutralColor: colorScheme === "dark" ? "#22c55e" : "#22c55e",
      darkColor: colorScheme === "dark" ? "#064e3b" : "#88DBA0",
    },

    error: {
      icon: AlertCircle,
      lightColor: colorScheme === "dark" ? "#FF9696" : "#FFD6D6",
      neutralColor: colorScheme === "dark" ? "#ef4444" : "#ef4444",
      darkColor: colorScheme === "dark" ? "#7f1d1d" : "#E69C9C",
    },

    info: {
      icon: Info,
      lightColor: colorScheme === "dark" ? "#82EAFF" : "#D6F5FF",
      neutralColor: colorScheme === "dark" ? "#38bdf8" : "#57CDFF",
      darkColor: colorScheme === "dark" ? "#1E598A" : "#6393D6",
    },

    warning: {
      icon: AlertTriangle,
      lightColor: colorScheme === "dark" ? "#FFCE8C" : "#FFF8DE",
      neutralColor: colorScheme === "dark" ? "#f59e0b" : "#FF9D00",
      darkColor: colorScheme === "dark" ? "#78350f" : "#E8CE48",
    },

    "day-streak": {
      icon: Trophy,
      lightColor: colorScheme === "dark" ? "#FFD6A5" : "#FFF8DE",
      neutralColor: colorScheme === "dark" ? "#f97316" : "#FB923C",
      darkColor: colorScheme === "dark" ? "#9a3412" : "#FBBF24",
    },

    "live-notification": {
      "admin-message": {
        icon: MessageCircleMore,
        lightColor: colorScheme === "dark" ? "#FF9696" : "#FFD6D6",
        neutralColor: colorScheme === "dark" ? "#ef4444" : "#ef4444",
        darkColor: colorScheme === "dark" ? "#7f1d1d" : "#E69C9C",
      },
    },

    quest: {
      daily: {
        icon: Trophy,
        lightColor: colorScheme === "dark" ? THEME.pink[200] : THEME.pink[200],
        neutralColor:
          colorScheme === "dark" ? THEME.pink[400] : THEME.pink[400],
        darkColor: colorScheme === "dark" ? THEME.pink[700] : THEME.pink[700],
      },

      weekly: {
        icon: Trophy,
        lightColor:
          colorScheme === "dark" ? THEME.purple[200] : THEME.purple[200],
        neutralColor:
          colorScheme === "dark" ? THEME.purple[400] : THEME.purple[400],
        darkColor:
          colorScheme === "dark" ? THEME.purple[700] : THEME.purple[700],
      },
    },

    achievement: {
      Bronze: {
        icon: Trophy,
        lightColor: colorScheme === "dark" ? "#DEB9AD" : "#FFD7C9",
        neutralColor: colorScheme === "dark" ? "#D18C8C" : "#EDB9B9",
        darkColor: colorScheme === "dark" ? "#5C3E3E" : "#A86A6A",
      },
      Silver: {
        icon: Trophy,
        lightColor: THEME.gray[300],
        neutralColor: THEME.gray[300],
        darkColor: THEME.gray[700],
      },
      Gold: {
        icon: Trophy,
        lightColor: "#F7CB68",
        neutralColor:
          colorScheme === "dark" ? THEME.yellow[500] : THEME.yellow[400],
        darkColor:
          colorScheme === "dark" ? THEME.yellow[700] : THEME.yellow[700],
      },
      Platinum: {
        icon: Trophy,
        lightColor: THEME.cyan[400],
        neutralColor:
          colorScheme === "dark" ? THEME.cyan[500] : THEME.cyan[400],
        darkColor: colorScheme === "dark" ? THEME.cyan[900] : THEME.cyan[700],
      },
    },
  } as const;

  const active =
    type === "achievement"
      ? variants[type][props?.rarity ?? "Gold"]
      : type === "quest"
        ? variants[type][props?.cycle ?? "daily"]
        : type === "live-notification"
          ? variants[type][props?.live_notification_type ?? "admin-message"]
          : variants[type];
  const { icon: Icon, darkColor, neutralColor, lightColor } = active;
  const hasBadges = props?.xp_gain;

  // Handle Progress Bar
  useEffect(() => {
    progress.value = 0;

    if (type !== "loading") {
      progress.value = withTiming(1, {
        duration: customVisibilityTime,
        easing: Easing.bezier(0.24, 0.06, 0.34, 0.84),
      });
    }

    return () => {
      progress.value = 0;
    };
  }, [text1, text2, progress, customVisibilityTime, type]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutDown.duration(250)}
      className="items-center w-full"
    >
      <PressableScale
        onPress={() => {
          Toast.hide();
          onPress?.();
          cancelSleep?.();
        }}
        style={{ width: "92%" }}
      >
        <View
          style={{
            backgroundColor: THEME.card,
          }}
          className="flex-row items-stretch overflow-hidden border rounded-md border-border/20 min-h-20"
        >
          {/* Left accent icon */}
          {type !== "blank" && (
            <View
              style={{
                backgroundColor: darkColor,
                experimental_backgroundImage: `linear-gradient(${colorScheme === "dark" || type === "achievement" ? "135deg" : "305deg"},${neutralColor},${darkColor})`,
              }}
              className={cn(
                "items-center justify-center px-4 py-2 rounded-sm",
                (props?.icon_url || props?.icon_asset) && "px-3 py-1",
                props?.iconContainerClassName,
              )}
            >
              {props?.icon_url || props?.icon_asset ? (
                <Image
                  priority="high"
                  source={props?.icon_asset ?? { uri: props.icon_url }}
                  style={[{ width: 64, height: 64 }, props?.icon_style]}
                  contentFit="contain"
                />
              ) : type === "loading" ? (
                <LoadingSpinner variant="foreground" />
              ) : (
                (props?.icon_element?.() ??
                (Icon && (
                  <Icon size={26} color={lightColor} strokeWidth={2.5} />
                )))
              )}
            </View>
          )}

          <View className="justify-center flex-1 gap-2 py-4 pl-3 pr-4">
            <View className="flex-row items-start justify-between">
              {/* Text Area */}
              <View className="flex-1 gap-y-1">
                {(text1 || props?.loadingMessages) &&
                  (type === "loading" && props?.loadingMessages?.length ? (
                    <LoadingText
                      messages={props.loadingMessages}
                      textClassName="pr-2 text-base font-bold tracking-tight text-foreground"
                    />
                  ) : (
                    <Text
                      className={cn(
                        "pr-2 text-base font-bold tracking-tight text-foreground",
                        type === "live-notification" && "text-lg",
                        type === "blank" && "text-lg px-20 text-center",
                        type === "day-streak" && "text-xl",
                        type === "quest" && "text-lg",
                      )}
                    >
                      {text1}
                    </Text>
                  ))}

                {text2 && (
                  <Text
                    className={cn(
                      "text-sm leading-4 text-muted-foreground",
                      type === "quest" && "text-md",
                      type === "live-notification" && "text-sm",
                    )}
                  >
                    {text2}
                  </Text>
                )}

                {props?.textButton && props?.onPress && (
                  <Button onPress={() => props?.onPress?.()} size="xs">
                    <Text className="text-xs">{props?.textButton}</Text>
                  </Button>
                )}
              </View>

              {/* Close X icon */}
              <X size={16} color={THEME.mutedForeground} />
            </View>

            {/* Badges */}
            {hasBadges && (
              <View className="flex-row items-center gap-1.5">
                {props?.xp_gain && (
                  <Badge
                    style={{
                      borderColor:
                        colorScheme === "dark" ? lightColor : darkColor + "cc",
                      backgroundColor:
                        colorScheme === "dark"
                          ? darkColor + "cc"
                          : neutralColor + "77",
                    }}
                  >
                    <Ionicons
                      name="flash"
                      size={12}
                      color={
                        colorScheme === "dark" ? lightColor : darkColor + "cc"
                      }
                    />
                    <Text
                      className="text-sm text-center"
                      style={{
                        color:
                          colorScheme === "dark"
                            ? lightColor
                            : darkColor + "cc",
                      }}
                    >
                      +{formatNumber(props.xp_gain)} XP
                    </Text>
                  </Badge>
                )}
              </View>
            )}
          </View>

          {/* Progress Bar (Hidden for loading toasts) */}
          {type !== "loading" && (
            <Animated.View
              style={[
                progressStyle,
                {
                  backgroundColor: neutralColor,
                  height: 3,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                },
              ]}
            />
          )}
        </View>
      </PressableScale>
    </Animated.View>
  );
}

type ToastParams = Omit<ToastProps & ToastShowParams, "type" | "props"> & {
  props?: {
    id?: string;
    loadingMessages?: string[]; // <-- New prop for cycled text
    icon_asset?: string;
    icon_url?: string;
    icon_style?: ImageStyle;
    icon_element?: () => ReactNode;
    rarity?: Enums<"ACHIEVEMENT_RARITY">;
    cycle?: Enums<"QUEST_CYCLE">;
    live_notification_type?: Enums<"LIVE_NOTIFICATION_TYPE">;
    xp_gain?: number;
    iconContainerClassName?: string;
    onPress?: () => void;
    textButton?: string;
  };
  type:
    | "success"
    | "error"
    | "info"
    | "warning"
    | "achievement"
    | "day-streak"
    | "quest"
    | "blank"
    | "loading"
    | "live-notification";
};

/**
 * Pushes a new toast into the queue.
 * @returns The unique ID of the toast (useful for manually dismissing loading toasts)
 */
export function toast(params: ToastParams): string {
  const id = params.props?.id ?? Crypto.randomUUID();

  // If a new toast is queued, dismiss all currently loading toasts
  if (params.type !== "loading") {
    const loadingToasts = queue.filter((t) => t.type === "loading");
    loadingToasts.forEach((t) => {
      if (t.props?.id) dismissToast(t.props.id);
    });
  }

  queue.push({
    ...params,
    props: {
      ...params.props,
      id,
    },
  });

  runQueue();

  return id;
}

/**
 * Manually dismisses a specific toast and unblocks the queue.
 */
export function dismissToast(toastId: string) {
  if (currentToastId === toastId) {
    Toast.hide();
    cancelSleep?.();
  } else {
    queue = queue.filter((t) => t.props?.id !== toastId);
  }
}

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

export default function ToastProvider({ children }: PropsWithChildren) {
  useListenAchievements();
  useListenQuests();
  useListenLiveNotifications();

  return (
    <>
      {children}

      <FullWindowOverlay>
        <Toast
          autoHide
          topOffset={60}
          visibilityTime={VISIBILITY_TIME}
          config={{
            blank: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="blank" />
            ),
            loading: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="loading" />
            ),
            success: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="success" />
            ),
            error: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="error" />
            ),
            info: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="info" />
            ),
            warning: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="warning" />
            ),
            achievement: (props) => (
              <CustomToast
                {...props}
                key={props?.props?.id}
                type="achievement"
              />
            ),
            quest: (props) => (
              <CustomToast {...props} key={props?.props?.id} type="quest" />
            ),
            "day-streak": (props) => (
              <CustomToast
                {...props}
                key={props?.props?.id}
                type="day-streak"
              />
            ),
            "live-notification": (props) => (
              <CustomToast
                {...props}
                key={props?.props?.id}
                type="live-notification"
              />
            ),
          }}
        />
      </FullWindowOverlay>
    </>
  );
}
