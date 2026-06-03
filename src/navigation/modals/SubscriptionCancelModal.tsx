import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useCancelSubscription from "@/hooks/subscription/useCancelSubscription";
import useNavigation from "@/hooks/utils/useNavigation";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { View } from "react-native";

type SubscriptionCancelModalProps = {};

export default function SubscriptionCancelModal({}: SubscriptionCancelModalProps) {
  const navigation = useNavigation();

  const { mutate: cancelSubscription, isPending } = useCancelSubscription();

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-2">
        <View className="items-center gap-8">
          <Image
            source={require("@/assets/images/subscription-cancel.png")}
            style={{ width: 250, height: 250 }}
            priority="high"
            contentFit="contain"
          />
          <View className="gap-1.5 px-6">
            <Text className="text-2xl font-semibold text-center text-balance">
              <Trans>Are you sure you want to stop learning?</Trans>
            </Text>
            <Text className="text-center text-balance text-muted-foreground">
              <Trans>
                You&apos;re about to cancel your subscription and loose access
                to the application. You won&apos;t be able to effectively study
                with AI in Linkoglot. Don&apos;t give up!
              </Trans>
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="gap-3">
        <Button variant="accent" onPress={() => navigation.goBack()}>
          <Text>
            <Trans>No, go back</Trans>
          </Text>
        </Button>

        <Button
          variant="destructive"
          isLoading={isPending}
          onPress={() => cancelSubscription({})}
        >
          <Text>
            <Trans>Yes, cancel now</Trans>
          </Text>
        </Button>
      </View>
    </View>
  );
}
