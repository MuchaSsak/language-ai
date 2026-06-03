import SlideHeader from "@/components/onboarding/SlideHeader";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { View } from "react-native";

import SubscriptionFeaturesList from "@/components/onboarding/SubscriptionFeaturesList";
import SubscriptionPlanButton from "@/components/onboarding/SubscriptionPlanButton";
import { RadioGroup } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import useGetSubscription from "@/hooks/subscription/useGetSubscription";
import {
  calculateAnnualSubscriptionSavingPercentage,
  sortSubscriptionPackages,
} from "@/lib/utils";

type SubscriptionSlideProps = {};

export default function SubscriptionSlide({}: SubscriptionSlideProps) {
  const { t } = useLingui();
  const {
    onboardingState: { slideId, subscriptionPackage },
    setIsContinueLoading,
    isUserGoingBack,
    handleNextSlide,
    currentSlide: { shouldSkip },
  } = useOnboarding();
  const { data: subscription, isLoading } = useGetSubscription();

  const subscriptionPackages = sortSubscriptionPackages(
    subscription?.offerings.current,
  );

  useEffect(() => {
    if (slideId !== "subscription") return;

    if (subscriptionPackage && !isLoading) setIsContinueLoading(false);
    if (isLoading || !subscriptionPackages?.length) setIsContinueLoading(true);
  }, [
    subscriptionPackage,
    subscriptionPackages?.length,
    slideId,
    setIsContinueLoading,
    isLoading,
  ]);

  useEffect(() => {
    if (slideId !== "subscription") return;

    if (shouldSkip && !isUserGoingBack) handleNextSlide();
  }, [handleNextSlide, slideId, shouldSkip, isUserGoingBack]);

  return (
    <View className="gap-2 px-6">
      <SlideHeader
        title={t`Unlock your potential and reach goals`}
        titleClassName="text-4xl"
      />

      <SubscriptionFeaturesList />

      {isLoading || !subscriptionPackages?.length ? (
        <View className="gap-3">
          <Skeleton className="w-full h-28" />
          <Skeleton className="w-full h-20" />
        </View>
      ) : (
        <RadioGroup
          value={subscriptionPackage?.packageType}
          onValueChange={() => {}}
        >
          {subscriptionPackages.map((pkg, i) => {
            const isAnnual = pkg.packageType === "ANNUAL";
            const { annuallySavingPercentage, crossedOffPrice } =
              calculateAnnualSubscriptionSavingPercentage(subscriptionPackages);

            return (
              <SubscriptionPlanButton
                pkg={pkg}
                annuallySavingPercentage={
                  isAnnual ? annuallySavingPercentage : undefined
                }
                crossedOffPrice={isAnnual ? crossedOffPrice : undefined}
                key={i}
              />
            );
          })}
        </RadioGroup>
      )}
    </View>
  );
}
