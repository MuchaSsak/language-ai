import { toast } from "@/components/layout/providers/ToastProvider";
import { QUESTS_ICONS } from "@/components/quests/QuestCard";
import { SupportedLanguage } from "@/lib/locales";
import { Theme } from "@/lib/theme";
import getQuests from "@/services/quests/getQuests";
import { supabase } from "@/services/supabase/client";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";
import { t } from "@lingui/core/macro";
import * as Crypto from "expo-crypto";
import { ConfettiMethods } from "react-native-fast-confetti";

export type ListenQuestsServiceProps = {
  profile: Tables<"profiles">;
  displayLanguageLocale: SupportedLanguage;
  confetti: ConfettiMethods;
  THEME: Theme;
};

export function listenQuests({
  displayLanguageLocale,
  profile,
  confetti,
  THEME,
}: ListenQuestsServiceProps) {
  const questsChannel = supabase
    .channel(`realtime:user_quests:${profile.user_id}:${Crypto.randomUUID()}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "quests_users",
        filter: `user_id=eq.${profile.user_id}`,
      },
      async (payload) => {
        const oldRow = payload.old as Tables<"quests_users">;
        const newRow = payload.new as Tables<"quests_users">;
        if (!newRow.is_achieved || oldRow?.is_achieved) return;

        const newQuestId = newRow.quest_id;
        const quests = await getQuests();
        if (!quests?.length) return;

        const newQuest = quests.find((q) => q.id === newQuestId);
        if (!newQuest?.id) return;

        // Toast
        const { xp_gain, title: rawTitle, cycle, icon: iconType } = newQuest;
        const icon = QUESTS_ICONS.find(({ value }) => value === iconType)?.icon;
        const title = rawTitle[displayLanguageLocale];

        toast({
          type: "quest",
          props: {
            cycle,
            xp_gain,
            icon_element: () => icon?.(THEME.background, { size: 64 }),
            iconContainerClassName: "px-4",
          },
          text1: `${cycle === "daily" ? t`Daily` : t`Weekly`} ${t`quest completed!`}`,
          text2: t`You've just finished "${title}"`,
        });
        confetti.restart();

        queryClient.invalidateQueries({
          queryKey: ["getQuests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getProfile"],
        });
      },
    )
    .subscribe();

  return questsChannel;
}
