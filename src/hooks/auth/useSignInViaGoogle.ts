import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useOnboarding } from "@/contexts/OnboardingContext";
import useConsent from "@/hooks/utils/useConsent";
import { getUserTimeZone, hookLog } from "@/lib/utils";
import signInViaGoogle from "@/services/auth/signInViaGoogle";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";

function useSignInViaGoogle() {
  const { t } = useLingui();
  const { onboardingState } = useOnboarding();
  const { consentRequired, consentMarketing, consentAnalytics } = useConsent();

  const mutation = useMutation({
    mutationKey: ["signInViaGoogle"],
    mutationFn: ({}: { onSuccess?: () => void }) =>
      signInViaGoogle({
        timeZone: getUserTimeZone(),
        consentRequired:
          consentRequired as Tables<"profiles">["consent_required"],
        consentMarketing: consentMarketing as
          | Tables<"profiles">["consent_marketing"]
          | undefined,
        consentAnalytics: consentAnalytics as
          | Tables<"profiles">["consent_analytics"]
          | undefined,
        onboardingState,
      }),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oh no! We couldn't sign you in via Google...`,
        text2: error.message,
      });
    },

    onSuccess(_, { onSuccess }) {
      hookLog("useSignInViaGoogle", null);

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });

      onSuccess?.();
    },
  });

  return mutation;
}

export default useSignInViaGoogle;
