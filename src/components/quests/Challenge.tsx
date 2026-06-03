import { toast } from "@/components/layout/providers/ToastProvider";
import ChallengeBackground from "@/components/quests/ChallengeBackground";
import ChallengeBadges from "@/components/quests/ChallengeBadges";
import ChallengeEmpty from "@/components/quests/ChallengeEmpty";
import ChallengeHeader from "@/components/quests/ChallengeHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useNavigation from "@/hooks/utils/useNavigation";
import { Tables } from "@/typings/database.types";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type ChallengeProps = {
  challenge?: Tables<"quizes"> | null;
  studySet?: Tables<"study_sets"> | null;
};

export default function Challenge({ challenge, studySet }: ChallengeProps) {
  const navigation = useNavigation();
  const hasChallenge = challenge && studySet;

  if (!hasChallenge) return <ChallengeEmpty />;

  return (
    <View className="relative p-4 mt-0.5 gap-3 h-52">
      <ChallengeBackground />
      <ChallengeBadges studySet={studySet} challenge={challenge} />
      <ChallengeHeader />

      <Button
        variant="black"
        onPress={() => {
          toast({ type: "info", text1: "Ten feature jest schowany" });
        }}
        size="sm"
      >
        <Text>
          <Trans>Beat it!</Trans>
        </Text>
      </Button>
    </View>
  );
}
