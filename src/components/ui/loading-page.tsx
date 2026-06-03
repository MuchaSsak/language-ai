import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Text } from "@/components/ui/text";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import Octicons from "@expo/vector-icons/Octicons";
import { Trans } from "@lingui/react/macro";
import { PropsWithChildren } from "react";
import { View } from "react-native";

type LoadingPageProps = PropsWithChildren & {
  className?: string;
  textClassName?: string;
};

export default function LoadingPage({
  children,
  className,
  textClassName,
}: LoadingPageProps) {
  const { THEME } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      className={cn(
        "items-center justify-center flex-1 pb-16 gap-32",
        className,
      )}
    >
      <View className="h-10" />

      <View className="gap-2 items-center justify-center">
        <LoadingSpinner size={40} color={THEME.foreground} />

        <Text
          className={cn(
            "text-lg font-medium text-muted-foreground",
            textClassName,
          )}
        >
          {children}
        </Text>
      </View>

      <Button size="sm" variant="ghost" onPress={() => navigation.goBack()}>
        <Octicons name="arrow-left" size={20} color={THEME.mutedForeground} />

        <Text className="text-sm text-muted-foreground">
          <Trans>Go back</Trans>
        </Text>
      </Button>
    </View>
  );
}
