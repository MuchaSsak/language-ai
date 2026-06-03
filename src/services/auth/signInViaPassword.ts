import { supabase } from "@/services/supabase/client";

export type SignInViaPasswordServiceProps = {
  email: string;
  password: string;
};

export default async function signInViaPassword({
  email,
  password,
}: SignInViaPasswordServiceProps) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) throw error;
}
