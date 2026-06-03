import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import openNotificationsSettings from "@/services/notifications/openNotificationsSettings";

export default function useOpenNotificationsSettings() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["openNotificationsSettings"],
    mutationFn: () => openNotificationsSettings(),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Uh oh, something went wrong while trying to open your device settings...`,
        text2: error.message,
      });
    },

    onSuccess() {
      hookLog("openNotificationsSettings", null);
    },
  });

  return mutation;
}
