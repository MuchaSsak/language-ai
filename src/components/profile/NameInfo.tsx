import ProfileRank from "@/components/profile/ProfileRank";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import { formatNumber } from "@/lib/utils";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type NameInfoProps = {};

export default function NameInfo({}: NameInfoProps) {
  const { profile } = useAuth();

  if (!profile)
    return (
      <View className="gap-2 px-2 py-2">
        <Skeleton className="w-48 h-5 bg-muted-foreground" />
        <Skeleton className="w-32 h-5 bg-muted-foreground" />
      </View>
    );

  const { username, xp, total_words_mastered, total_study_sets } = profile;

  return (
    <View className="flex-row items-center gap-6 px-2 py-2">
      <View className="flex-1">
        <Text className="text-xl font-semibold">
          {username || <Trans>Anonymous</Trans>}
        </Text>
        <ProfileRank xp={xp} />
      </View>

      <View>
        <Text className="text-xl font-semibold text-center">
          {formatNumber(total_study_sets)}
        </Text>
        <Text className="text-sm leading-[1.125rem] text-center text-muted-foreground">
          <Trans>Study{"\n"}sets</Trans>
        </Text>
      </View>

      <View>
        <Text className="text-xl font-semibold text-center">
          {formatNumber(total_words_mastered)}
        </Text>
        <Text className="text-sm leading-[1.125rem] text-center text-muted-foreground">
          <Trans>Words{"\n"}mastered</Trans>
        </Text>
      </View>
    </View>
  );
}
