import { View } from "react-native";

import { Button } from "@/components/ui/button";
import useCameraTakePicture from "@/hooks/camera/useCameraTakePicture";
import { CameraView } from "expo-camera";
import { RefObject } from "react";

type SnapButtonProps = {
  cameraRef: RefObject<CameraView>;
};

export default function SnapButton({ cameraRef }: SnapButtonProps) {
  const { mutate: takePicture, isPending } = useCameraTakePicture(cameraRef);

  return (
    <Button
      variant="invisible"
      size="slim"
      className="border-4 border-white rounded-full size-16"
      enabled={!isPending}
      onPress={() => takePicture()}
    >
      <View className="bg-white border rounded-full border-black/75 size-14" />
    </Button>
  );
}
