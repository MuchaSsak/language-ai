import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { Trans } from "@lingui/react/macro";
import { ActivityIndicator, View } from "react-native";

type LoadingAchievementsProps = {};

export default function LoadingAchievements({}: LoadingAchievementsProps) {
  const { THEME } = useTheme();
  const navigation = useNavigation();

  return (
    <View className="gap-3 px-2 pt-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Text className="text-lg font-semibold">
            <Trans>Loading achievements</Trans>
          </Text>
          <ActivityIndicator size="small" color={THEME.mutedForeground} />
        </View>

        <Button
          variant="link"
          size="slim"
          className="pr-1"
          onPress={() => navigation.navigate("Achievements")}
        >
          <Text>
            <Trans>See all</Trans>
          </Text>
        </Button>
      </View>

      <Skeleton className="w-full h-[7.5rem] bg-muted-foreground" />
    </View>
  );
}
