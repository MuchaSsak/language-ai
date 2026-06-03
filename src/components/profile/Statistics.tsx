import LoadingStatistics from "@/components/profile/LoadingStatistics";
import StatisticsCarousel from "@/components/profile/StatisticsCarousel";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type StatisticsProps = {};

export default function Statistics({}: StatisticsProps) {
  const { THEME } = useTheme();
  const { profile } = useAuth();

  if (!profile) return <LoadingStatistics />;

  return (
    <View className="gap-3">
      {/* Label */}
      <View className="flex-row items-center gap-1 px-2">
        <Text className="text-lg font-semibold">
          <Trans>Statistics</Trans>
        </Text>
        <Ionicons name="stats-chart" size={16} color={THEME.foreground} />
      </View>

      {/* Carousel */}
      <StatisticsCarousel />
    </View>
  );
}
