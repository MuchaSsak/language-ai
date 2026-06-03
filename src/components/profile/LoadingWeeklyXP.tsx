import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { Trans } from "@lingui/react/macro";
import { ActivityIndicator, View } from "react-native";

type LoadingWeeklyXPProps = {};

export default function LoadingWeeklyXP({}: LoadingWeeklyXPProps) {
  const { THEME } = useTheme();

  return (
    <View className="gap-3 px-2">
      <View className="flex-row items-center gap-1">
        <Text className="text-lg font-semibold">
          <Trans>Loading XP</Trans>
        </Text>
        <ActivityIndicator size="small" color={THEME.mutedForeground} />
      </View>

      <Skeleton className="w-full h-48 bg-muted-foreground" />
    </View>
  );
}
