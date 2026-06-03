import FinishedStatistics from "@/components/study-sessions/FinishedStatistics";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useQuiz } from "@/contexts/QuizContext";
import { useTimeSpent } from "@/contexts/TimeSpentContext";
import useCreateStudySession from "@/hooks/study-sessions/useCreateStudySession";
import useNavigation from "@/hooks/utils/useNavigation";
import { calculateStudySessionAccuracy } from "@/lib/utils";
import { NavigationRouteParams } from "@/navigation";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type ChallengeFinishedScreenProps =
  NavigationRouteParams<"ChallengeFinished"> & {};

export default function ChallengeFinishedScreen({
  route: {
    params: { hasPassed },
  },
}: ChallengeFinishedScreenProps) {
  const {
    quizState: { missedWordsIds, correctAnswers },
    slides,
  } = useQuiz();
  const { timeSpentSeconds } = useTimeSpent();
  const accuracy = calculateStudySessionAccuracy(
    correctAnswers.length,
    slides.length,
  );
  const navigation = useNavigation();

  const { isPending } = useCreateStudySession();

  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerClassName="gap-6 pt-8 px-2" bounces={false}>
        <View className="items-center">
          <Image
            source={require("@/assets/images/challenge.png")}
            style={{ width: 200, height: 200 }}
            priority="high"
            contentFit="contain"
          />
        </View>

        <View className="gap-4">
          <View className="items-center gap-1">
            <Text className="text-2xl font-semibold text-center w-[22rem]">
              <Trans>
                Congratulations! You&apos;ve finished the challenge!
              </Trans>
            </Text>
            <Text className="text-center w-80 text-muted-foreground">
              <Trans>
                An another session of learning in the books. Be proud!
              </Trans>
            </Text>
          </View>

          <FinishedStatistics
            className="pb-2 mx-0"
            accuracy={accuracy}
            timeSpent={timeSpentSeconds}
            missedWords={missedWordsIds.length}
            questionsAnswered={slides.length}
          />

          <Animated.View
            entering={FadeInDown.delay(300).duration(500).springify()}
          >
            <Button
              size="lg"
              isLoading={isPending}
              onPress={() => navigation.goHome()}
            >
              <Text>
                <Trans>Go home</Trans>
              </Text>
            </Button>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
