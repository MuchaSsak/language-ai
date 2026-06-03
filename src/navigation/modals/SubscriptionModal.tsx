import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useGetSubscription from "@/hooks/subscription/useGetSubscription";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { CONTACT_EMAIL } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import { Trans, useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import { openURL } from "expo-linking";
import { ArrowRightLeft, Ban, Headset, RefreshCw } from "lucide-react-native";
import { View } from "react-native";
import { CustomerInfo, PurchasesOfferings } from "react-native-purchases";

type SubscriptionModalProps = {};

export default function SubscriptionModal({}: SubscriptionModalProps) {
  const { t, i18n } = useLingui();
  const { THEME } = useTheme();
  const navigation = useNavigation();
  const { data: subscription, isLoading } = useGetSubscription();

  const customerInfo = subscription?.customerInfo as CustomerInfo | undefined;
  const offerings = subscription?.offerings as PurchasesOfferings | undefined;
  const activeSub = customerInfo?.activeSubscriptions?.[0];

  const activePriceString =
    activeSub === "yearly"
      ? offerings?.current?.annual?.product?.priceString
      : offerings?.current?.monthly?.product?.priceString;
  const billingPeriodLabel =
    activeSub === "yearly"
      ? t({ message: `year`, comment: "Per 1 year" })
      : t({ message: `month`, comment: "Per 1 month" });

  const expirationDate = activeSub
    ? customerInfo?.allExpirationDates?.[activeSub]
    : null;
  const formattedChargeDate = expirationDate
    ? i18n.date(expirationDate, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <View className="justify-between flex-1 pb-24">
      <View className="gap-6">
        <View className="px-4 pt-8 gap-7">
          {/* Logo */}
          <View className="flex-row items-center gap-4">
            <Image
              source={require("@/assets/icons/adaptive-icon.png")}
              style={{ width: 80, height: 80 }}
              priority="high"
              contentFit="contain"
            />

            <View className="items-start flex-1 gap-2">
              {/* Title */}
              <Text className="pr-10 text-xl font-semibold">
                <Trans>Linkoglot — Real Studying with AI</Trans>
              </Text>

              <Badge
                variant="outline"
                className="px-2 py-1 border-primary bg-primary/15"
              >
                <RefreshCw size={11} color={THEME.primary} />

                <Text className="uppercase text-2xs text-primary">
                  <Trans>Reoccuring</Trans>
                </Text>
              </Badge>
            </View>
          </View>

          {/* Subscription information */}
          <View className="gap-2">
            <Text className="font-medium text-muted-foreground">
              <Trans>Subscription information</Trans>
            </Text>

            {isLoading || !subscription ? (
              <Skeleton className="w-full h-48 rounded-lg" />
            ) : (
              <View className="gap-3 border rounded-lg border-border bg-secondary">
                {/* Amount due */}
                <View className="px-4 pt-3">
                  <Text className="text-sm font-light text-muted-foreground">
                    <Trans>Amount due</Trans>
                  </Text>

                  <Text>
                    {activePriceString ? (
                      `${activePriceString} / ${billingPeriodLabel}`
                    ) : (
                      <Trans>Couldn&apos;t retrieve the billing...</Trans>
                    )}
                  </Text>
                </View>

                <Separator className="w-full bg-border" />

                {/* Next charge */}
                <View className="px-4 pb-4">
                  <Text className="text-sm font-light text-muted-foreground">
                    <Trans>Next charge</Trans>
                  </Text>

                  <Text>
                    {capitalize(formattedChargeDate) ?? (
                      <Trans>No upcoming renewals</Trans>
                    )}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Links */}
          <View className="border rounded-lg border-border">
            <Button
              enabled={!isLoading}
              variant="ghost"
              onPress={() => {
                navigation.navigate("ReportIssues", {});
                openURL(
                  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t`I need help with my subscription`)}`,
                );
              }}
            >
              <Headset size={16} color={THEME.foreground} />
              <Text>
                <Trans>Help center</Trans>
              </Text>
            </Button>

            <Separator className="w-full bg-border" />

            <Button
              enabled={!isLoading}
              variant="ghost"
              onPress={() => navigation.navigate("SubscriptionChangePlan")}
            >
              <ArrowRightLeft size={16} color={THEME.foreground} />
              <Text>
                <Trans>Change plan</Trans>
              </Text>
            </Button>

            <Separator className="w-full bg-border" />

            <Button
              enabled={!isLoading}
              variant="ghost"
              onPress={() => navigation.navigate("SubscriptionCancel")}
            >
              <Ban size={16} color={THEME.destructive} />
              <Text className="text-destructive">
                <Trans>Cancel subscription</Trans>
              </Text>
            </Button>
          </View>
        </View>
      </View>

      {/* Go back */}
      <View className="px-4">
        <Button isLoading={isLoading} onPress={() => navigation.goBack()}>
          <Text>
            <Trans>Go back!</Trans>
          </Text>
        </Button>
      </View>
    </View>
  );
}
