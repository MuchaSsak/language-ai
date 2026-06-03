import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type ChallengeEmptyProps = {};

export default function ChallengeEmpty({}: ChallengeEmptyProps) {
  const { THEME } = useTheme();
  const { profile } = useAuth();

  return (
    <View className="h-52 bg-secondary border-b-4 border-border border-dotted border-spacing-16 items-center justify-center gap-4 px-16">
      <FontAwesome5
        name="check-circle"
        size={32}
        color={THEME.mutedForeground}
      />

      <View>
        <Text className="text-lg text-muted-foreground text-center">
          <Trans>No challenge here yet</Trans>
        </Text>

        <Text className="text-muted-foreground/50 text-sm text-center">
          {profile?.expo_push_token ? (
            <Trans>
              We will notify you when we prepared a new one for you!
            </Trans>
          ) : (
            <Trans>
              Enable notifications in the settings to not miss it when it&apos;s
              created!
            </Trans>
          )}
        </Text>
      </View>
    </View>
  );
}
