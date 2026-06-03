import CongratulationsFooter from "@/components/onboarding/CongratulationsFooter";
import SubscriptionFooter from "@/components/onboarding/SubscriptionFooter";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Trans } from "@lingui/react/macro";
import React from "react";
import { View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

type BottomButtonsProps = {};

export default function BottomButtons({}: BottomButtonsProps) {
  const {
    handleNextSlide,
    currentSlide: { continueButtonText, id, onPress, onPressCheck },
    isContinueDisabled,
    isContinueLoading,
  } = useOnboarding();

  return (
    <View className="absolute left-0 w-full gap-1 px-6 pt-0 bottom-16">
      {id === "subscription" && <SubscriptionFooter />}

      {continueButtonText !== null && (
        <Animated.View
          layout={LinearTransition.springify()}
          entering={FadeInDown.duration(300).springify()}
          exiting={FadeOutDown.duration(250)}
        >
          <Button
            onPress={() => {
              if (onPressCheck && onPress) onPress();
              else handleNextSlide();
            }}
            enabled={!isContinueDisabled}
            isLoading={isContinueLoading}
          >
            <Text>{continueButtonText?.() ?? <Trans>Continue</Trans>}</Text>
          </Button>
        </Animated.View>
      )}

      {/* Custom bottom buttons */}
      {id === "congratulations" && <CongratulationsFooter />}
    </View>
  );
}
