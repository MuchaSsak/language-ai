import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useOnboarding } from "@/contexts/OnboardingContext";
import useSignOut from "@/hooks/auth/useSignOut";
import useNavigation from "@/hooks/utils/useNavigation";
import { Trans } from "@lingui/react/macro";

import { Image } from "expo-image";
import { View } from "react-native";

type SignOutModalProps = {};

export default function SignOutModal({}: SignOutModalProps) {
  const { handleSetSlide } = useOnboarding();
  const { mutate: signOut, isPending } = useSignOut();
  const navigation = useNavigation();

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-8 ">
        <Image
          source={require("@/assets/images/sign-out.png")}
          style={{ width: 250, height: 250 }}
          priority="high"
          contentFit="contain"
        />
        <View className="gap-1.5 px-6">
          <Text className="text-2xl font-semibold text-center text-balance">
            <Trans>Are you sure you want to sign out?</Trans>
          </Text>
          <Text className="text-center text-balance text-muted-foreground">
            <Trans>
              You&apos;re about to risk loosing your streak and staying
              committed to your goals! Remember, always keep grinding!
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
            signOut({
              onSuccess: () => handleSetSlide("sign-in"),
            })
          }
        >
          <Text>
            <Trans>Yes, sign out...</Trans>
          </Text>
        </Button>
      </View>
    </View>
  );
}
