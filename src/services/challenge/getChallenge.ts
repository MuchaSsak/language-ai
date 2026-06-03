import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { TablesJoined } from "@/typings/database.types";

export default async function getChallenge() {
  try {
    const { data, error } = await supabase
      .from("quizes")
      .select(
        `
        *,
        study_sets (*) 
      `,
      )
      .eq("is_challenge", true)
      .neq("has_finished", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    serviceLog("getChallenge", data);
    return data as TablesJoined<"quizes", "study_sets">;
  } catch (err) {
    console.error(err);
    return null;
  }
}
