import { toast } from "@/components/layout/providers/ToastProvider";
import { CONTACT_EMAIL } from "@/lib/constants";
import { hookLog } from "@/lib/utils";
import cancelSubscription, {
  CancelSubscriptionServiceProps,
} from "@/services/subscription/cancelSubscription";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

export default function useCancelSubscription() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["cancelSubscription"],
    mutationFn: (
      props: CancelSubscriptionServiceProps & {
        onSuccess?: () => void;
      },
    ) => cancelSubscription(props),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Uh oh, something went wrong while trying to cancel your subscription...`,
        text2: t`Please contact us immediately at ${CONTACT_EMAIL}`,
      });
    },

    onSuccess(_, { customerInfo, onSuccess }) {
      hookLog("useCancelSubscription", customerInfo?.managementURL);

      onSuccess?.();
    },
  });

  return mutation;
}
