import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useShowGoalsForSession from "@/hooks/goals-for-session/useShowGoalsForSession";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { PopUpsMMKV } from "@/navigation/modals/PopUpsModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Trans } from "@lingui/react/macro";

import { View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";

type GoalsForSessionModalProps = {};

export default function GoalsForSessionModal({}: GoalsForSessionModalProps) {
  const navigation = useNavigation();
  const { THEME } = useTheme();
  const { handleHideGoalsForSession } = useShowGoalsForSession();
  const [, setMmkvPopUps] = useMMKVObject<PopUpsMMKV>("pop_ups");

  function handlePressButton() {
    navigation.goBack();
    handleHideGoalsForSession();
  }

  function handleDontShowAgain() {
    navigation.goBack();
    setMmkvPopUps((prev) => ({ ...prev, goals_for_session: false }));
  }

  return (
    <View className="flex-1 gap-8 px-4 pt-16 pb-24">
      <Text className="text-4xl font-semibold text-balance">
        <Trans>What are your goals for this session?</Trans>
      </Text>

      <View className="gap-4 pb-4">
        <Button variant="accent" size="2xl" onPress={handlePressButton}>
          <Text>
            <Trans>Review tough vocabulary 😣</Trans>
          </Text>
        </Button>

        <Button variant="accent" size="2xl" onPress={handlePressButton}>
          <Text>
            <Trans>Beat a challenge ⚔️</Trans>
          </Text>
        </Button>

        <Button variant="accent" size="2xl" onPress={handlePressButton}>
          <Text>
            <Trans>Learn new words 🔥</Trans>
          </Text>
        </Button>

        <Button variant="accent" size="2xl" onPress={handlePressButton}>
          <Text>
            <Trans>Freeplay 😎</Trans>
          </Text>
        </Button>
      </View>

      <Button variant="link" className="gap-0.5" onPress={handleDontShowAgain}>
        <Text className="text-sm">
          <Trans>Don&apos;t show again</Trans>
        </Text>
        <MaterialIcons
          name="arrow-right-alt"
          size={20}
          color={THEME.foreground}
        />
      </Button>
    </View>
  );
}
