import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import setSession, { SetSessionServiceProps } from "@/services/auth/setSession";
import { queryClient } from "@/services/tanstack-query/client";

function useSetSession() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["setSession"],
    mutationFn: (props: SetSessionServiceProps) => setSession(props),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Uh oh, smething went wrong while trying to sign you in...`,
        text2: error.message,
      });
    },

    onSuccess(_, variables) {
      hookLog("useSetSession", variables);

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
  });

  return mutation;
}

export default useSetSession;
