import { Text } from "@/components/ui/text";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { useEffect } from "react";
import { View } from "react-native";

type CongratulationsSlideProps = {};

export default function CongratulationsSlide({}: CongratulationsSlideProps) {
  const {
    onboardingState: { slideId },
    setIsContinueDisabled,
  } = useOnboarding();

  useEffect(() => {
    if (slideId !== "congratulations") return;

    setIsContinueDisabled(false);
  }, [slideId, setIsContinueDisabled]);

  return (
    <View className="items-center flex-1 gap-6 px-6 pb-4">
      <View className="border-4 border-red-500">
        <Image
          source={require("@/assets/icons/splash-icon.png")}
          style={{ width: 250, height: 450 }}
          priority="high"
          contentFit="contain"
        />
      </View>

      <Text className="px-4 text-3xl font-bold text-center">
        <Trans>Language learning made easy</Trans>
      </Text>
    </View>
  );
}
