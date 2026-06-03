import { ACHIEVEMENTS_SECRET_ICON_URL } from "@/components/profile/Achievements";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useGetAchievements from "@/hooks/achievements/useGetAchievements";
import useLanguage from "@/hooks/utils/useLanguage";
import { cn, formatNumber, getAchievementBadgeColors } from "@/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { View } from "react-native";

export default function AchievementsModal() {
  const { displayLanguage } = useLanguage();
  const { data: achievements } = useGetAchievements();

  return (
    <View className="flex-1 py-6">
      <FlashList
        data={achievements}
        masonry
        scrollEnabled
        numColumns={2}
        keyExtractor={({ id }) => id}
        renderItem={({
          item: {
            rarity,
            id,
            icon_url,
            description,
            name,
            xp_gain,
            is_completed,
            is_secret,
          },
        }) => {
          const { badgeBgColor, badgeTextColor } =
            getAchievementBadgeColors(rarity);
          const isSecret = is_secret && !is_completed;

          return (
            <View
              className={cn(
                "items-center gap-2 px-4 mb-10",
                is_completed ? "" : "opacity-50",
              )}
              style={{ minHeight: 260 }}
              key={id}
            >
              <Image
                source={isSecret ? ACHIEVEMENTS_SECRET_ICON_URL : icon_url}
                contentFit="contain"
                style={{ width: 128, height: 128 }}
              />

              <View className="items-center justify-center gap-3">
                {/* Title & description */}
                <View className="gap-0.5">
                  <Text className="font-semibold text-center">
                    {isSecret ? "???" : name[displayLanguage.locale]}
                  </Text>
                  <Text className="text-sm text-center text-muted-foreground">
                    {isSecret ? "???" : description[displayLanguage.locale]}
                  </Text>
                </View>

                {/* XP gain */}
                <Badge
                  style={{
                    borderColor: badgeBgColor,
                    backgroundColor: badgeBgColor + "66",
                  }}
                >
                  <Ionicons name="flash" size={12} color={badgeTextColor} />
                  <Text
                    className="text-sm text-center"
                    style={{ color: badgeTextColor }}
                  >
                    +{formatNumber(xp_gain)} XP
                  </Text>
                </Badge>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Skeleton className="size-32 bg-muted-foreground" />
        }
      />
    </View>
  );
}
