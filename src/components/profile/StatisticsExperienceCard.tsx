import TotalTimeSpent from "@/components/profile/TotalTimeSpent";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import { calculateLevel, formatNumber } from "@/lib/utils";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type StatisticsExperienceCardProps = {};

export default function StatisticsExperienceCard({}: StatisticsExperienceCardProps) {
  const { THEME } = useTheme();
  const { profile } = useAuth();
  if (!profile) return;
  const { xp, day_streak_record, total_time_spent_learning } = profile;

  return (
    <View className="gap-2 mx-2">
      <View className="flex-row items-center gap-2">
        {/* Day streak record */}
        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          <View className="items-center justify-center rounded-sm bg-chart-4/15 dark:bg-chart-4/20 size-10">
            <FontAwesome5
              name="fire"
              size={16}
              className="opacity-85 dark:opacity-90"
              color={THEME.chart4}
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">
              {formatNumber(day_streak_record)}
            </Text>
            <Text className="text-muted-foreground">
              <Trans comment="Day streak in a row">Streak record</Trans>
            </Text>
          </View>
        </View>

        {/* Time spent */}
        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          <View className="items-center justify-center rounded-sm bg-chart-3/15 dark:bg-chart-3/20 size-10">
            <FontAwesome5
              size={16}
              name="stopwatch"
              color={THEME.chart3}
              className="opacity-85 dark:opacity-90"
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">
              <TotalTimeSpent seconds={total_time_spent_learning} />
            </Text>
            <Text className="text-muted-foreground">
              <Trans comment="Total time spent">Spent</Trans>
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        {/* Level */}
        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          <View className="items-center justify-center rounded-sm bg-chart-1/15 dark:bg-chart-1/20 size-10">
            <FontAwesome5
              name="trophy"
              size={16}
              color={THEME.chart1}
              className="opacity-85 dark:opacity-90"
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">
              {formatNumber(calculateLevel(xp))}
            </Text>
            <Text className="text-muted-foreground">
              <Trans comment="Gamified user's level based on XP">Level</Trans>
            </Text>
          </View>
        </View>

        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          {/* Total XP */}
          <View className="items-center justify-center rounded-sm bg-chart-2/15 dark:bg-chart-2/20 size-10">
            <Ionicons
              name="flash"
              size={16}
              color={THEME.chart2}
              className="opacity-85 dark:opacity-90"
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">{formatNumber(xp)}</Text>
            <Text className="text-muted-foreground">
              <Trans comment="Total experience points (XP)">Total XP</Trans>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
