import { toast } from "@/components/layout/providers/ToastProvider";
import { useConfetti } from "@/contexts/ConfettiContext";
import { CONTACT_EMAIL } from "@/lib/constants";
import { hookLog } from "@/lib/utils";
import purchaseSubscription, {
  PurchaseSubscriptionServiceProps,
} from "@/services/subscription/purchaseSubscription";
import { queryClient } from "@/services/tanstack-query/client";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

export default function usePurchaseSubscription() {
  const { t } = useLingui();
  const confetti = useConfetti();

  const mutation = useMutation({
    mutationKey: ["purchaseSubscription"],
    mutationFn: ({
      pkg,
    }: Partial<PurchaseSubscriptionServiceProps> & {
      onSuccess?: () => void;
    }) => {
      if (!pkg) throw new Error(t`No package was found...`);
      return purchaseSubscription({ pkg });
    },

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Uh oh, subscription was not purchased yet!`,
        text2: t`If this was unexpected, please contact us immediately at ${CONTACT_EMAIL}`,
      });
    },

    onSuccess(_, { onSuccess, pkg }) {
      hookLog("usePurchaseDescription", pkg);

      confetti.restart();
      toast({
        type: "success",
        text1: t`You've successfully invested money into your language learning aspirations!`,
        text2: t`It's a great choice you won't regret. We're glad to see you here!`,
      });

      onSuccess?.();
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["getSubscription"],
        exact: false,
      });
    },
  });

  return mutation;
}
