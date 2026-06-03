import HorizontalCarouselFlow from "@/components/horizontal-flow/HorizontalCarouselFlow";
import Backgrounds from "@/components/onboarding/Backgrounds";
import BottomButtons from "@/components/onboarding/BottomButtons";
import TopHeader from "@/components/onboarding/TopHeader";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { SafeAreaView } from "react-native-safe-area-context";

type OnboardingScreenProps = {};

export default function OnboardingScreen({}: OnboardingScreenProps) {
  const { slides, slideIndex } = useOnboarding();

  return (
    <SafeAreaView className="relative flex-1 gap-0">
      <Backgrounds />
      <TopHeader />
      <HorizontalCarouselFlow slides={slides} slideIndex={slideIndex} />
      <BottomButtons />
    </SafeAreaView>
  );
}
