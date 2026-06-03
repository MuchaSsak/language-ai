import type { ResendParams } from "@supabase/supabase-js";

import { supabase } from "@/services/supabase/client";

export type ResendEmailServiceProps = {
  credentials: ResendParams;
};

export default async function resendEmail({
  credentials,
}: ResendEmailServiceProps) {
  const { error } = await supabase.auth.resend(credentials);

  if (error) throw error;
}
