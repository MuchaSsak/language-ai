import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";

export default async function getAchievements() {
  try {
    const { data, error } = await supabase.rpc("get_achievements", {});

    if (error) throw error;

    return data as Tables<"rpc_achievements">[];
  } catch (err) {
    console.error(err);
    return null;
  }
}
