import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { hookLog } from "@/lib/utils";
import registerForNotifications from "@/services/notifications/registerForNotifications";
import { queryClient } from "@/services/tanstack-query/client";
import { useLingui } from "@lingui/react/macro";

function useRegisterForNotifications() {
  const { t } = useLingui();
  const { profile } = useAuth();

  const mutation = useMutation({
    mutationKey: ["registerForNotifications", profile?.id],
    mutationFn: ({
      hasConsentedMarketing,
    }: {
      hasConsentedMarketing: boolean;
      isSilent?: boolean;
    }) => {
      if (!profile)
        throw new Error(
          `${t`Uh oh, you are not signed in yet!`} (useRegisterForNotifications)`,
        );
      if (!hasConsentedMarketing)
        throw new Error(
          `${t`Oops, you have to submit consent first!`} (useRegisterForNotifications)`,
        );

      return registerForNotifications({ userId: profile.user_id });
    },

    onError(error) {
      console.error(error);
    },

    onSuccess(_, { isSilent }) {
      hookLog("useRegisterForNotifications", null);
      if (isSilent) return;

      toast({
        type: "success",
        text1: t`We've successfully enabled notifications for you!`,
        text2: t`Now you'll surely learn the language in no time!`,
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

export default useRegisterForNotifications;
