import SlideHeader from "@/components/onboarding/SlideHeader";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import { useEffect } from "react";
import { View } from "react-native";

type FinishSlideProps = {};

export default function FinishSlide({}: FinishSlideProps) {
  const { t } = useLingui();
  const {
    isPendingFinish,
    setIsContinueLoading,
    onboardingState: { slideId },
  } = useOnboarding();

  useEffect(() => {
    if (slideId !== "finish") return;

    if (isPendingFinish) setIsContinueLoading?.(true);
    else setIsContinueLoading?.(false);
  }, [isPendingFinish, slideId, setIsContinueLoading]);

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

      <SlideHeader title={t`Finish`} />
    </View>
  );
}
