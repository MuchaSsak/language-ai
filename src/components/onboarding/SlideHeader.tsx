import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { View } from "react-native";

type SlideHeaderProps = {
  title: string;
  subtitle?: string;
  isCenter?: boolean;
  titleClassName?: string;
};

export default function SlideHeader({
  title,
  subtitle,
  isCenter,
  titleClassName,
}: SlideHeaderProps) {
  return (
    <View className="gap-2 pb-4">
      <Text
        className={cn(
          "text-3xl font-bold",
          isCenter ? "text-center text-2xl" : "",
          titleClassName,
        )}
      >
        {title}
      </Text>
      {subtitle && (
        <Text className={cn(isCenter ? "text-center" : "")}>{subtitle}</Text>
      )}
    </View>
  );
}
