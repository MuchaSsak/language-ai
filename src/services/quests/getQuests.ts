import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";

export default async function getQuests() {
  try {
    const { data, error } = await supabase
      .from("quests_users")
      .select(
        `
        *,
        ...quests_pool!quest_id(*)
        `,
      )
      .eq("is_active", true);

    if (error) throw error;

    serviceLog("getQuests", data);
    return data as (Tables<"quests_users"> & Tables<"quests_pool">)[];
  } catch (err) {
    console.error(err);
    return null;
  }
}
