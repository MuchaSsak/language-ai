import { toast } from "@/components/layout/providers/ToastProvider";
import { CustomNavigationObject } from "@/hooks/utils/useNavigation";
import { SupportedLanguage } from "@/lib/locales";
import getAchievements from "@/services/achievements/getAchievements";
import { supabase } from "@/services/supabase/client";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";
import { t } from "@lingui/core/macro";
import * as Crypto from "expo-crypto";
import { ConfettiMethods } from "react-native-fast-confetti";

export type ListenAchievementsServiceProps = {
  profile: Tables<"profiles">;
  confetti: ConfettiMethods;
  displayLanguageLocale: SupportedLanguage;
  navigation: CustomNavigationObject;
};

export function listenAchievements({
  confetti,
  profile,
  displayLanguageLocale,
  navigation,
}: ListenAchievementsServiceProps) {
  const achievementsChannel = supabase
    .channel(
      `realtime:user_achievements:${profile.user_id}:${Crypto.randomUUID()}`,
    )
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "achievements_users",
        filter: `user_id=eq.${profile.user_id}`,
      },
      async (payload) => {
        const newRow = payload.new as Tables<"achievements_users">;

        const newAchievementId = newRow.achievement_id;
        const achievements = await getAchievements();
        if (!achievements?.length) return;

        const newAchievement = achievements.find(
          (a) => a.id === newAchievementId,
        );
        if (!newAchievement?.id) return;

        // Toast
        const { name, icon_url, rarity, xp_gain } = newAchievement;
        const title = name[displayLanguageLocale];

        toast({
          type: "achievement",
          text1: t`Congratulations! You've just earned the "${title}" achievement!`,
          props: {
            icon_url,
            xp_gain,
            rarity,
          },
          onPress: () => navigation.navigate("Achievements"),
        });
        confetti.restart();

        queryClient.invalidateQueries({
          queryKey: ["getAchievements"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getProfile"],
        });
      },
    )
    .subscribe();

  return achievementsChannel;
}
