import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import { formatNumber } from "@/lib/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Trans } from "@lingui/react/macro";
import { Swords } from "lucide-react-native";
import { View } from "react-native";

type StatisticsStudySetsCardProps = {};

export default function StatisticsStudySetsCard({}: StatisticsStudySetsCardProps) {
  const { THEME } = useTheme();
  const { profile } = useAuth();

  if (!profile) return;
  const { total_challenges_beat, total_quizes_played, total_study_sets } =
    profile;

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        {/* Flashcards */}
        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          <View className="items-center justify-center rounded-sm bg-chart-4/15 dark:bg-chart-4/20 size-10">
            <MaterialCommunityIcons
              size={18}
              name="cards"
              className="opacity-85 dark:opacity-90"
              color={THEME.chart4}
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">
              {formatNumber(total_study_sets)}
            </Text>
            <Text className="text-muted-foreground">
              <Trans>Study sets</Trans>
            </Text>
          </View>
        </View>

        {/* Quizes */}
        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          <View className="items-center justify-center rounded-sm bg-chart-3/15 dark:bg-chart-3/20 size-10">
            <MaterialIcons
              size={18}
              name="quiz"
              className="opacity-85 dark:opacity-90"
              color={THEME.chart3}
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">
              {formatNumber(total_quizes_played)}
            </Text>
            <Text className="text-muted-foreground">
              <Trans>Quizes played</Trans>
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        {/* Challenges */}
        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          <View className="items-center justify-center rounded-sm bg-chart-1/15 dark:bg-chart-1/20 size-10">
            <Swords
              size={16}
              color={THEME.chart1}
              fill={THEME.chart1}
              className="opacity-85 dark:opacity-90"
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">
              {formatNumber(total_challenges_beat)}
            </Text>
            <Text className="text-muted-foreground">
              <Trans>Challenges beat</Trans>
            </Text>
          </View>
        </View>

        <View className="flex-1 gap-2 p-4 rounded-lg bg-secondary">
          {/* Pictures */}
          <View className="items-center justify-center rounded-sm bg-chart-2/15 dark:bg-chart-2/20 size-10">
            <MaterialCommunityIcons
              name="camera-image"
              size={18}
              color={THEME.chart2}
              className="opacity-85 dark:opacity-90"
            />
          </View>

          <View>
            <Text className="text-xl font-semibold">{formatNumber(999)}</Text>
            <Text className="text-muted-foreground">
              <Trans>Pictures</Trans>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
