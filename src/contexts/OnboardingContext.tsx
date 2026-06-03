import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import CongratulationsSlide from "@/components/onboarding/CongratulationsSlide";
import FinishSlide from "@/components/onboarding/FinishSlide";
import LearningLanguageSlide from "@/components/onboarding/LearningLanguageSlide";
import SignInSlide from "@/components/onboarding/SignInSlide";
import SubscriptionSlide from "@/components/onboarding/SubscriptionSlide";
import { useAuth } from "@/contexts/AuthContext";
import useHorizontalFlowSlides, {
  Slide,
  SlidesContextValue,
  SlidesMMKVState,
} from "@/hooks/horizontal-flow/useHorizontalFlowSlides";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useGetSubscription from "@/hooks/subscription/useGetSubscription";
import usePurchaseSubscription from "@/hooks/subscription/usePurchaseSubscription";
import useDebouncedCallback from "@/hooks/utils/useDebouncedCallback";
import useLanguage from "@/hooks/utils/useLanguage";
import { SupportedLanguage } from "@/lib/locales";
import { calculateCarouselProgress } from "@/lib/utils";
import { navigationRef } from "@/navigation";
import NotificationsModal from "@/navigation/modals/NotificationsModal";
import { TablesUpdate } from "@/typings/database.types";
import { useLingui } from "@lingui/react/macro";
import { useMMKVObject } from "react-native-mmkv";
import { PurchasesPackage } from "react-native-purchases";

/**
 * Types
 */
export type OnboardingSlideId =
  | "congratulations"
  | "learning-language"
  | "notifications"
  | "sign-in"
  | "subscription"
  | "finish";

export type OnboardingMMKVState = SlidesMMKVState<OnboardingSlideId> & {
  learningLanguage?: SupportedLanguage;
  expoPushToken?: true | null;
  subscriptionPackage?: PurchasesPackage;
};

type OnboardingContextValue = SlidesContextValue<OnboardingSlideId> & {
  onboardingState: OnboardingMMKVState;
  setOnboardingState: (newState: Partial<OnboardingMMKVState>) => void;

  isPendingFinish?: boolean;
};

/**
 * Initialize context
 */
const initialOnboardingMMKVState: OnboardingMMKVState = {
  slideId: "congratulations",
  slideProgress: 0,
  isFinished: false,
  expoPushToken: undefined,
  learningLanguage: undefined,
  subscriptionPackage: undefined,
};

const OnboardingContext = createContext<OnboardingContextValue>(
  {} as OnboardingContextValue,
);

/**
 * Provider
 */
