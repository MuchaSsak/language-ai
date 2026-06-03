import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useTheme from "@/hooks/utils/useTheme";
import Octicons from "@expo/vector-icons/Octicons";
import { useLingui } from "@lingui/react/macro";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

type HeaderProgressProps = {
  progress: number;
  handlePreviousSlide: () => void;
};

export default function HeaderProgress({
  handlePreviousSlide,
  progress,
}: HeaderProgressProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();

  return (
    <Animated.View
      className="flex-row items-center flex-1 gap-5"
      entering={FadeInUp.duration(300).springify()}
      exiting={FadeOutUp.duration(250)}
    >
      {/* Go back */}
      <Button
        accessibilityLabel={t`Go back`}
        onPress={handlePreviousSlide}
        size="icon"
        variant="accent"
      >
        <Octicons name="arrow-left" size={24} color={THEME.foreground} />
      </Button>

      {/* Progress */}
      <Progress color={THEME.foreground} value={progress * 100} />
    </Animated.View>
  );
}
