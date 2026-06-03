import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/layout/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { useConfetti } from "@/contexts/ConfettiContext";
import useNavigation from "@/hooks/utils/useNavigation";
import { CONTACT_EMAIL } from "@/lib/constants";
import { hookLog } from "@/lib/utils";
import createReport, {
  CreateReportServiceProps,
} from "@/services/reports/createReport";

function useCreateReport() {
  const { t } = useLingui();
  const { profile } = useAuth();
  const confetti = useConfetti();
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationKey: ["createReport", profile?.id],
    mutationFn: ({
      newReport,
    }: Omit<CreateReportServiceProps, "newReport"> & {
      newReport: Omit<CreateReportServiceProps["newReport"], "user_id">;
    }) => {
      if (!profile)
        throw new Error(
          `${t`Uh oh, you are not signed in yet!`} (useCreateReport)`,
        );

      return createReport({
        newReport: {
          ...newReport,
          user_id: profile.user_id,
        },
      });
    },

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: `${t`Oh no! We couldn't send the report.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
        text2: error.message,
      });
    },

    onSuccess(_, variables) {
      hookLog("useCreateReport", variables);
      confetti.restart();

      toast({
        type: "success",
        text1: t`You've just helped us improve! Thank you!`,
      });

      navigation.goBack();
    },
  });

  return mutation;
}

export default useCreateReport;
