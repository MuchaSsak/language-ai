import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import Entypo from "@expo/vector-icons/Entypo";
import { PropsWithChildren, ReactNode } from "react";
import { Pressable, View } from "react-native";

type SettingsLinksSectionProps = PropsWithChildren & {
  links: {
    icon: ReactNode;
    label: string;
    onPress: () => void;
    className?: string;
    isDestructive?: boolean;
    isHidden?: boolean;
    isLoading?: boolean;
  }[];
  onPressText?: () => void;
};

export default function SettingsLinksSection({
  children,
  links,
  onPressText,
}: SettingsLinksSectionProps) {
  const { THEME } = useTheme();

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-1">
        {onPressText ? (
          <Pressable onPress={onPressText} android_ripple={null}>
            <Text className="text-lg font-semibold">{children}</Text>
          </Pressable>
        ) : (
          <>
            <Text className="text-lg font-semibold">{children}</Text>
          </>
        )}
      </View>

      <View className="w-full p-4 rounded-lg bg-secondary">
        {links.map(
          ({
            icon,
            label,
            onPress,
            className,
            isDestructive,
            isHidden,
            isLoading,
          }) =>
            !isHidden && (
              <Button
                key={label}
                onPress={onPress}
                variant="invisible"
                isLoading={isLoading}
                className="flex-row items-center justify-between px-1 py-3"
                size="slim"
              >
                <View
                  className={cn(
                    "flex-row items-center gap-2",

                    className,
                  )}
                >
                  <View>{icon}</View>
                  <Text
                    className={
                      isDestructive ? "text-destructive" : "text-foreground"
                    }
                  >
                    {label}
                  </Text>
                </View>

                <Entypo
                  name="chevron-right"
                  size={20}
                  color={isDestructive ? THEME.destructive : THEME.foreground}
                />
              </Button>
            ),
        )}
      </View>
    </View>
  );
}
