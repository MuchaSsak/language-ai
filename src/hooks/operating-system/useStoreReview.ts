import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import storeReview from "@/services/operating-system/storeReview";

export default function useStoreReview() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["storeReview"],
    mutationFn: () => storeReview(),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: error.message || t`Uh oh, something went wrong...`,
        text2: t`You can always submit a review by going to the store yourself though!`,
      });
    },

    onSuccess() {
      hookLog("useStoreReview", null);
    },
  });

  return mutation;
}
