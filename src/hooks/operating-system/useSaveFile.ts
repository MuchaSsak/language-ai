import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useConfetti } from "@/contexts/ConfettiContext";
import { hookLog } from "@/lib/utils";
import saveFile, {
  SaveFileServiceProps,
} from "@/services/operating-system/saveFile";

export default function useSaveFile() {
  const { t } = useLingui();
  const confetti = useConfetti();

  const mutation = useMutation({
    mutationKey: ["saveFile"],
    mutationFn: (
      props: SaveFileServiceProps & {
        onSuccess?: () => void;
      },
    ) => saveFile(props),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oh no! We couldn't save this file for you...`,
        text2: error.message,
      });
    },

    onSuccess({ type }, { onSuccess, textContents }) {
      hookLog("useSaveFile", textContents);
      confetti.restart();

      switch (type) {
        case "copied": {
          toast({
            type: "success",
            text1: t`Your file has been copied!`,
          });
          break;
        }

        case "shared": {
          toast({
            type: "success",
            text1: t`Your file has been shared!`,
          });
          break;
        }

        default: {
          toast({
            type: "success",
            text1: t`Your file has been saved!`,
          });
          break;
        }
      }

      onSuccess?.();
    },
  });

  return mutation;
}
