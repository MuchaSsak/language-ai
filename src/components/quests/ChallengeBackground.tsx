import useTheme from "@/hooks/utils/useTheme";
import { LinearGradient } from "expo-linear-gradient";

type ChallengeBackgroundProps = {};

export default function ChallengeBackground({}: ChallengeBackgroundProps) {
  const { THEME, colorScheme } = useTheme();

  const colors = {
    light: [THEME.yellow[200], THEME.amber[500]],
    dark: [THEME.yellow[200], THEME.amber[600]],
  } as const;

  return (
    <LinearGradient
      colors={colors[colorScheme]}
      style={{ position: "absolute", inset: 0, zIndex: -10 }}
    />
  );
}
