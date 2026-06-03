import { toast } from "@/components/layout/providers/ToastProvider";
import savePicture from "@/services/pictures/savePicture";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

export default function useSavePicture() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["savePicture"],
    mutationFn: savePicture,

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oops, we couldn't save the picture to your device's storage!`,
        text2: error.message,
      });
    },

    onSuccess() {
      toast({
        type: "success",
        text1: t`Your picture has been saved!`,
      });
    },
  });

  return mutation;
}
