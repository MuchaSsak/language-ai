import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { View } from "react-native";

type DarkModeModalProps = {};

export default function DarkModeModal({}: DarkModeModalProps) {
  const navigation = useNavigation();
  const { colorScheme, handleChangeTheme } = useTheme();

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-2">
        <View className="items-center gap-8">
          <Image
            source={require("@/assets/images/dark-mode.png")}
            style={{ width: 250, height: 250 }}
            priority="high"
            contentFit="contain"
          />
          <View className="gap-1.5 px-6">
            <Text className="text-2xl font-semibold text-center text-balance">
              <Trans>Toggle dark mode</Trans>
            </Text>
            <Text className="text-center text-balance text-muted-foreground">
              <Trans>
                Learn anywhere, at any time! Dark mode is perfect for late
                evenings to give your eyes a better rest.
              </Trans>
            </Text>
          </View>
        </View>

        {/* Switch */}
        <Button
          variant="invisible"
          isPressableScale={false}
          className="flex-row items-center justify-start gap-3"
          onPress={() =>
            handleChangeTheme(colorScheme === "dark" ? "light" : "dark")
          }
        >
          <Switch
            checked={colorScheme === "dark"}
            onCheckedChange={() =>
              handleChangeTheme(colorScheme === "dark" ? "light" : "dark")
            }
          />

          {colorScheme ? (
            <Text className="text-lg font-medium text-foreground">
              <Trans>Disable </Trans>

              <Text className="text-lg italic font-light text-muted-foreground">
                <Trans>(Currently turned on)</Trans>
              </Text>
            </Text>
          ) : (
            <Text className="text-lg font-medium text-foreground">
              <Trans>Enable </Trans>

              <Text className="text-lg italic font-light text-muted-foreground">
                <Trans>(Currently turned off)</Trans>
              </Text>
            </Text>
          )}
        </Button>
      </View>

      {/* Buttons */}
      <Button onPress={() => navigation.goBack()}>
        <Text>
          <Trans>Save and go back!</Trans>
        </Text>
      </Button>
    </View>
  );
}
