import SubscriptionBackground from "@/components/onboarding/SubscriptionBackground";
import { useOnboarding } from "@/contexts/OnboardingContext";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type BackgroundsProps = {};

export default function Backgrounds({}: BackgroundsProps) {
  const {
    currentSlide: { id },
  } = useOnboarding();

  return (
    <>
      {id === "subscription" && (
        <Animated.View
          entering={FadeIn.delay(200).duration(500)}
          exiting={FadeOut.duration(500)}
        >
          <SubscriptionBackground />
        </Animated.View>
      )}
    </>
  );
}
