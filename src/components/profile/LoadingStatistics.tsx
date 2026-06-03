import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { Trans } from "@lingui/react/macro";
import { ActivityIndicator, View } from "react-native";

type LoadingStatisticsProps = {};

export default function LoadingStatistics({}: LoadingStatisticsProps) {
  const { THEME } = useTheme();

  return (
    <View className="gap-3 px-2">
      <View className="flex-row items-center gap-1">
        <Text className="text-lg font-semibold">
          <Trans>Loading statistics</Trans>
        </Text>
        <ActivityIndicator size="small" color={THEME.mutedForeground} />
      </View>

      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <Skeleton className="flex-1 h-32 bg-muted-foreground" />
          <Skeleton className="flex-1 h-32 bg-muted-foreground" />
        </View>
        <View className="flex-row items-center gap-2">
          <Skeleton className="flex-1 h-32 bg-muted-foreground" />
          <Skeleton className="flex-1 h-32 bg-muted-foreground" />
        </View>
      </View>
    </View>
  );
}
