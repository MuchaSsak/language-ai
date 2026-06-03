import { useCamera } from "@/contexts/CameraContext";
import { CameraView as ExpoCameraView } from "expo-camera";
import { forwardRef } from "react";

const CameraView = forwardRef<ExpoCameraView, any>((props, ref) => {
  const { cameraProps } = useCamera();

  return (
    <ExpoCameraView
      ref={ref}
      responsiveOrientationWhenOrientationLocked
      mode="picture"
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      {...cameraProps}
    />
  );
});

CameraView.displayName = "CameraView";

export default CameraView;
