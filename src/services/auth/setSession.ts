import { supabase } from "@/services/supabase/client";

export type SetSessionServiceProps = {
  access_token: string;
  refresh_token: string;
};

export default async function setSession({ ...props }: SetSessionServiceProps) {
  const { data, error: signInError } = await supabase.auth.setSession({
    ...props,
  });

  if (signInError) throw signInError;

  return data;
}
