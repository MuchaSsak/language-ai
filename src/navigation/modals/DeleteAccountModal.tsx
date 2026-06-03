import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useDeleteAccount from "@/hooks/auth/useDeleteAccount";
import useCancelSubscription from "@/hooks/subscription/useCancelSubscription";
import useNavigation from "@/hooks/utils/useNavigation";
import { Trans } from "@lingui/react/macro";

import { Image } from "expo-image";
import { View } from "react-native";

type DeleteAccountModalProps = {};

export default function DeleteAccountModal({}: DeleteAccountModalProps) {
  const navigation = useNavigation();

  const { mutate: deleteAccount, isPending: isPendingDeleteAccount } =
    useDeleteAccount();
  const { mutate: cancelSubscription, isPending: isPendingCancelSubscription } =
    useCancelSubscription();
  const isPending = isPendingDeleteAccount || isPendingCancelSubscription;

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-8 ">
        <Image
          source={require("@/assets/images/delete-account.png")}
          style={{ width: 250, height: 250 }}
          priority="high"
          contentFit="contain"
        />
        <View className="gap-1.5 px-6">
          <Text className="text-2xl font-semibold text-center text-balance">
            <Trans>Are you sure you want to delete your account?</Trans>
          </Text>
          <Text className="text-center text-balance text-muted-foreground">
            <Trans>
              This action cannot be undone. You will loose all of your
              flashcards, profile experience, and your subscription will be
              cancelled automatically. We&apos;ll most definitely miss you!
            </Trans>
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="gap-3">
        <Button
          enabled={!isPending}
          variant="accent"
          onPress={() => navigation.goBack()}
        >
          <Text>
            <Trans>No, let&apos;s go back!</Trans>
          </Text>
        </Button>

        <Button
          isLoading={isPending}
          variant="destructive"
          onPress={() =>
            cancelSubscription({ onSuccess: () => deleteAccount() })
          }
        >
          <Text>
            <Trans>Yes, delete permanently...</Trans>
          </Text>
        </Button>
      </View>
    </View>
  );
}
