import LoadingWeeklyXP from "@/components/profile/LoadingWeeklyXP";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type WeeklyXPProps = {};

export default function WeeklyXP({}: WeeklyXPProps) {
  const { THEME } = useTheme();
  const { profile } = useAuth();

  // TODO:
  if (!profile || "awd") return <LoadingWeeklyXP />;

  return (
    <View className="gap-3 px-2">
      {/* Label */}
      <View className="flex-row items-center gap-1">
        <Text className="text-lg font-semibold">
          <Trans>Weekly XP</Trans>
        </Text>
        <Ionicons name="flash" size={16} color={THEME.foreground} />
      </View>

      {/* Chart */}
      <View className="p-4 overflow-hidden rounded-lg bg-secondary">
        <BarChart
          bounces={false}
          barWidth={20}
          barBorderRadius={4}
          data={[]}
          yAxisThickness={0}
          adjustToWidth
          noOfSections={4}
          showGradient
          frontColor={THEME.chart3}
          gradientColor={THEME.primary}
          xAxisThickness={0}
          barStyle={{ borderRadius: 8, width: 26 }}
          yAxisTextStyle={{ color: THEME.mutedForeground }}
          xAxisLabelTextStyle={{ color: THEME.mutedForeground }}
        />
      </View>
    </View>
  );
}
