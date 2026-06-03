import useTheme from "@/hooks/utils/useTheme";
import { MeshGradientView } from "expo-mesh-gradient";
import { StyleProp, ViewStyle } from "react-native";

type BannerBackgroundProps = { style?: StyleProp<ViewStyle> };

export default function BannerBackground({ style }: BannerBackgroundProps) {
  const { colorScheme } = useTheme();
  const colors = {
    light: [
      "#f7869d",
      "#fc9f87",
      "#fff5ac",
      "#f7869d",
      "#fdd164",
      "#ffbd73",
      "#fc9f87",
      "#f7869d",
      "#f7869d",
    ],

    dark: [
      "#f15272",
      "#f9704d",
      "#fef08a",
      "#f15272",
      "#fbbf24",
      "#ff9e33",
      "#f9704d",
      "#f15272",
      "#f15272",
    ],
  };

  return (
    <MeshGradientView
      style={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 225,
          zIndex: -10,
        },
        style,
      ]}
      columns={3}
      rows={3}
      colors={colors[colorScheme]}
      points={[
        [0.0, 0.0],
        [0.5, 0.0],
        [1.0, 0.0],
        [0.0, 0.5],
        [0.5, 0.5],
        [1.0, 0.5],
        [0.0, 1.0],
        [0.5, 1.0],
        [1.0, 1.0],
      ]}
    />
  );
}
