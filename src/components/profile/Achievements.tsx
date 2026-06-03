import LoadingAchievements from "@/components/profile/LoadingAchievements";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useGetAchievements from "@/hooks/achievements/useGetAchievements";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";

type AchievementsProps = {};

export const ACHIEVEMENTS_SECRET_ICON_URL =
  "https://npoyhglzsjzgxysahfnn.supabase.co/storage/v1/object/public/achievements/secret.png";
const MAX_ACHIEVEMENTS_PREVIEW = 7;

export default function Achievements({}: AchievementsProps) {
  const { THEME } = useTheme();

  const { profile } = useAuth();
  const navigation = useNavigation();

  const { data: achievements } = useGetAchievements();

  if (!profile || !achievements?.length) return <LoadingAchievements />;

  return (
    <View className="gap-3 px-2 pt-2">
      {/* Label */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Text className="text-lg font-semibold">
            <Trans>Achievements</Trans>
          </Text>
          <MaterialCommunityIcons
            name="medal"
            size={16}
            color={THEME.foreground}
          />
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

      {/* Achievements */}
      <ScrollView
        contentContainerClassName="flex-row items-center gap-4 p-4 rounded-lg bg-secondary"
        horizontal
        onResponderStart={() => navigation.navigate("Achievements")}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {achievements
          .slice(0, MAX_ACHIEVEMENTS_PREVIEW)
          .map(({ icon_url, is_completed, is_secret }, i) =>
            !is_completed && is_secret ? (
              <Image
                source={ACHIEVEMENTS_SECRET_ICON_URL}
                contentFit="contain"
                style={{
                  width: 80,
                  height: 80,
                  opacity: is_completed ? 1 : 0.5,
                }}
                key={i}
              />
            ) : (
              <Image
                source={icon_url}
                contentFit="contain"
                style={{
                  width: 80,
                  height: 80,
                  opacity: is_completed ? 1 : 0.5,
                }}
                key={i}
              />
            ),
          )}
      </ScrollView>
    </View>
  );
}
