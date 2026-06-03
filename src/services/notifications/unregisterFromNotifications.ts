import { supabase } from "@/services/supabase/client";
import { TablesUpdate } from "@/typings/database.types";
import * as Notifications from "expo-notifications";

export type UnregisterForNotificationsServiceProps = {
  userId: string;
};

export default async function unregisterForNotifications({
  userId,
}: UnregisterForNotificationsServiceProps) {
  // 1) Unregister on device
  await Notifications.unregisterForNotificationsAsync();

  // 2) Unregister on database
  const { error: errorUpdateProfile } = await supabase
    .from("profiles")
    .update({ expo_push_token: null } as TablesUpdate<"profiles">)
    .eq("user_id", userId);

  if (errorUpdateProfile) throw errorUpdateProfile;
}
