import SlideHeader from "@/components/onboarding/SlideHeader";
import LoginConnections from "@/components/ui/login-connections";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import useSecretPress from "@/hooks/utils/useSecretPress";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { Pressable, View } from "react-native";

type SignInSlideProps = {};

export default function SignInSlide({}: SignInSlideProps) {
  const { t } = useLingui();
  const { isAuthenticated, isLoading: isLoadingProfile } = useAuth();
  const {
    handleJumpToSkippedSlide,
    onboardingState: { slideId },
    setIsContinueDisabled,
    currentSlide: { shouldSkip },
    isUserGoingBack,
    setIsContinueLoading,
    handleNextSlide,
  } = useOnboarding();
  const { handleSecretPress, isSuccess } = useSecretPress();

  useEffect(() => {
    if (slideId !== "sign-in") return;

    if (isLoadingProfile) setIsContinueLoading(true);
    else setIsContinueLoading(false);

    if (isAuthenticated) {
      setIsContinueDisabled(false);

      // Go forward if going from left to right (progressing rather than going back). Only exception is the Sign-In link on the first congratulations slide (index 0)
      if (shouldSkip && !isUserGoingBack) handleNextSlide();
    } else setIsContinueDisabled(true);
  }, [
    slideId,
    setIsContinueDisabled,
    handleNextSlide,
    shouldSkip,
    isUserGoingBack,
    isAuthenticated,
    isLoadingProfile,
    setIsContinueLoading,
  ]);

  return (
    <View className={cn("flex-1 px-6", isSuccess ? "" : "justify-between")}>
      <Pressable onPress={handleSecretPress}>
        <SlideHeader
          title={t`Save your progress`}
          subtitle={t`We'll log you in or create an account automatically.`}
        />
      </Pressable>

      <LoginConnections
        hasSignOut
        onSuccess={() => {
          const hasFoundSkipped = handleJumpToSkippedSlide();
          if (!hasFoundSkipped) return handleNextSlide();
        }}
        hasEmailForm={isSuccess}
      />
      <View className="h-40" />
    </View>
  );
}
