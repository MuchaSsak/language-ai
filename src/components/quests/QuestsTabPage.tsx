import Challenge from "@/components/quests/Challenge";
import Quests from "@/components/quests/Quests";
import { Skeleton } from "@/components/ui/skeleton";
import useGetChallenge from "@/hooks/challenges/useGetChallenge";
import useGetQuests from "@/hooks/quests/useGetQuests";
import useTheme from "@/hooks/utils/useTheme";
import { Trans } from "@lingui/react/macro";
import { ScrollView, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function QuestsTabPage() {
  const { THEME } = useTheme();

  // Quests
  const {
    data: allQuests,
    refetch: refetchQuests,
    isRefetching: isRefetchingQuests,
  } = useGetQuests();
  const dailyQuests = allQuests?.filter((q) => q.cycle === "daily");
  const weeklyQuests = allQuests?.filter((q) => q.cycle === "weekly");

  // Challenge
  const {
    data: challenge,
    isLoading: isLoadingChallenge,
    refetch: refetchChallenge,
    isRefetching: isRefetchingChallenge,
  } = useGetChallenge();
  const isRefetching = isRefetchingQuests || isRefetchingChallenge;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={THEME.primary}
          refreshing={isRefetching}
          onRefresh={() => {
            refetchChallenge();
            refetchQuests();
          }}
        />
      }
      contentContainerClassName="flex-col gap-2 bg-background mx-auto w-full pb-32"
    >
      {isLoadingChallenge ? (
        <Skeleton className="rounded-none h-52" />
      ) : (
        <Challenge challenge={challenge} studySet={challenge?.study_sets} />
      )}

      <View className="gap-6 px-4 pt-4">
        <Quests quests={dailyQuests} cycle="daily">
          <Trans>Daily Quests</Trans>
        </Quests>

        <Quests quests={weeklyQuests} cycle="weekly">
          <Trans>Weekly Quests</Trans>
        </Quests>
      </View>
    </ScrollView>
  );
}
