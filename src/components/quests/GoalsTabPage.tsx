import { Text } from "@/components/ui/text";
import { Trans } from "@lingui/react/macro";
import { ScrollView } from "react-native";

export default function GoalsTabPage() {
  return (
    <ScrollView contentContainerClassName="px-4 flex-col gap-4 bg-background mx-auto w-full">
      <Text className="text-2xl font-semibold text-foreground">
        <Trans>Session goals</Trans>
      </Text>
    </ScrollView>
  );
}
