import { useAuth } from "@/contexts/AuthContext";
import { useConfetti } from "@/contexts/ConfettiContext";
import useLanguage from "@/hooks/utils/useLanguage";
import useTheme from "@/hooks/utils/useTheme";
import { listenQuests } from "@/services/quests/listenQuests";
import { supabase } from "@/services/supabase/client";
import { useEffect } from "react";

export default function useListenQuests() {
  const { THEME } = useTheme();
  const { profile } = useAuth();
  const { displayLanguage } = useLanguage();
  const confetti = useConfetti();

  useEffect(() => {
    if (!profile?.user_id) return;

    const channel = listenQuests({
      profile,
      confetti,
      displayLanguageLocale: displayLanguage.locale,
      THEME,
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile, displayLanguage.locale, confetti, THEME]);
}
