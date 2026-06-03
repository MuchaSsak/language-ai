import { supabase } from "@/services/supabase/client";

export default async function deleteAccount() {
  const { error } = await supabase.rpc("profiles_delete_own");

  if (error) throw error;
}
