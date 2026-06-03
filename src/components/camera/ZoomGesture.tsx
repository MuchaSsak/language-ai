import { useCamera } from "@/contexts/CameraContext";
import { PropsWithChildren } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

type ZoomGestureProps = PropsWithChildren & {};

export default function ZoomGesture({ children }: ZoomGestureProps) {
  const { setZoom } = useCamera();
  const zoom = useSharedValue(0);
  const startZoom = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startZoom.value = zoom.value;
    })
    .onUpdate((event) => {
      const scaleMultiplier = event.scale - 1;
      const newZoom = startZoom.value + scaleMultiplier * 0.5;

      zoom.value = Math.min(Math.max(newZoom, 0), 1);
    });

  useAnimatedReaction(
    () => zoom.value,
    (nextValue, prevValue) => {
      if (nextValue !== prevValue) {
        runOnJS(setZoom)(nextValue);
      }
    },
  );

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <GestureDetector gesture={pinchGesture}>{children}</GestureDetector>
    </GestureHandlerRootView>
  );
}
