import { useCamera } from "@/contexts/CameraContext";
import { hookLog } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { useMutation } from "@tanstack/react-query";
import { CameraView } from "expo-camera";
import { RefObject } from "react";

export default function useCameraTakePicture(cameraRef: RefObject<CameraView>) {
  const { t } = useLingui();
  const { setPicture } = useCamera();

  const mutation = useMutation({
    mutationKey: ["cameraTakePicture"],
    mutationFn: () => {
      if (!cameraRef.current)
        throw new Error(t`Uh oh, the camera is not ready yet...`);

      return cameraRef.current.takePictureAsync({
        imageType: "jpg",
      });
    },

    onError(error) {
      console.error(error);
    },

    onSuccess(data) {
      hookLog("useCameraTakePicture", data);

      setPicture(data);
    },
  });

  return mutation;
}
