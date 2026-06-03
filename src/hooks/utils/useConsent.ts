import { useLingui } from "@lingui/react/macro";
import { useMMKVObject } from "react-native-mmkv";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useConfetti } from "@/contexts/ConfettiContext";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useLanguage from "@/hooks/utils/useLanguage";
import { getConsentObject } from "@/lib/utils";
import { LatestDocuments } from "@/services/documents/getLatestDocuments";
import { Tables } from "@/typings/database.types";
import { useEffect } from "react";

function useConsent() {
  const { displayLanguage } = useLanguage();
  const { mutate: updateProfile, isPending: isSyncing } = useUpdateProfile();
  const confetti = useConfetti();
  const { isAuthenticated } = useAuth();
  const { t } = useLingui();

  /**
   * MMKV
   */
  const [mmkvConsentRequired, setMmkvConsentRequired] = useMMKVObject(
    "consent_required",
  ) as [
    Tables<"profiles">["consent_required"] | undefined,
    (newConsent: Tables<"profiles">["consent_required"]) => void,
  ];
  const [mmkvConsentMarketing, setMmkvConsentMarketing] = useMMKVObject(
    "consent_marketing",
  ) as [
    Tables<"profiles">["consent_marketing"] | undefined,
    (newConsent: Tables<"profiles">["consent_marketing"]) => void,
  ];
  const [mmkvConsentAnalytics, setMmkvConsentAnalytics] = useMMKVObject(
    "consent_analytics",
  ) as [
    Tables<"profiles">["consent_analytics"] | undefined,
    (newConsent: Tables<"profiles">["consent_analytics"]) => void,
  ];

  const hasConsentedRequired = !!(
    mmkvConsentRequired?.accepted_privacy_policy &&
    mmkvConsentRequired?.accepted_terms_and_conditions
  );
  const hasConsentedMarketing =
    !!mmkvConsentMarketing?.accepted_optional_marketing;
  const hasConsentedAnalytics =
    !!mmkvConsentAnalytics?.accepted_optional_analytics;

  function handleToggleConsentMarketing(
    isCheckedMarketing: boolean,
    latestDocuments: LatestDocuments,
    isSilent = false,
  ): Tables<"profiles">["consent_marketing"] {
    const consentObjectMarketing = getConsentObject(
      isCheckedMarketing ? "marketing-opt-in" : "marketing-opt-out",
      displayLanguage.locale,
      latestDocuments.termsAndConditions.version,
      latestDocuments.privacyPolicy.version,
    ) as Tables<"profiles">["consent_marketing"];

    setMmkvConsentMarketing(consentObjectMarketing);

    if (isSilent) return consentObjectMarketing;
    if (isCheckedMarketing) {
      toast({
        type: "success",
        //   TODO: Microcopy
        text1: t`Congratulations! You have successfully signed up for our promotional marketing!`,
        text2: t`Now you won't miss any new and fantastic opportunities!`,
      });
      confetti.restart();
    } else {
      toast({
        type: "info",
        text1: t`Consider consenting to our promotional marketing again to always be up to date!`,
      });
    }

    return consentObjectMarketing;
  }

  function handleToggleConsentAnalytics(
    isCheckedAnalytics: boolean,
    latestDocuments: LatestDocuments,
    isSilent = false,
  ): Tables<"profiles">["consent_analytics"] {
    const consentObjectAnalytics = getConsentObject(
      isCheckedAnalytics ? "analytics-opt-in" : "analytics-opt-out",
      displayLanguage.locale,
      latestDocuments.termsAndConditions.version,
      latestDocuments.privacyPolicy.version,
    ) as Tables<"profiles">["consent_analytics"];

    setMmkvConsentAnalytics(consentObjectAnalytics);

    if (isSilent) return consentObjectAnalytics;
    if (isCheckedAnalytics) {
      toast({
        type: "success",
        //   TODO: Microcopy
        text1: t`Congratulations! You have successfully signed up for our analytics lol!`,
        text2: t`Now you won't miss any new and fantastic opportunities!`,
      });
      confetti.restart();
    } else {
      toast({
        type: "info",
        text1: t`Consider consenting to our promotional marketing again to always be up to date!`,
      });
    }

    return consentObjectAnalytics;
  }

  function handleToggleConsentRequired(
    isCheckedRequired: boolean,
    latestDocuments: LatestDocuments,
  ): Tables<"profiles">["consent_required"] | undefined {
    if (!isCheckedRequired) return;

    const consentObjectRequired = getConsentObject(
      "required",
      displayLanguage.locale,
      latestDocuments.termsAndConditions.version,
      latestDocuments.privacyPolicy.version,
    ) as Tables<"profiles">["consent_required"];

    setMmkvConsentRequired(consentObjectRequired);

    return consentObjectRequired;
  }

  /**
   * Sync with database
   */
  useEffect(() => {
    if (!isAuthenticated) return;
    updateProfile({
      newProfile: {
        consent_analytics: mmkvConsentAnalytics?.accepted_optional_analytics
          ? mmkvConsentAnalytics
          : null,
        consent_marketing: mmkvConsentMarketing?.accepted_optional_marketing
          ? mmkvConsentMarketing
          : null,
        consent_required:
          mmkvConsentRequired?.accepted_privacy_policy &&
          mmkvConsentRequired.accepted_terms_and_conditions
            ? mmkvConsentRequired
            : null,
      },
    });
  }, [
    mmkvConsentMarketing?.accepted_optional_marketing,
    mmkvConsentRequired?.accepted_privacy_policy,
    mmkvConsentRequired?.accepted_terms_and_conditions,
    mmkvConsentAnalytics?.accepted_optional_analytics,
    mmkvConsentAnalytics,
    mmkvConsentMarketing,
    mmkvConsentRequired,
    updateProfile,
    isAuthenticated,
  ]);

  return {
    consentMarketing: mmkvConsentMarketing,
    consentRequired: mmkvConsentRequired,
    consentAnalytics: mmkvConsentAnalytics,

    hasConsentedRequired,
    hasConsentedMarketing,
    hasConsentedAnalytics,

    handleToggleConsentRequired,
    handleToggleConsentMarketing,
    handleToggleConsentAnalytics,

    isSyncing,
  };
}

export default useConsent;
