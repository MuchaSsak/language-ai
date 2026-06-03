import { Button } from "@/components/ui/button";
import ConsentMarketingCheckbox from "@/components/ui/consent-marketing-checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import Switcher from "@/components/ui/switcher";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import useGetLatestDocuments from "@/hooks/documents/useGetLatestDocuments";
import useRegisterForNotifications from "@/hooks/notifications/useRegisterForNotifications";
import useUnregisterFromNotifications from "@/hooks/notifications/useUnregisterFromNotifications";
import useConsent from "@/hooks/utils/useConsent";
import useNavigation from "@/hooks/utils/useNavigation";
import { NavigationRouteParams } from "@/navigation";
import { Trans } from "@lingui/react/macro";

import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { View } from "react-native";

type NotificationsModalProps = NavigationRouteParams<"Notifications"> & {};

export default function NotificationsModal({ route }: NotificationsModalProps) {
  const hasGoBackButton = route?.params?.hasGoBackButton ?? false;
  const navigation = useNavigation();

  const {
    currentSlide: { shouldSkip },
    onboardingState: { slideId },
    isUserGoingBack,
    handleNextSlide,
    setIsContinueLoading,
    setIsContinueDisabled,
  } = useOnboarding();
  const {
    hasConsentedMarketing,
    handleToggleConsentMarketing,
    isSyncing: isSyncingConsent,
  } = useConsent();
  const { data: latestDocuments, isLoading: isLoadingDocuments } =
    useGetLatestDocuments();
  const { profile, isLoading: isLoadingProfile } = useAuth();
  const { mutate: register, isPending: isPendingRegister } =
    useRegisterForNotifications();
  const { mutate: unregister, isPending: isPendingUnregister } =
    useUnregisterFromNotifications();
  const isLoading =
    isLoadingDocuments ||
    isPendingRegister ||
    isPendingUnregister ||
    isLoadingProfile ||
    isSyncingConsent;

  const [isCheckedMarketing, setIsCheckedMarketing] = useState(false);
  const [isNotificationsTurnedOn, setIsNotificationsTurnedOn] = useState(
    !!profile?.expo_push_token,
  );

  useEffect(() => {
    setIsNotificationsTurnedOn(!!profile?.expo_push_token);
  }, [profile?.expo_push_token]);

  useEffect(() => {
    const isInOnboarding = navigation.isRouteInStack("Onboarding");
    if (!isInOnboarding || slideId !== "notifications") return;

    setIsContinueDisabled(false);
    if (isLoading) setIsContinueLoading(true);
    else setIsContinueLoading(false);

    if (shouldSkip && !isUserGoingBack) handleNextSlide();
  }, [
    navigation,
    slideId,
    shouldSkip,
    handleNextSlide,
    isLoading,
    setIsContinueDisabled,
    setIsContinueLoading,
    isUserGoingBack,
  ]);

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-8 ">
        <Image
          source={require("@/assets/images/notifications.png")}
          style={{ width: 250, height: 250 }}
          priority="high"
          contentFit="contain"
        />
        <View className="gap-1.5 px-6">
          <Text className="text-2xl font-semibold text-center text-balance">
            <Trans>Toggle notifications</Trans>
          </Text>
          <Text className="text-center text-balance text-muted-foreground">
            <Trans>
              We use push notifications to remind you to stick to your goals!
              Enable them to never loose your study streak.
            </Trans>
          </Text>
        </View>

        <View className="flex-row items-center justify-center px-4">
          {hasConsentedMarketing ? (
            <Switcher
              textClassName="flex-none"
              isChecked={isNotificationsTurnedOn}
              isLoading={isLoading}
              setIsChecked={() => {
                if (isNotificationsTurnedOn) {
                  unregister({});
                  setIsNotificationsTurnedOn(false);
                } else {
                  register({ hasConsentedMarketing });
                  setIsNotificationsTurnedOn(true);
                }
              }}
            >
              {isNotificationsTurnedOn ? (
                <Trans>Currently turned on</Trans>
              ) : (
                <Trans>Currently turned off</Trans>
              )}
            </Switcher>
          ) : (
            <>
              {latestDocuments ? (
                <ConsentMarketingCheckbox
                  className="flex-1"
                  latestDocuments={latestDocuments}
                  isChecked={isCheckedMarketing}
                  setIsChecked={(newChecked) => {
                    setIsCheckedMarketing(newChecked);
                    const newConsent = handleToggleConsentMarketing(
                      newChecked,
                      latestDocuments,
                      true,
                    );

                    if (!newChecked || !newConsent) return;
                    register({
                      hasConsentedMarketing:
                        newConsent.accepted_optional_marketing,
                    });
                    setIsNotificationsTurnedOn(true);
                  }}
                />
              ) : (
                <Skeleton className="flex-1 h-10 mx-12" />
              )}
            </>
          )}
        </View>
      </View>

      {/* Buttons */}
      {hasGoBackButton && (
        <Button onPress={() => navigation.goBack()} enabled={!isLoading}>
          <Text>
            {hasConsentedMarketing ? (
              <Trans>Save and go back!</Trans>
            ) : (
              <Trans>Go back</Trans>
            )}
          </Text>
        </Button>
      )}
    </View>
  );
}
