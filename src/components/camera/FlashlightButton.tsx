import { Button } from "@/components/ui/button";
import { useCamera } from "@/contexts/CameraContext";
import useTheme from "@/hooks/utils/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlashMode } from "expo-camera";

type FlashlightButtonProps = {};

export default function FlashlightButton({}: FlashlightButtonProps) {
  const { THEME } = useTheme();
  const {
    cameraProps: { facing, flash },
    setFlash,
  } = useCamera();
  const FLASH_ORDER: FlashMode[] = ["auto", "on", "off"];

  function handleSetFlash() {
    if (facing === "front") {
      // Front camera only cares about Screen vs Off
      setFlash((prev) => (prev === "off" ? "screen" : "off"));
    } else {
      // Back camera cycles through the standard 3
      const currentIndex = FLASH_ORDER.indexOf(flash);
      const nextIndex = (currentIndex + 1) % FLASH_ORDER.length;
      setFlash(FLASH_ORDER[nextIndex]);
    }
  }

  return (
    <Button size="icon" variant="invisible" onPress={handleSetFlash}>
      {flash === "auto" && (
        <MaterialIcons name="flash-auto" size={24} color={THEME.white} />
      )}
      {(flash === "on" || flash === "screen") && (
        <MaterialIcons name="flash-on" size={24} color={THEME.white} />
      )}
      {flash === "off" && (
        <MaterialIcons name="flash-off" size={24} color={THEME.white} />
      )}
    </Button>
  );
}
