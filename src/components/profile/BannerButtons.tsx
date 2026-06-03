import { Button } from "@/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import useLanguage from "@/hooks/utils/useLanguage";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";

type BannerButtonsProps = {};

export default function BannerButtons({}: BannerButtonsProps) {
  const { THEME } = useTheme();
  const navigation = useNavigation();
  const { learningLanguage } = useLanguage();

  return (
    <View className="flex-row items-center justify-between w-full px-6 mt-4">
      <Button
        size="icon"
        variant="secondary"
        onPress={() => navigation.navigate("LearningLanguage")}
      >
        <Text className="text-lg">{learningLanguage.emoji}</Text>
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onPress={() => navigation.navigate("Settings")}
      >
        <Feather name="settings" size={24} color={THEME.foreground} />
      </Button>
    </View>
  );
}
