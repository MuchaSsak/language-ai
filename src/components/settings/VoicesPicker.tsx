import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import useLanguage from "@/hooks/utils/useLanguage";
import useSpeech from "@/hooks/utils/useSpeech";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import { Feather } from "@expo/vector-icons";
import { Trans, useLingui } from "@lingui/react/macro";
import { Picker } from "@react-native-picker/picker";
import { Voice } from "expo-speech";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";

type VoicesPickerProps = {
  selectedVoice?: string;
  setSelectedVoice: Dispatch<SetStateAction<string | undefined>>;
  voices?: Voice[];
  type: "native" | "foreign";
  className?: string;
};

export default function VoicesPicker({
  voices,
  type,
  selectedVoice,
  setSelectedVoice,
  className,
}: VoicesPickerProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();
  const { playTTS } = useSpeech();

  const { displayLanguage, learningLanguage } = useLanguage();
  const languageLabel =
    type === "native" ? displayLanguage.label() : learningLanguage.label();

  return (
    <View className={cn("w-full gap-2", className)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-medium">
          {type === "native" ? displayLanguage.emoji : learningLanguage.emoji}{" "}
          <Trans comment="(Language) voices, e.g. English voices, French voices etc.">
            {languageLabel} voices
          </Trans>
        </Text>

        <Button
          size="icon"
          variant="accent"
          className="size-9"
          accessibilityLabel={t`Hear the ${languageLabel} voice`}
          onPress={() => {
            const foundVoice = voices?.find(
              (v) => v.identifier === selectedVoice,
            );
            if (!foundVoice) return;
            playTTS(foundVoice.name, {
              voice: foundVoice.identifier.toString(),
            });
          }}
        >
          <Feather name="volume-2" size={16} color={THEME.foreground} />
        </Button>
      </View>

      {voices?.length ? (
        <Picker
          style={{
            width: "100%",
            backgroundColor: THEME.secondary + "66",
            borderRadius: 32,
            borderWidth: 1,
            borderColor: THEME.border + "55",
            borderStyle: "solid",
          }}
          prompt={t`${languageLabel} voices`}
          accessibilityLabel={t`${languageLabel} voices`}
          itemStyle={{
            color: THEME.chart5,
          }}
          selectedValue={selectedVoice}
          onValueChange={(identifier) => {
            setSelectedVoice(identifier.toString());

            const foundVoice = voices?.find((v) => v.identifier === identifier);
            if (!foundVoice) return;
            playTTS(foundVoice.name, { voice: identifier.toString() });
          }}
        >
          {voices.map(({ name, identifier }) => (
            <Picker.Item key={identifier} label={name} value={identifier} />
          ))}
        </Picker>
      ) : (
        <Skeleton className="w-full h-56" />
      )}
    </View>
  );
}
