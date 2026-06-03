import useScreenOrientation from "@/hooks/utils/useScreenOrientation";
import * as ScreenOrientation from "expo-screen-orientation";
import { useState } from "react";

export default function useCameraButtonsRotations() {
  const [rotation, setRotation] = useState(0);
  useScreenOrientation((e) =>
    setRotation(getRotationDegrees(e.orientationInfo.orientation)),
  );

  function getRotationDegrees(orientation: ScreenOrientation.Orientation) {
    switch (orientation) {
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return -90;
      default:
        return 0;
    }
  }

  return rotation;
}
