import { toast } from "@/components/layout/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import useNavigation from "@/hooks/utils/useNavigation";
import analyzePicture, {
  AnalyzePictureServiceProps,
} from "@/services/pictures/analyzePicture";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";

export default function useAnalyzePicture() {
  const { t } = useLingui();
  const { profile } = useAuth();
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationKey: ["analyzePicture", profile?.id],
    mutationFn: (props: Omit<AnalyzePictureServiceProps, "userId">) => {
      if (!profile)
        throw new Error(
          `${t`Uh oh, you are not signed in yet!`} (useAnalyzePicture)`,
        );

      return analyzePicture({ ...props, userId: profile.user_id });
    },

    onError(error) {
      console.error(error);

      toast({
        type: "error",
        text1: t`Oops, we couldn't analyze this picture for you!`,
        text2: error.message,
      });
    },

    onSuccess(data) {
      if (!data) return;
      navigation.navigate("AnalyzedPicture", { pictureId: data.id });
    },
  });

  return mutation;
}
