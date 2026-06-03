import ConsentAnalyticsCheckbox from "@/components/ui/consent-analytics-checkbox";
import ConsentMarketingCheckbox from "@/components/ui/consent-marketing-checkbox";
import ConsentRequiredCheckbox from "@/components/ui/consent-required-checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useGetLatestDocuments from "@/hooks/documents/useGetLatestDocuments";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type AccountOptionalConsentProps = {};

export default function AccountOptionalConsent({}: AccountOptionalConsentProps) {
  const { data: latestDocuments } = useGetLatestDocuments();

  return (
    <View className="gap-2">
      <Text className="font-semibold">
        <Trans>Consentual agreements</Trans>
      </Text>

      {latestDocuments ? (
        <>
          <ConsentRequiredCheckbox
            disabled
            latestDocuments={latestDocuments}
            setIsChecked={() => {}}
          />
          <ConsentMarketingCheckbox latestDocuments={latestDocuments} />
          <ConsentAnalyticsCheckbox latestDocuments={latestDocuments} />
        </>
      ) : (
        <View className="gap-3">
          <View className="flex-row gap-2">
            <Skeleton className="w-8 h-8 rounded-xs" />
            <Skeleton className="flex-1 h-12" />
          </View>

          <View className="flex-row gap-2">
            <Skeleton className="w-8 h-8 rounded-xs" />
            <Skeleton className="flex-1 h-12" />
          </View>
        </View>
      )}
    </View>
  );
}
