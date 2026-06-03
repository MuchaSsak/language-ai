import { PictureProps } from "@/components/taken-picture/Picture";
import { Image } from "expo-image";

type BlurredPictureProps = PictureProps & {};

export default function BlurredPicture({
  uri,
  width,
  height,
}: BlurredPictureProps) {
  return (
    <Image
      source={uri}
      blurRadius={1}
      priority="low"
      style={{
        height,
        width,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        zIndex: -10,
      }}
      contentFit="cover"
    />
  );
}
