import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import signOut from "@/services/auth/signOut";
import { queryClient } from "@/services/tanstack-query/client";

export default function useSignOut() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["signOut"],
    mutationFn: ({}: { onSuccess?: () => void; isSilent?: boolean }) =>
      signOut(),

    onError(error, { isSilent = false }) {
      console.error(error);

      if (!isSilent)
        toast({
          type: "error",
          text1: t`Uh oh, something went wrong while trying to sign you out...`,
          text2: error.message,
        });
    },

    onSuccess(_, { isSilent = false, onSuccess }) {
      hookLog("useSignOut", null);

      if (!isSilent)
        toast({
          type: "success",
          text1: t`We'll miss you! Come back soon!`,
        });

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });

      onSuccess?.();
    },
  });

  return mutation;
}
