import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";
import { useCameraPermissions as useExpoCameraPermissions } from "expo-camera";

export default function useCameraPermissions() {
  const { t } = useLingui();
  const [permission, requestPermission] = useExpoCameraPermissions();

  const mutation = useMutation({
    mutationKey: ["requestCameraPermissions"],
    mutationFn: () => requestPermission(),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oops, we still didn't get the access!`,
        text2: error?.message,
      });
    },

    onSuccess() {
      hookLog("useCameraPermissions", null);
    },
  });

  return { permission, ...mutation };
}
