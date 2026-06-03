import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import useSetSession from "@/hooks/auth/useSetSession";
import { hookLog } from "@/lib/utils";
import createSessionFromURL, {
  CreateSessionFromURLServiceProps,
} from "@/services/auth/createSessionFromURL";
import { queryClient } from "@/services/tanstack-query/client";

export default function useCreateSessionFromURL() {
  const { mutate: setSession } = useSetSession();
  const { t } = useLingui();

  const mutation = useMutation({
    mutationKey: ["createSessionFromURL"],
    mutationFn: (props: Omit<CreateSessionFromURLServiceProps, "setSession">) =>
      createSessionFromURL({ ...props, setSession }),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Uh oh, something went wrong while trying to sign you in...`,
        text2: error.message,
      });
    },

    onSuccess(_, variables) {
      hookLog("createSessionFromURL", variables);

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
  });

  return mutation;
}
