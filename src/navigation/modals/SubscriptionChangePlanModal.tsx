import SubscriptionPlanButton from "@/components/onboarding/SubscriptionPlanButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useGetSubscription from "@/hooks/subscription/useGetSubscription";
import usePurchaseSubscription from "@/hooks/subscription/usePurchaseSubscription";
import useNavigation from "@/hooks/utils/useNavigation";
import {
  calculateAnnualSubscriptionSavingPercentage,
  sortSubscriptionPackages,
} from "@/lib/utils";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";

type SubscriptionChangePlanModalProps = {};

export default function SubscriptionChangePlanModal({}: SubscriptionChangePlanModalProps) {
  const navigation = useNavigation();
  const { mutate: purchaseSubscription, isPending } = usePurchaseSubscription();
  const { data: subscription, isLoading } = useGetSubscription();

  const subscriptionPackages = sortSubscriptionPackages(
    subscription?.offerings.current,
  );
  const activeProductIdentifier =
    subscription?.customerInfo?.activeSubscriptions?.[0];
  const currentActiveSubscription = subscriptionPackages?.find(
    (pkg) => pkg.product.identifier === activeProductIdentifier,
  );
  const [currentPkg, setCurrentPkg] = useState<PurchasesPackage | undefined>(
    () => currentActiveSubscription,
  );

  useEffect(() => {
    setCurrentPkg(() => currentActiveSubscription);
  }, [subscription, currentActiveSubscription]);

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      <View className="items-center">
        <Image
          source={require("@/assets/images/subscription-change-plan.png")}
          style={{ width: 200, height: 200 }}
          priority="high"
          contentFit="contain"
        />
      </View>

      {/* Plan buttons */}
      {isLoading || !subscriptionPackages?.length ? (
        <View className="gap-3">
          <Skeleton className="w-full h-28" />
          <Skeleton className="w-full h-20" />
        </View>
      ) : (
        <RadioGroup value={currentPkg?.packageType} onValueChange={() => {}}>
          {subscriptionPackages.map((pkg, i) => {
            const isAnnual = pkg.packageType === "ANNUAL";
            const { annuallySavingPercentage, crossedOffPrice } =
              calculateAnnualSubscriptionSavingPercentage(subscriptionPackages);
            const isAlreadyPurchased =
              currentActiveSubscription?.packageType === pkg.packageType;

            return (
              <View key={i} className="relative">
                {isAlreadyPurchased && (
                  <View
                    className="absolute z-10 items-start"
                    style={{
                      transform: [{ translateY: -8 }, { translateX: 4 }],
                    }}
                  >
                    <Badge
                      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
                      variant="outline"
                      className="px-2 py-1 border-chart-2 bg-chart-2"
                    >
                      <Text className="uppercase text-2xs">
                        <Trans>Current</Trans>
                      </Text>
                    </Badge>
                  </View>
                )}

                <SubscriptionPlanButton
                  pkg={pkg}
                  enabled={!isAlreadyPurchased}
                  activeValue={currentPkg?.packageType}
                  onPress={() => setCurrentPkg({ ...pkg })}
                  annuallySavingPercentage={
                    isAnnual ? annuallySavingPercentage : undefined
                  }
                  crossedOffPrice={isAnnual ? crossedOffPrice : undefined}
                />
              </View>
            );
          })}
        </RadioGroup>
      )}

      {/* Bottom buttons */}
      <View className="gap-3">
        <Button variant="accent" onPress={() => navigation.goBack()}>
          <Text>
            <Trans>Go back</Trans>
          </Text>
        </Button>

        <Button
          enabled={
            currentPkg?.packageType !== currentActiveSubscription?.packageType
          }
          isLoading={isPending}
          onPress={() => purchaseSubscription({ pkg: currentPkg })}
        >
          <Text>
            <Trans>Change plan</Trans>
          </Text>
        </Button>
      </View>
    </View>
  );
}
