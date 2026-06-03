import useTheme from "@/hooks/utils/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { MeshGradientView } from "expo-mesh-gradient";

type SubscriptionBackgroundProps = {};

export default function SubscriptionBackground({}: SubscriptionBackgroundProps) {
  const { THEME, colorScheme } = useTheme();

  const colors = {
    light: [
      "#FFF9E5",
      "#FDE68A",
      THEME.background,
      THEME.background,
      "#FFBB7D",
      "#FFB347",
      THEME.background,
      "#FEF3C7",
      THEME.background,
    ],

    dark: [
      "#1A0900",
      "#5C1A00",
      "#FFD700",
      THEME.background,
      "#8B3101",
      "#F6E05E",
      THEME.background,
      "#1A0900",
      THEME.background,
    ],
  };

  return (
    <>
      {/* Mesh gradient */}
      <MeshGradientView
        style={{
          position: "absolute",
          right: -32,
          top: 0,
          width: "120%",
          height: 850,
          zIndex: -10,
          opacity: 0.8,
        }}
        columns={3}
        rows={3}
        smoothsColors
        colors={colors[colorScheme]}
        points={[
          [0.0, 0.0],
          [0.2, 0.0],
          [1.0, 0.0],
          [0.0, 0.5],
          [0.8, 0.3],
          [1.0, 0.5],
          [0.0, 1.0],
          [0.1, 0.8],
          [1.0, 1.0],
        ]}
      />

      {/* Top fade out */}
      <LinearGradient
        colors={[THEME.background, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 64,
          zIndex: -5,
        }}
      />

      {/* Bottom fade out */}
      <LinearGradient
        colors={[THEME.background, "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          marginTop: 550,
          width: "100%",
          height: 300,
          zIndex: -3,
        }}
      />
    </>
  );
}
