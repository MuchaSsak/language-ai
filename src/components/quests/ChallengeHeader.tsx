import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { Trans } from "@lingui/react/macro";
import { Swords } from "lucide-react-native";
import { View } from "react-native";

type ChallengeHeaderProps = {};

export default function ChallengeHeader({}: ChallengeHeaderProps) {
  const { THEME } = useTheme();

  return (
    <View className="flex-row items-center gap-3 pb-2">
      <Swords size={64} color={THEME.black} />

      <View className="flex-1">
        <Text className="text-xl font-bold text-black">
          <Trans>A challenge is ready!</Trans>
        </Text>
        <Text className="text-black">
          <Trans>
            Test your knowledge with a quiz we&apos;ve built just for you!
          </Trans>
        </Text>
      </View>
    </View>
  );
}
