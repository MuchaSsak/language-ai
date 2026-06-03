import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { Tables } from "@/typings/database.types";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Trans } from "@lingui/react/macro";
import { Clock2 } from "lucide-react-native";
import { View } from "react-native";

type ChallengeBadgesProps = {
  studySet: Tables<"study_sets">;
  challenge: Tables<"quizes">;
};

export default function ChallengeBadges({
  studySet,
  challenge,
}: ChallengeBadgesProps) {
  const { THEME } = useTheme();

  const { estimated_time_seconds, xp_gain_per_question, questions_count } =
    challenge;
  const estimatedTimeMinutes = Math.round(estimated_time_seconds / 60);
  const wordsCount = studySet.words.length;

  return (
    <View className="flex-row justify-end gap-2">
      <Badge className="bg-amber-500 border-amber-600">
        <Octicons name="checklist" size={16} color={THEME.orange[950]} />
        <Text className="text-orange-950">
          {wordsCount === 1 ? (
            <Trans>1 word</Trans>
          ) : (
            <Trans>{wordsCount} words</Trans>
          )}
        </Text>
      </Badge>

      <Badge className="border-orange-600 bg-chart-3">
        <Clock2 size={16} color={THEME.red[950]} />
        <Text className="text-red-950">
          {estimatedTimeMinutes < 1 && <Trans>&lt;1 min</Trans>}
          {estimatedTimeMinutes === 1 && <Trans>1 min</Trans>}
          {estimatedTimeMinutes > 1 && (
            <Trans>{estimatedTimeMinutes} mins</Trans>
          )}
        </Text>
      </Badge>

      <Badge className="bg-chart-2 border-fuchsia-600">
        <Ionicons name="flash" color={THEME.fuchsia[900]} size={16} />
        <Text className="text-fuchsia-950">
          +{xp_gain_per_question * questions_count} XP
        </Text>
      </Badge>
    </View>
  );
}
