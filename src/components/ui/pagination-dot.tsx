import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

type PaginationDotProps = {
  index: number;
  progress: SharedValue<number>;
  total: number;
};

export default function PaginationDot({
  index,
  progress,
  total,
}: PaginationDotProps) {
  const dotStyle = useAnimatedStyle(() => {
    const distance = Math.abs((progress.value % total) - index);
    const adjustedDistance = Math.min(distance, total - distance);
    const opacity = interpolate(adjustedDistance, [0, 1], [1, 0.3]);

    return { opacity };
  });

  return (
    <Animated.View
      style={dotStyle}
      className="w-2 h-2 rounded-full bg-foreground"
    />
  );
}
