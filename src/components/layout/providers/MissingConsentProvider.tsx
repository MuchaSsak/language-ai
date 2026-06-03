import { PropsWithChildren, useEffect, useState } from "react";

import ConsentDialog from "@/components/ui/consent-dialog";
import { useAuth } from "@/contexts/AuthContext";
import useGetLatestDocuments from "@/hooks/documents/useGetLatestDocuments";
import useConsent from "@/hooks/utils/useConsent";
import useNavigation from "@/hooks/utils/useNavigation";
import { checkIsOutdatedDocumentsConsent } from "@/lib/utils";

type MissingConsentProviderProps = PropsWithChildren & {};

export default function MissingConsentProvider({
  children,
}: MissingConsentProviderProps) {
  const [{ isOpen, isOutdated }, setConsentDialog] = useState<{
    isOpen: boolean;
    isOutdated?: boolean;
  }>({ isOpen: false, isOutdated: false });
  const { data: latestDocuments } = useGetLatestDocuments();
  const navigation = useNavigation();
  const { profile } = useAuth();
  const { hasConsentedRequired } = useConsent();

  useEffect(() => {
    // Wait for loading
    if (!profile) return;
    if (!latestDocuments) return;

    // Missing required consent completely as an authenticated person
    if (!hasConsentedRequired) {
      setConsentDialog({ isOpen: true, isOutdated: false });
      return;
    }

    // Is consent required outdated
    if (profile.consent_required) {
      const privacyPolicy = profile.consent_required.privacy_policy_version;
      const termsAndConditions =
        profile.consent_required.terms_and_conditions_version;

      const isOutdatedPrivacyPolicy = checkIsOutdatedDocumentsConsent(
        privacyPolicy,
        latestDocuments.privacyPolicy.version,
      );
      const isOutdatedTermsAndConditions = checkIsOutdatedDocumentsConsent(
        termsAndConditions,
        latestDocuments.termsAndConditions.version,
      );
      const isOutdated =
        isOutdatedPrivacyPolicy || isOutdatedTermsAndConditions;

      if (isOutdated) {
        setConsentDialog({ isOpen: true, isOutdated: true });
        return;
      }
    }

    // Is consent marketing outdated
    if (profile.consent_marketing?.accepted_optional_marketing) {
      const privacyPolicy = profile.consent_marketing.privacy_policy_version;
      const termsAndConditions =
        profile.consent_marketing.terms_and_conditions_version;

      const isOutdatedPrivacyPolicy = checkIsOutdatedDocumentsConsent(
        privacyPolicy,
        latestDocuments.privacyPolicy.version,
      );
      const isOutdatedTermsAndConditions = checkIsOutdatedDocumentsConsent(
        termsAndConditions,
        latestDocuments.termsAndConditions.version,
      );
      const isOutdated =
        isOutdatedPrivacyPolicy || isOutdatedTermsAndConditions;

      if (isOutdated) {
        setConsentDialog({ isOpen: true, isOutdated: true });
        return;
      }
    }

    // Is consent analytics outdated
    if (profile.consent_analytics?.accepted_optional_analytics) {
      const privacyPolicy = profile.consent_analytics.privacy_policy_version;
      const termsAndConditions =
        profile.consent_analytics.terms_and_conditions_version;

      const isOutdatedPrivacyPolicy = checkIsOutdatedDocumentsConsent(
        privacyPolicy,
        latestDocuments.privacyPolicy.version,
      );
      const isOutdatedTermsAndConditions = checkIsOutdatedDocumentsConsent(
        termsAndConditions,
        latestDocuments.termsAndConditions.version,
      );
      const isOutdated =
        isOutdatedPrivacyPolicy || isOutdatedTermsAndConditions;

      if (isOutdated) {
        setConsentDialog({ isOpen: true, isOutdated: true });
        return;
      }
    }
  }, [hasConsentedRequired, latestDocuments, profile]);

  return (
    <>
      <ConsentDialog
        isOpen={isOpen && !(navigation.getRouteName() === "Onboarding")}
        setIsOpen={(newOpen: boolean) => setConsentDialog({ isOpen: newOpen })}
        isOutdated={isOutdated}
        hasCancelButton={false}
      />

      {children}
    </>
  );
}
