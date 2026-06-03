import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Trans } from "@lingui/react/macro";
import React from "react";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

type CongratulationsFooterProps = {};

export default function CongratulationsFooter({}: CongratulationsFooterProps) {
  const { handleSetSlide } = useOnboarding();

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={FadeInDown.delay(100).springify()}
      exiting={FadeOutDown}
    >
      <Button variant="link" onPress={() => handleSetSlide("sign-in")}>
        <Text className="font-normal">
          <Trans>
            Already have an account?{" "}
            <Text className="font-semibold">Sign in</Text>
          </Trans>
        </Text>
      </Button>
    </Animated.View>
  );
}
