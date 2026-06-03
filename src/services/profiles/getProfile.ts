import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";

export default async function getProfile() {
  try {
    const { data, error } = await supabase.rpc("profiles_get_own");

    if (error) throw error;
    if (!data || !data?.[0]) return null;

    serviceLog("getProfile", data[0]);
    return data[0] as Tables<"profiles">;
  } catch (err) {
    console.error(err);
    return null;
  }
}
