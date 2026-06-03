import QuestCard from "@/components/quests/QuestCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { getQuestsTimeRemaining } from "@/lib/utils";
import { Enums, Tables } from "@/typings/database.types";
import { useLingui } from "@lingui/react/macro";
import { FlashList } from "@shopify/flash-list";
import { Clock8 } from "lucide-react-native";
import { PropsWithChildren } from "react";
import { View } from "react-native";

const DAILY_QUESTS_AMOUNT = 3;
const WEEKLY_QUESTS_AMOUNT = 2;

type QuestsProps = PropsWithChildren & {
  quests?: (Tables<"quests_users"> & Tables<"quests_pool">)[];
  cycle: Enums<"QUEST_CYCLE">;
};

export default function Quests({ children, cycle, quests }: QuestsProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();

  const { value: timeRemainingValue, type: timeRemainingType } =
    getQuestsTimeRemaining(quests?.[0]?.deadline);
  const pluralTimeRemaining =
    timeRemainingType === "hours"
      ? timeRemainingValue === 1
        ? t`hour`
        : t`hours`
      : timeRemainingType === "days"
        ? timeRemainingValue === 1
          ? t`day`
          : t`days`
        : timeRemainingValue === 1
          ? t`minute`
          : t`minutes`;
  const hoursColor = cycle === "daily" ? THEME.chart3 : THEME.purple[500];

  return (
    <View className="gap-3">
      {/* Label */}
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">{children}</Text>

        {timeRemainingType && (
          <View className="flex-row items-center gap-1">
            <Clock8 color={hoursColor} size={16} strokeWidth={2.5} />

            <Text className="font-medium" style={{ color: hoursColor }}>
              {timeRemainingValue} {pluralTimeRemaining}
            </Text>
          </View>
        )}
      </View>

      {/* Quests */}
      <View className="rounded-lg bg-secondary">
        <FlashList
          data={quests}
          ListEmptyComponent={() =>
            Array.from({
              length:
                cycle === "daily" ? DAILY_QUESTS_AMOUNT : WEEKLY_QUESTS_AMOUNT,
            }).map((_, i) => <Skeleton key={i} className="w-full h-16 mb-3" />)
          }
          keyExtractor={({ id }) => id}
          renderItem={({ item, index }) => {
            const dailyColor = [THEME.chart4, THEME.chart3, THEME.chart2]?.[
              index
            ];
            const weeklyColor = [THEME.purple[500], THEME.fuchsia[400]]?.[
              index
            ];

            return (
              <QuestCard
                key={item.id}
                quest={item}
                color={
                  (cycle === "daily" ? dailyColor : weeklyColor) ?? THEME.chart3
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
}