export default function OnboardingProvider({ children }: PropsWithChildren) {
  const { t } = useLingui();
  const { isAuthenticated, profile, isSubscribed } = useAuth();
  const { displayLanguage } = useLanguage();

  /**
   * MMKV state
   */
  const [mmkvOnboardingState, setMmkvOnboardingState] =
    useMMKVObject<OnboardingMMKVState>("onboarding_state");
  const onboardingState = mmkvOnboardingState || initialOnboardingMMKVState;
  const { learningLanguage, subscriptionPackage, slideProgress, slideId } =
    onboardingState;

  const setOnboardingState = useCallback(
    (newState: Partial<OnboardingMMKVState>) => {
      setMmkvOnboardingState((prevState) => ({
        ...initialOnboardingMMKVState,
        ...prevState,
        ...newState,
      }));
    },
    [setMmkvOnboardingState],
  );

  /**
   * Sync subscription
   */
  const { data: subscription } = useGetSubscription();

  const subscriptionPackages =
    subscription?.offerings.current?.availablePackages;
  const activeProductIdentifier =
    subscription?.customerInfo?.activeSubscriptions?.[0];
  const activePackage = subscriptionPackages?.find(
    (pkg) => pkg.product.identifier === activeProductIdentifier,
  );

  useEffect(() => {
    if (activePackage)
      setOnboardingState({ subscriptionPackage: { ...activePackage } });
  }, [activePackage, setOnboardingState]);

  /**
   * Slides
   */
  const {
    mutate: purchaseSubscription,
    isPending: isPendingPurchaseSubscription,
  } = usePurchaseSubscription();
  const ONBOARDING_SLIDES: Slide<OnboardingSlideId>[] = useMemo(
    () => [
      {
        id: "congratulations",
        Component: CongratulationsSlide,
        isHiddenHeaderProgress: true,
        continueButtonText: () => t`Get started`,
      },
      {
        id: "learning-language",
        Component: LearningLanguageSlide,
        guard: !!profile?.learning_language || !!learningLanguage,
        isScrollView: false,
      },
      {
        id: "sign-in",
        Component: SignInSlide,
        continueButtonText: isAuthenticated ? () => t`Continue` : null,
        guard: !!isAuthenticated,
        shouldSkip: !!isAuthenticated,
      },
      {
        id: "subscription",
        Component: SubscriptionSlide,
        continueButtonText: isSubscribed
          ? () => t`Continue`
          : () => t`Start 1-week free trial`,
        onPress: () =>
          purchaseSubscription({
            pkg: subscriptionPackage,
          }),
        onPressCheck: !isSubscribed,
        guard: !!isSubscribed,
      },
      {
        id: "notifications",
        Component: NotificationsModal,
        shouldSkip:
          !!profile?.expo_push_token &&
          !!profile.consent_marketing?.accepted_optional_marketing,
      },
      {
        id: "finish",
        Component: FinishSlide,
        continueButtonText: () => t`Finish`,
      },
    ],
    [
      profile?.learning_language,
      profile?.expo_push_token,
      profile?.consent_marketing?.accepted_optional_marketing,
      isAuthenticated,
      purchaseSubscription,
      subscriptionPackage,
      isSubscribed,
      learningLanguage,
      t,
    ],
  );

  const [isContinueDisabled, setIsContinueDisabled] = useState(false);
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const progress = calculateCarouselProgress(
    onboardingState.slideProgress,
    ONBOARDING_SLIDES.length,
  );

  const { mutate: updateProfile, isPending: isPendingUpdateProfile } =
    useUpdateProfile();

  const [debouncedUpdateProfile, { handleCancelDebounces, isDebouncing }] =
    useDebouncedCallback(updateProfile, {
      delay: 5000,
      maxWait: 5000,
      trailing: false,
    });
  const isPending =
    isPendingPurchaseSubscription || (isPendingUpdateProfile && !isDebouncing);

  const newProfile = useMemo<TablesUpdate<"profiles">>(
    () => ({
      display_language: displayLanguage.locale,
      learning_language: profile?.learning_language ?? learningLanguage,
      last_onboarding_slide_id: slideId,
      last_onboarding_slide_progress: slideProgress,
    }),
    [
      learningLanguage,
      profile?.learning_language,
      slideId,
      slideProgress,
      displayLanguage.locale,
    ],
  );

  const handleOnNextSlide = useCallback(() => {
    debouncedUpdateProfile({
      newProfile: { ...newProfile },
    });
  }, [debouncedUpdateProfile, newProfile]);

  const {
    previousSlideIndex,
    slideIndex,
    isUserGoingBack,
    currentSlide,
    handleNextSlide,
    handlePreviousSlide,
    handleSetSlide,
    handleJumpToSkippedSlide,
  } = useHorizontalFlowSlides<OnboardingSlideId>({
    baseSlides: ONBOARDING_SLIDES,
    slidesMMKVState: onboardingState,
    setSlidesMMKVState: setOnboardingState,
    onFinish: () => {
      handleCancelDebounces();
      updateProfile({
        newProfile: {
          ...newProfile,
          has_finished_onboarding: true,
        },
        onSuccess: () => {
          setOnboardingState({ isFinished: true });
          setIsContinueLoading(false);
          navigationRef.navigate("HomeTabs");
        },
      });
    },
    onNextSlide: handleOnNextSlide,
  });

  return (
    <OnboardingContext.Provider
      value={{
        slides: ONBOARDING_SLIDES,
        previousSlideIndex,
        isUserGoingBack,
        currentSlide,
        slideIndex,
        progress,

        handlePreviousSlide,
        handleSetSlide,
        handleNextSlide,
        handleJumpToSkippedSlide,

        isContinueDisabled: isContinueDisabled || isPending,
        setIsContinueDisabled,
        isContinueLoading: isContinueLoading || isPending,
        setIsContinueLoading,

        onboardingState,
        setOnboardingState,
        isPendingFinish: isPending,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * Hook
 */
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined)
    throw new Error("useOnboarding was used outside of OnboardingProvider!");
  return context;
}
