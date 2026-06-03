import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { hookLog } from "@/lib/utils";
import signInViaPassword, {
  SignInViaPasswordServiceProps,
} from "@/services/auth/signInViaPassword";
import { queryClient } from "@/services/tanstack-query/client";

export default function useSignInViaPassword() {
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["signInViaPassword"],
    mutationFn: (
      props: SignInViaPasswordServiceProps & { onSuccess?: () => void },
    ) => signInViaPassword(props),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Something went wrong whilst trying to sign in with a password. Are your credentials valid?`,
        text2: error.message,
      });
    },

    onSuccess(_, { onSuccess }) {
      hookLog("useSignInViaPassword", null);

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });

      toast({
        type: "success",
        text1: t`Welcome to my app!`,
      });

      onSuccess?.();
    },
  });

  return mutation;
}
