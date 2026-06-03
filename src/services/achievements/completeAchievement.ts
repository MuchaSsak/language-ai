import { supabase } from "@/services/supabase/client";
import { Enums } from "@/typings/database.types";

export type CompleteAchievementServiceProps = {
  achievementType: Enums<"ACHIEVEMENT_TYPE">;
};

export default async function completeAchievement({
  achievementType,
}: CompleteAchievementServiceProps) {
  const { error } = await supabase.rpc("complete_achievement", {
    p_achievement_type: achievementType,
  });

  if (error) throw error;
}
