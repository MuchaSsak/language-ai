import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useProfileExportData from "@/hooks/profiles/useProfileExportData";
import useNavigation from "@/hooks/utils/useNavigation";
import { Trans } from "@lingui/react/macro";

import { Image } from "expo-image";
import { View } from "react-native";

export default function ExportDataModal() {
  const { mutate: exportData, isPending } = useProfileExportData();
  const navigation = useNavigation();

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-8 ">
        <Image
          source={require("@/assets/images/export-data.png")}
          style={{ width: 250, height: 250 }}
          priority="high"
          contentFit="contain"
        />
        <View className="gap-1.5">
          <Text className="text-2xl font-semibold text-center text-balance">
            <Trans>All the information Linkoglot stores about you</Trans>
          </Text>
          <Text className="px-2 text-center text-balance text-muted-foreground">
            <Trans>
              In compliance with GDPR and our privacy policy, we can export all
              information associated with your account into a single file for
              you to review or download. We provide this feature to ensure total
              transparency regarding how your data is handled and stored!
            </Trans>
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="gap-3">
        <Button
          enabled={!isPending}
          variant="accent"
          onPress={() => navigation.goBack()}
        >
          <Text>
            <Trans>Go back</Trans>
          </Text>
        </Button>

        <Button isLoading={isPending} onPress={() => exportData()}>
          <Text>
            <Trans>OK, download!</Trans>
          </Text>
        </Button>
      </View>
    </View>
  );
}
