import StatisticsExperienceCard from "@/components/profile/StatisticsExperienceCard";
import StatisticsStudySetsCard from "@/components/profile/StatisticsStudySetsCard";
import StatisticsWordsCard from "@/components/profile/StatisticsWordsCard";
import useTheme from "@/hooks/utils/useTheme";
import { useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

type StatisticsCarouselProps = {};

export default function StatisticsCarousel({}: StatisticsCarouselProps) {
  const { THEME, colorScheme } = useTheme();
  const { width: viewportWidth } = useWindowDimensions();

  // Carousel
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const PROFILE_STATISTICS_TABS = [
    StatisticsExperienceCard,
    StatisticsStudySetsCard,
    StatisticsWordsCard,
  ];

  return (
    <View className="w-full gap-2">
      <Carousel
        ref={ref}
        data={PROFILE_STATISTICS_TABS}
        onProgressChange={progress}
        height={270}
        width={viewportWidth - 40}
        renderItem={({ item: Item }) => <Item />}
      />

      <Pagination.Basic
        progress={progress}
        data={PROFILE_STATISTICS_TABS}
        activeDotStyle={{
          backgroundColor: THEME.primary,
        }}
        dotStyle={{
          backgroundColor:
            colorScheme === "light"
              ? THEME.accentForeground
              : THEME.mutedForeground,
          borderRadius: 100,
          height: 4,
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
      />
    </View>
  );
}
