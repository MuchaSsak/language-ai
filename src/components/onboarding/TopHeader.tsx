import HeaderProgress from "@/components/horizontal-flow/HeaderProgress";
import CongratulationsTopButtons from "@/components/onboarding/CongratulationsTopButtons";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useOnboarding } from "@/contexts/OnboardingContext";
import useLanguage from "@/hooks/utils/useLanguage";
import useNavigation from "@/hooks/utils/useNavigation";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { View } from "react-native";

type TopHeaderProps = {};

export default function TopHeader({}: TopHeaderProps) {
  const { t } = useLingui();
  const { displayLanguage } = useLanguage();
  const {
    currentSlide: { isHiddenHeaderProgress, id },
    progress,
    handlePreviousSlide,
  } = useOnboarding();
  const navigation = useNavigation();

  return (
    <View
      className={cn(
        "flex-row items-center justify-end px-4",
        id === "congratulations" ? "gap-2.5" : "gap-5",
      )}
    >
      {/* Switch theme */}
      {id === "congratulations" && <CongratulationsTopButtons />}

      {!isHiddenHeaderProgress && (
        <HeaderProgress
          progress={progress}
          handlePreviousSlide={handlePreviousSlide}
        />
      )}

      {/* Display language */}
      <Button
        accessibilityLabel={t`Pick display language`}
        size="icon"
        variant="accent"
        onPress={() => navigation.navigate("DisplayLanguage")}
      >
        <Text className="text-xl">{displayLanguage.emoji}</Text>
      </Button>
    </View>
  );
}
