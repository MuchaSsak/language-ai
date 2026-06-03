import useGetAnalyzedPicture from "@/hooks/pictures/useGetAnalyzedPicture";
import { NavigationRouteParams } from "@/navigation";
import { View } from "react-native";

export type AnalyzedPictureModalProps =
  NavigationRouteParams<"AnalyzedPicture"> & {};

export default function AnalyzedPictureModal({
  route: {
    params: { pictureId },
  },
}: AnalyzedPictureModalProps) {
  const { data: picture, isLoading } = useGetAnalyzedPicture(pictureId);

  return <View className="flex-1">{/* <BlurredPicture/> */}</View>;
}
