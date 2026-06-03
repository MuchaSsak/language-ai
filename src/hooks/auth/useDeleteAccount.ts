import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";
import { useMMKV } from "react-native-mmkv";

import { toast } from "@/components/layout/providers/ToastProvider";
import { CONTACT_EMAIL } from "@/lib/constants";
import { hookLog } from "@/lib/utils";
import deleteAccount from "@/services/auth/deleteAccount";
import { queryClient } from "@/services/tanstack-query/client";

export default function useDeleteAccount() {
  const { t } = useLingui();
  const mmkv = useMMKV();

  const mutation = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: () => deleteAccount(),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: `${t`We couldn't delete your account right now.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
        text2: error.message,
      });
    },

    onSuccess() {
      hookLog("useDeleteAccount", null);

      toast({
        type: "success",
        text1: t`We've deleted your account and all of your data!`,
        text2: t`Consider signing up again to reach your goals in language learning!`,
      });

      queryClient.invalidateQueries({ queryKey: ["getEarnings"] });
      queryClient.invalidateQueries({ queryKey: ["getEnrollments"] });
      queryClient.invalidateQueries({ queryKey: ["getProfile"] });

      mmkv.clearAll();
    },
  });

  return mutation;
}
