import LoadingSpinner from "@/components/ui/loading-spinner";
import { Text } from "@/components/ui/text";
import { useCamera } from "@/contexts/CameraContext";
import useSavePicture from "@/hooks/pictures/useSavePicture";
import useTheme from "@/hooks/utils/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Trans } from "@lingui/react/macro";
import { HeaderButton } from "@react-navigation/elements";

type SavePictureHeaderButtonProps = {};

export default function SavePictureHeaderButton({}: SavePictureHeaderButtonProps) {
  const { THEME } = useTheme();
  const { picture } = useCamera();
  const { mutate: savePicture, isPending } = useSavePicture();

  if (!picture) return;

  return (
    <HeaderButton
      style={{ gap: 6 }}
      disabled={isPending}
      onPress={() => savePicture({ pictureUri: picture.uri })}
    >
      {isPending ? (
        <LoadingSpinner size={20} />
      ) : (
        <MaterialIcons name="save-alt" size={20} color={THEME.foreground} />
      )}

      <Text className="font-semibold">
        <Trans>Save</Trans>
      </Text>
    </HeaderButton>
  );
}
