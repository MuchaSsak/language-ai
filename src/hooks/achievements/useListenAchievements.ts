import { listenAchievements } from "@/services/achievements/listenAchievements";
import { supabase } from "@/services/supabase/client";
import { useEffect } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useConfetti } from "@/contexts/ConfettiContext";
import useLanguage from "@/hooks/utils/useLanguage";
import useNavigation from "@/hooks/utils/useNavigation";

export default function useListenAchievements() {
  const { profile } = useAuth();
  const { displayLanguage } = useLanguage();
  const confetti = useConfetti();
  const navigation = useNavigation();

  useEffect(() => {
    if (!profile) return;

    const channel = listenAchievements({
      profile,
      confetti,
      navigation,
      displayLanguageLocale: displayLanguage.locale,
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile, displayLanguage.locale, confetti, navigation]);
}
