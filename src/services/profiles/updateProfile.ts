import { supabase } from "@/services/supabase/client";
import { TablesUpdate } from "@/typings/database.types";

export type UpdateProfileServiceProps = {
  userId: string;
  newProfile: TablesUpdate<"profiles">;
};

export default async function updateProfile({
  userId,
  newProfile,
}: UpdateProfileServiceProps) {
  const { error } = await supabase
    .from("profiles")
    .update(newProfile)
    .eq("user_id", userId);

  if (error) throw error;
}
