import { useAuth } from "@/contexts/AuthContext";
import { listenLiveNotifications } from "@/services/live-notifications/listenLiveNotifications";
import { supabase } from "@/services/supabase/client";
import { useEffect } from "react";

export default function useListenLiveNotifications() {
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile?.user_id) return;

    const channel = listenLiveNotifications({
      profile,
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);
}
