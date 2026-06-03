import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useConfetti } from "@/contexts/ConfettiContext";
import { hookLog } from "@/lib/utils";
import shareText, {
  ShareFileServiceProps,
} from "@/services/operating-system/shareText";

export default function useShareText() {
  const { t } = useLingui();
  const confetti = useConfetti();

  const mutation = useMutation({
    mutationKey: ["shareText"],
    mutationFn: (
      props: ShareFileServiceProps & {
        onSuccess?: () => void;
      },
    ) => shareText(props),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: error.message,
      });
    },

    onSuccess(_, { onSuccess, textContents }) {
      hookLog("useShareText", textContents);
      confetti.restart();

      toast({
        type: "success",
        text1: t`Shared successfully! Hooray!`,
      });

      onSuccess?.();
    },
  });

  return mutation;
}
