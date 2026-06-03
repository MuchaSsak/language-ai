import LoadingSpinner from "@/components/ui/loading-spinner";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { View } from "react-native";

type LoadingPermissionProps = {};

export default function LoadingPermission({}: LoadingPermissionProps) {
  const { THEME } = useTheme();

  return (
    <View className="items-center justify-center flex-1 gap-3">
      <Text className="text-muted-foreground">Loading camera...</Text>
      <LoadingSpinner size={32} color={THEME.mutedForeground} />
    </View>
  );
}
