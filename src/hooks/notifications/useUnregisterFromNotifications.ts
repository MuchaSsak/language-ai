import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { CONTACT_EMAIL } from "@/lib/constants";
import { hookLog } from "@/lib/utils";
import unregisterFromNotifications from "@/services/notifications/unregisterFromNotifications";
import { queryClient } from "@/services/tanstack-query/client";

function useUnregisterFromNotifications() {
  const { t } = useLingui();
  const { profile } = useAuth();

  const mutation = useMutation({
    mutationKey: ["unregisterFromNotifications", profile?.id],
    mutationFn: ({}: { isSilent?: boolean }) => {
      if (!profile)
        throw new Error(
          `${t`Uh oh, you are not signed in yet!`} (useUnregisterForNotifications)`,
        );

      return unregisterFromNotifications({ userId: profile.user_id });
    },

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: `${t`We couldn't unregister you from notifications right now.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
        text2: error.message,
      });
    },

    onSuccess(_, { isSilent }) {
      hookLog("useUnregisterFromNotifications", null);
      if (isSilent) return;

      toast({
        type: "success",
        text1: t`We've unregistered you from all notifications.`,
        //   TODO: microcopy
        text2: t`Toggle them back to not miss any opportunities to earn money!`,
      });
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
    },
  });

  return mutation;
}

export default useUnregisterFromNotifications;
