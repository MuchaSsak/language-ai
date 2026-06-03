import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";

function useCopyToClipboard() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["copyToClipboard"],
    mutationFn: (stringToCopy: string) =>
      Clipboard.setStringAsync(stringToCopy),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oh no! We couldn't copy the text to your clipboard!`,
        text2: error.message,
      });
    },

    onSuccess(_, stringToCopy) {
      hookLog("useCopyToClipboard", stringToCopy);

      toast({
        type: "success",
        text1: t`Copied the text to your clipboard!`,
      });
    },
  });

  return mutation;
}

export default useCopyToClipboard;
