import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import useNavigation from "@/hooks/utils/useNavigation";
import { Trans } from "@lingui/react/macro";

import { Image } from "expo-image";
import { View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";

export type PopUpsMMKV = {
  all?: boolean;
  goals_for_session?: boolean;
};

export const DEFAULT_POP_UPS_MMKV: PopUpsMMKV = {
  all: true,
  goals_for_session: true,
};

type PopUpsModalProps = {};

export default function PopUpsModal({}: PopUpsModalProps) {
  const navigation = useNavigation();

  const [mmkvPopUps, setMmkvPopUps] = useMMKVObject<PopUpsMMKV>("pop_ups");
  const isAllPopUpsOn = !!mmkvPopUps?.all;

  function handleTogglePopUps() {
    setMmkvPopUps((prev) =>
      prev ? { ...prev, all: !prev.all } : { ...DEFAULT_POP_UPS_MMKV },
    );
  }

  return (
    <View className="justify-between flex-1 px-4 py-8 pb-24">
      {/* Header */}
      <View className="items-center gap-2">
        <View className="items-center gap-8">
          <Image
            source={require("@/assets/images/pop-ups.png")}
            style={{ width: 250, height: 250 }}
            priority="high"
            contentFit="contain"
          />
          <View className="gap-1.5 px-6">
            <Text className="text-2xl font-semibold text-center text-balance">
              <Trans>Toggle pop-ups</Trans>
            </Text>
            <Text className="text-center text-balance text-muted-foreground">
              <Trans>
                We use them to enhance your experience and provide guidance. If
                they don&apos;t feel convenient, simply switch them off!
              </Trans>
            </Text>
          </View>
        </View>

        {/* Switch */}
        <Button
          variant="invisible"
          isPressableScale={false}
          className="flex-row items-center justify-start gap-3"
          onPress={handleTogglePopUps}
        >
          <Switch
            checked={isAllPopUpsOn}
            onCheckedChange={handleTogglePopUps}
          />

          {isAllPopUpsOn ? (
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
