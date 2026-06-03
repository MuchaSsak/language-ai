import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useConfetti } from "@/contexts/ConfettiContext";
import useNavigation from "@/hooks/utils/useNavigation";
import profileExportData from "@/services/profiles/profileExportData";
import { useLingui } from "@lingui/react/macro";

function useProfileExportData() {
  const { t } = useLingui();
  const confetti = useConfetti();
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationKey: ["profileExportData"],
    mutationFn: () => profileExportData(),

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oops, we couldn't export your data!`,
        text2: error.message,
      });
    },

    onSuccess() {
      confetti.restart();

      toast({
        type: "success",
        text1: t`Your data has been exported!`,
      });

      navigation.goHome();
    },
  });

  return mutation;
}

export default useProfileExportData;
