import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Trans, useLingui } from "@lingui/react/macro";
import { View } from "react-native";

type SubscriptionFeaturesListProps = {};

export default function SubscriptionFeaturesList({}: SubscriptionFeaturesListProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();

  const FEATURES_LIST = [
    {
      label: t`Thorough pictures analysis`,
      icon: () => (
        <Ionicons name="camera-outline" size={20} color={THEME.foreground} />
      ),
    },
    {
      label: t`Instant AI flashcards`,
      icon: () => (
        <MaterialCommunityIcons
          name="cards-outline"
          size={20}
          color={THEME.foreground}
        />
      ),
    },
    {
      label: t`Audio feedback`,
      icon: () => (
        <FontAwesome5
          name="headphones-alt"
          size={20}
          color={THEME.foreground}
        />
      ),
    },
    {
      label: t`Multi-language support`,
      icon: () => (
        <Ionicons name="earth-outline" size={20} color={THEME.foreground} />
      ),
    },
    {
      label: t`Customizable AI quizes and study sets`,
      icon: () => (
        <MaterialCommunityIcons
          name="gamepad-variant-outline"
          size={20}
          color={THEME.foreground}
        />
      ),
    },
  ];

  return (
    <View className="gap-2 pb-6">
      <Text className="uppercase text-muted-foreground">
        <Trans>What&apos;s included</Trans>
      </Text>

      <View className="gap-2">
        {FEATURES_LIST.map(({ label, icon }) => (
          <View key={label} className="flex-row items-center gap-2">
            {icon()}
            <Text>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
