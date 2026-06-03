import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";

export type PictureProps = {
  uri: string;
  width: number;
  height: number;
};

export default function Picture({ uri, width, height }: PictureProps) {
  const { width: viewportWidth } = useWindowDimensions();

  return (
    <Image
      priority="high"
      source={uri}
      style={{
        width: viewportWidth,
        aspectRatio: width / height,
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        zIndex: -5,
      }}
      contentFit="contain"
    />
  );
}
