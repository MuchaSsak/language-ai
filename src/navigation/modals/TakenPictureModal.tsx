import AnalyzeButton from "@/components/taken-picture/AnalyzeButton";
import BlurredPicture from "@/components/taken-picture/BlurredPicture";
import Picture from "@/components/taken-picture/Picture";
import { NavigationRouteParams } from "@/navigation";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { View } from "react-native";

export type TakenPictureModalProps = NavigationRouteParams<"TakenPicture"> & {};

export default function TakenPictureModal({ route }: TakenPictureModalProps) {
  return (
    <View className="flex-1">
      <BlurredPicture {...route.params} />
      <Zoomable doubleTapScale={3} isSingleTapEnabled isDoubleTapEnabled>
        <Picture {...route.params} />
      </Zoomable>
      <AnalyzeButton />
    </View>
  );
}
