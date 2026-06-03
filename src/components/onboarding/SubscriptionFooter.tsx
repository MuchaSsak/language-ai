import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trans } from "@lingui/react/macro";
import React from "react";
import { View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type SubscriptionFooterProps = {};

export default function SubscriptionFooter({}: SubscriptionFooterProps) {
  const { THEME } = useTheme();
  const { isSubscribed } = useAuth();

  return (
    <Animated.View
      entering={FadeInDown.delay(100).springify()}
      exiting={FadeOutDown}
      className="pb-3"
    >
      <View className="gap-2">
        <View className="flex-row items-center justify-center gap-1">
          <Ionicons name="checkmark" size={20} color={THEME.mutedForeground} />
          <Text className="font-normal text-muted-foreground">
            <Trans>Notifications for reminders</Trans>
          </Text>
        </View>

        <View className="flex-row items-center justify-center gap-1">
          <Ionicons name="checkmark" size={20} color={THEME.mutedForeground} />
          <Text className="font-normal text-muted-foreground">
            <Trans>Cancel anytime</Trans>
          </Text>
        </View>

        {isSubscribed ? (
          <View className="flex-row items-center justify-center gap-1">
            <Ionicons name="checkmark" size={20} color={THEME.primary} />
            <Text className="font-normal text-primary">
              <Trans>Already subscribed</Trans>
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center justify-center gap-1">
            <Ionicons
              name="checkmark"
              size={20}
              color={THEME.mutedForeground}
            />
            <Text className="font-normal text-muted-foreground">
              <Trans>No payment due now</Trans>
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}
