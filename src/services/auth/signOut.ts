import { supabase } from "@/services/supabase/client";

export default async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
