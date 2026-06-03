import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useConfetti } from "@/contexts/ConfettiContext";
import { CONTACT_EMAIL } from "@/lib/constants";
import { hookLog } from "@/lib/utils";
import updateProfile, {
  UpdateProfileServiceProps,
} from "@/services/profiles/updateProfile";
import { queryClient } from "@/services/tanstack-query/client";

function useUpdateProfile() {
  const { t } = useLingui();
  const confetti = useConfetti();
  const { profile } = useAuth();

  const mutation = useMutation({
    mutationKey: ["updateProfile", profile?.id],
    mutationFn: (
      props: Omit<UpdateProfileServiceProps, "userId"> & {
        isErrorToast?: boolean;
        isSuccessToast?: boolean;
        isConfetti?: boolean;
        onSuccess?: () => void;
      },
    ) => {
      if (!profile)
        throw new Error(
          `${t`Uh oh, you are not signed in yet!`} (useUpdateProfile)`,
        );

      return updateProfile({
        ...props,
        userId: profile.user_id,
      });
    },

    onError(error, { isErrorToast = false }) {
      console.error(error);

      if (isErrorToast)
        toast({
          type: "error",
          text1: `${t`Uh oh, something went wrong while trying to update your profile.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
          text2: error.message,
        });
    },

    onSuccess(
      _,
      { isSuccessToast = false, isConfetti = false, onSuccess, newProfile },
    ) {
      hookLog("useUpdateProfile", newProfile);

      if (isSuccessToast)
        toast({
          type: "success",
          text1: t`Your new settings got saved! Nice!`,
        });

      if (isConfetti) confetti.restart();

      queryClient.invalidateQueries({ queryKey: ["getProfile"] });

      onSuccess?.();
    },
  });

  return mutation;
}

export default useUpdateProfile;
