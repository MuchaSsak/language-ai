import { useMutation } from "@tanstack/react-query";

import { hookLog } from "@/lib/utils";
import completeAchievement, {
  CompleteAchievementServiceProps,
} from "@/services/achievements/completeAchievement";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";
import { useLingui } from "@lingui/react/macro";

export default function useCompleteAchievement() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["completeAchievement"],
    mutationFn: ({ achievementType }: CompleteAchievementServiceProps) => {
      const completedAchievements = queryClient
        .getQueryData<Tables<"rpc_achievements">[]>(["getAchievements"])
        ?.filter((a) => a.is_completed);

      const isAlreadyCompleted = completedAchievements?.some(
        (a) => a.type === achievementType,
      );

      if (isAlreadyCompleted) {
        console.info(
          `${t`You already have this achievement!`} (useCompleteAchievement)`,
        );
        return Promise.resolve();
      } else
        return completeAchievement({
          achievementType,
        });
    },

    onError(error) {
      console.error(error);
    },

    onSuccess(_, variables) {
      hookLog("useCompleteAchievement", variables);

      queryClient.invalidateQueries({ queryKey: ["getAchievements"] });
    },
  });

  return mutation;
}
