import { Text } from "@/components/ui/text";
import { useCamera } from "@/contexts/CameraContext";
import { View } from "react-native";

type ZoomIndicatorProps = {};

export default function ZoomIndicator({}: ZoomIndicatorProps) {
  const {
    cameraProps: { zoom },
  } = useCamera();

  const zoomString =
    zoom === 0 || zoom === 1
      ? zoom + "\u00d7"
      : (Math.floor(zoom * 10) / 10).toString().replace("0.", ".") + "\u00d7";

  return (
    <View
      style={{ transform: [{ scale: 1 + zoom / 20 }] }}
      className="items-center justify-center rounded-full size-10 bg-black/50"
    >
      <Text className="text-xs font-semibold text-primary">{zoomString}</Text>
    </View>
  );
}
