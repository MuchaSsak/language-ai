import { useOnboarding } from "@/contexts/OnboardingContext";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

import RadioButton from "@/components/ui/radio-button";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { PurchasesPackage } from "react-native-purchases";

type SubscriptionPlanButtonProps = {
  pkg: PurchasesPackage;
  annuallySavingPercentage?: number | null;
  crossedOffPrice?: string | null;
  onPress?: () => void;
  activeValue?: string;
  enabled?: boolean;
};

export default function SubscriptionPlanButton({
  pkg,
  crossedOffPrice,
  annuallySavingPercentage,
  activeValue,
  enabled,
  onPress,
}: SubscriptionPlanButtonProps) {
  const { product, packageType } = pkg;
  const { isSubscribed } = useAuth();
  const { THEME } = useTheme();
  const {
    onboardingState: { subscriptionPackage },
    setOnboardingState,
  } = useOnboarding();
  const annuallySavingPercentageString = annuallySavingPercentage
    ? Math.round(annuallySavingPercentage * 100) + "%"
    : null;

  return (
    <RadioButton
      onPress={
        onPress ??
        (() =>
          setOnboardingState({
            subscriptionPackage: { ...pkg },
          }))
      }
      enabled={enabled ?? !isSubscribed}
      buttonsLength={2}
      index={packageType === "MONTHLY" ? 0 : 1}
      nextValue={packageType === "MONTHLY" ? "annually" : "monthly"}
      value={packageType}
      activeValue={activeValue ?? subscriptionPackage?.packageType}
      className="p-0 border-t border-l border-r border-muted-foreground rounded-3xl bg-accent/25"
      hasIndicator={false}
      variant="accent"
    >
      <View className="flex-col w-full">
        {annuallySavingPercentage && (
          <View className="flex-row w-full overflow-hidden rounded-t-3xl">
            <LinearGradient
              colors={[THEME.chart3, THEME.chart5]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                justifyContent: "space-between",
                height: 26,
                width: "100%",
              }}
            >
              <Text className="text-sm font-semibold text-black uppercase">
                <Trans>Recommended</Trans>
              </Text>

              {annuallySavingPercentageString && (
                <Text className="pl-4 text-sm font-semibold text-black uppercase">
                  <Trans comment="Paying only 80% of the original price for example, so you save 20% of it.">
                    Save {annuallySavingPercentageString}
                  </Trans>
                </Text>
              )}
            </LinearGradient>
          </View>
        )}

        <View
          className={cn(
            "flex-row items-center px-5 pb-3 w-full",
            annuallySavingPercentage ? "pt-2" : "pt-3",
          )}
        >
          <View className="flex-1">
            <Text className="text-base font-normal">
              {packageType === "MONTHLY" ? (
                <Trans>Monthly</Trans>
              ) : (
                <Trans>Annually</Trans>
              )}
            </Text>

            <View>
              {crossedOffPrice && (
                <Text className="text-sm line-through text-destructive pt-1.5">
                  {crossedOffPrice}
                </Text>
              )}

              <View className="flex-row items-end">
                <Text className="text-xl">{product.priceString}</Text>
                <Text className="text-base font-normal text-muted-foreground">
                  {packageType === "MONTHLY" ? (
                    <Trans comment="2-letter abbreviation from 'month'">
                      {" "}
                      / MO
                    </Trans>
                  ) : (
                    <Trans comment="2-letter abbreviation from 'year'">
                      {" "}
                      / YR
                    </Trans>
                  )}
                </Text>
              </View>
            </View>
          </View>

          <RadioGroupItem className="size-6" value={packageType} />
        </View>
      </View>
    </RadioButton>
  );
}
