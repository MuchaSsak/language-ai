import CameraView from "@/components/camera/CameraView";
import FlashlightButton from "@/components/camera/FlashlightButton";
import FlipButton from "@/components/camera/FlipButton";
import LoadingPermission from "@/components/camera/LoadingPermission";
import PickImage from "@/components/camera/PickImage";
import RequestPermission from "@/components/camera/RequestPermission";
import SnapButton from "@/components/camera/SnapButton";
import ZoomGesture from "@/components/camera/ZoomGesture";
import ZoomIndicator from "@/components/camera/ZoomIndicator";
import { useCamera } from "@/contexts/CameraContext";
import useNavigation from "@/hooks/utils/useNavigation";

import { CameraView as ExpoCameraView } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { RefObject, useEffect, useRef } from "react";
import { View } from "react-native";

export default function CameraTab() {
  const { isPermissionGranted, permission, picture } = useCamera();
  const cameraRef = useRef<ExpoCameraView>(null);
  const navigation = useNavigation() as any;

  useEffect(() => {
    if (picture) return navigation.navigate("TakenPicture", { ...picture });
  }, [picture, navigation]);

  if (!permission) return <LoadingPermission />;
  if (!isPermissionGranted) return <RequestPermission />;

  return (
    <>
      <StatusBar style="light" />

      <ZoomGesture>
        <View className="flex-1">
          <CameraView ref={cameraRef} />

          <View className="justify-between flex-1">
            {/* Top buttons */}
            <View className="flex-row items-center justify-end px-8 pt-12 pb-6 bg-black/75">
              <FlashlightButton />
            </View>

            {/* Bottom buttons */}
            <View className="items-center gap-4">
              <ZoomIndicator />

              <View className="flex-row items-center justify-between w-full px-8 py-4 pb-28 bg-black/75">
                <PickImage />
                <SnapButton
                  cameraRef={cameraRef as RefObject<ExpoCameraView>}
                />
                <FlipButton />
              </View>
            </View>
          </View>
        </View>
      </ZoomGesture>
    </>
  );
}
