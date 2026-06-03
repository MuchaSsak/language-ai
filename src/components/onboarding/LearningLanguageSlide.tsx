import SlideHeader from "@/components/onboarding/SlideHeader";
import LanguagePicker from "@/components/settings/LanguagePicker";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { View } from "react-native";

type LearningLanguageSlideProps = {};

export default function LearningLanguageSlide({}: LearningLanguageSlideProps) {
  const { t } = useLingui();
  const {
    onboardingState: { learningLanguage, slideId },
    setOnboardingState,
    setIsContinueDisabled,
  } = useOnboarding();

  useEffect(() => {
    if (slideId !== "learning-language") return;

    if (learningLanguage) setIsContinueDisabled(false);
    else setIsContinueDisabled(true);
  }, [learningLanguage, slideId, setIsContinueDisabled]);

  return (
    <View className="justify-between flex-1 px-6 pb-24">
      <SlideHeader title={t`What language are you trying to learn?`} />
      <LanguagePicker
        value={learningLanguage}
        onValueChange={(newLanguage) =>
          setOnboardingState({ learningLanguage: newLanguage })
        }
      />
    </View>
  );
}
