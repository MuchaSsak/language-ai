import { toast } from "@/components/layout/providers/ToastProvider";
import { Theme } from "@/lib/theme";
import { supabase } from "@/services/supabase/client";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";
import { t } from "@lingui/core/macro";
import * as Crypto from "expo-crypto";
import { HeartCrack } from "lucide-react-native";

export type ListenDayStreaksServiceProps = {
  profile: Tables<"profiles">;
  THEME: Theme;
};

export function listenDayStreaks({
  profile,
  THEME,
}: ListenDayStreaksServiceProps) {
  const dayStreaksChannel = supabase
    .channel(`realtime:day_streaks:${profile.user_id}:${Crypto.randomUUID()}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "day_streaks",
        filter: `user_id=eq.${profile.user_id}`,
      },
      (payload) => {
        const newRow = payload.new as Tables<"day_streaks">;

        const dayStreak = profile.day_streak;

        if (newRow.is_completed) {
          toast({
            type: "day-streak",
            props: {
              icon_asset: require("@/assets/gifs/fire.gif"),
              icon_style: { width: 64, height: 80 },
            },
            text1: t`${dayStreak} day streak and counting! Keep it up!`,
          });
        } else {
          toast({
            type: "info",
            props: {
              icon_element: () => <HeartCrack size={26} color={THEME.white} />,
            },
            text1: t`Oh no! You didn't manage to keep your day streak... 🙁`,
            text2: t`It's okay! You'll get it next time!`,
          });
        }

        queryClient.invalidateQueries({
          queryKey: ["getDayStreaks"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getProfile"],
        });
      },
    )
    .subscribe();

  return dayStreaksChannel;
}
