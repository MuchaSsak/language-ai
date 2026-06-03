import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useOnboarding } from "@/contexts/OnboardingContext";
import useConsent from "@/hooks/utils/useConsent";
import { getUserTimeZone, hookLog } from "@/lib/utils";
import signInViaApple from "@/services/auth/signInViaApple";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";

function useSignInViaApple() {
  const { t } = useLingui();
  const { onboardingState } = useOnboarding();
  const { consentRequired, consentMarketing, consentAnalytics } = useConsent();

  const mutation = useMutation({
    mutationKey: ["signInViaApple"],
    mutationFn: ({}: { onSuccess?: () => void }) =>
      signInViaApple({
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
        text1: t`Oh no! We couldn't sign you in via Apple...`,
        text2: error.message,
      });
    },

    onSuccess(_, { onSuccess }) {
      hookLog("useSignInViaApple", null);

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });

      onSuccess?.();
    },
  });

  return mutation;
}

export default useSignInViaApple;
