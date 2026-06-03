import { Button } from "@/components/ui/button";
import useNavigation from "@/hooks/utils/useNavigation";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Trans, useLingui } from "@lingui/react/macro";
import { Text } from "@react-navigation/elements";
import { openURL } from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const { t } = useLingui();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="gap-4 p-4">
      <Text className="text-3xl font-bold text-center">404</Text>

      <Button size="xl" variant="accent" onPress={() => navigation.goHome()}>
        <Text className="text-xl font-semibold">
          <Trans>Go to Home</Trans>
        </Text>
      </Button>

      <Button size="xl" onPress={() => navigation.navigate("Onboarding")}>
        <Text className="text-xl font-semibold text-background">
          <Trans>Go to Onboarding</Trans>
        </Text>
      </Button>

      <Text className="pt-8 text-center text-muted-foreground">
        <Trans>
          If you are currently experiencing an issue, please contact us at{" "}
          <Button
            variant="ghost"
            size="slim"
            onPress={() =>
              openURL(
                `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t`Contact Request`)}`,
              )
            }
          >
            <Text className="font-semibold underline text-primary">
              {CONTACT_EMAIL}
            </Text>
          </Button>
        </Trans>
      </Text>
    </SafeAreaView>
  );
}
