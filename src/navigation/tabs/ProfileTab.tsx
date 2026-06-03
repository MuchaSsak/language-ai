import Achievements from "@/components/profile/Achievements";
import Avatar from "@/components/profile/Avatar";
import AvatarInfo from "@/components/profile/AvatarInfo";
import BannerBackground from "@/components/profile/BannerBackground";
import BannerButtons from "@/components/profile/BannerButtons";
import NameInfo from "@/components/profile/NameInfo";
import Statistics from "@/components/profile/Statistics";
import WeeklyXP from "@/components/profile/WeeklyXP";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import { queryClient } from "@/services/tanstack-query/client";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileTabProps = {};

export default function ProfileTab({}: ProfileTabProps) {
  const { THEME } = useTheme();
  const { refetch, isRefetching } = useAuth();

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      className="flex-1 bg-background"
    >
      <StatusBar style="auto" />

      <BannerButtons />
      <BannerBackground />
      <BannerBackground
        style={{ top: 225, transform: [{ rotateX: "180deg" }] }}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={THEME.black}
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
              queryClient.invalidateQueries({ queryKey: ["getAchievements"] });
              queryClient.invalidateQueries({ queryKey: ["getWeeklyXP"] });
            }}
          />
        }
        className="z-10 overflow-visible"
        contentContainerClassName="items-center max-sm:items-center flex-col gap-4 mx-auto w-full relative z-10 overflow-visible"
      >
        <View className="mt-16 px-4 py-3 w-full rounded-t-[2.25rem] gap-4 bg-background relative ios:pb-16 android:pb-32">
          <View className="px-2 pl-36">
            <Avatar className="absolute left-0 h-14 -top-16" />
            <AvatarInfo />
          </View>

          <NameInfo />
          <Statistics />
          <WeeklyXP />
          <Achievements />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
