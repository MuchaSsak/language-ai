import { toast } from "@/components/layout/providers/ToastProvider";
import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";
import { t } from "@lingui/core/macro";
import * as Crypto from "expo-crypto";

export type listenLiveNotificationsServiceProps = {
  profile: Tables<"profiles">;
};

export function listenLiveNotifications({
  profile,
}: listenLiveNotificationsServiceProps) {
  const liveNotificationsChannel = supabase
    .channel(
      `realtime:user_live_notifications:${profile.user_id}:${Crypto.randomUUID()}`,
    )
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "live_notifications",
        filter: `user_id=eq.${profile.user_id}`,
      },
      async (payload) => {
        const newRow = payload.new as Tables<"live_notifications">;

        // Toast
        const { message, type } = newRow;

        toast({
          type: "live-notification",
          props: {
            live_notification_type: type,
          },
          text1: message,
          text2: t`This was sent to you by a Linkoglot administrator 👀`,
          visibilityTime: 8000,
        });
      },
    )
    .subscribe();

  return liveNotificationsChannel;
}
