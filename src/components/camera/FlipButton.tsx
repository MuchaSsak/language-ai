import { Button } from "@/components/ui/button";
import { useCamera } from "@/contexts/CameraContext";
import useCameraButtonsRotations from "@/hooks/camera/useCameraButtonsRotations";
import useTheme from "@/hooks/utils/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { EaseView } from "react-native-ease";

type FlipButtonProps = {};

export default function FlipButton({}: FlipButtonProps) {
  const { THEME } = useTheme();
  const { setFacing } = useCamera();
  const rotation = useCameraButtonsRotations();

  return (
    <EaseView
      animate={{ rotate: rotation }}
      transition={{ type: "timing", duration: 300 }}
    >
      <Button
        size="icon"
        variant="invisible"
        onPress={() => setFacing((old) => (old === "back" ? "front" : "back"))}
      >
        <MaterialIcons
          name="flip-camera-android"
          size={24}
          color={THEME.white}
        />
      </Button>
    </EaseView>
  );
}
