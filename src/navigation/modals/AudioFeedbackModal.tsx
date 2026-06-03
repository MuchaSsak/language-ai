import VoicesPicker from "@/components/settings/VoicesPicker";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import useGetVoices from "@/hooks/voices/useGetVoices";
import Slider from "@expo/ui/community/slider";
import { Entypo, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { Trans } from "@lingui/react/macro";
import { useState } from "react";

import { ScrollView, View } from "react-native";

const MIN_VOICE_RATE = 0.5;
export const DEFAULT_VOICE_RATE = 1.0;
const MAX_VOICE_RATE = 2.0;

const MIN_VOICE_PITCH = 0.5;
export const DEFAULT_VOICE_PITCH = 1.0;
const MAX_VOICE_PITCH = 1.5;

const MIN_VOICE_VOLUME = 0.1;
export const DEFAULT_VOICE_VOLUME = 1.0;
const MAX_VOICE_VOLUME = 1.0;

type AudioFeedbackModalProps = {};

export default function AudioFeedbackModal({}: AudioFeedbackModalProps) {
  const navigation = useNavigation();
  const { THEME } = useTheme();
  const { profile } = useAuth();

  const { data: voices } = useGetVoices();
  const nativeVoices = voices?.nativeVoices;
  const foreignVoices = voices?.foreignVoices;

  const [selectedNativeVoice, setSelectedNativeVoice] = useState<
    string | undefined
  >(profile?.display_voice ?? nativeVoices?.[0]?.identifier);
  const [selectedForeignVoice, setSelectedForeignVoice] = useState<
    string | undefined
  >(profile?.learning_voice ?? foreignVoices?.[0]?.identifier);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [rate, setRate] = useState(profile?.voice_rate ?? DEFAULT_VOICE_RATE);
  const [pitch, setPitch] = useState(
    profile?.voice_pitch ?? DEFAULT_VOICE_PITCH,
  );
  const [volume, setVolume] = useState(
    profile?.voice_volume ?? DEFAULT_VOICE_VOLUME,
  );

  return (
    <View className="flex-1 px-4 pt-8 pb-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="justify-between pb-16"
      >
        {/* Header */}
        <View className="items-center gap-4">
          <View className="items-center gap-8 pb-4">
            <View className="gap-1.5 px-6">
              <Text className="text-2xl font-semibold text-center text-balance">
                <Trans>Audio feedback</Trans>
              </Text>
              <Text className="text-center text-balance text-muted-foreground">
                <Trans>
                  We use them to enhance your experience and provide guidance.
                  If they don&apos;t feel convenient, simply switch them off!
                </Trans>
              </Text>
            </View>
          </View>

          {/* Rate */}
          <View className="w-full">
            <View className="flex-row items-center gap-1.5">
              <SimpleLineIcons
                name="speedometer"
                size={20}
                color={THEME.foreground}
              />
              <Text className="text-lg font-medium">
                <Trans>Speed rate</Trans>
              </Text>
            </View>

            <Slider
              step={0.01}
              minimumTrackTintColor={THEME.primary}
              maximumTrackTintColor={THEME.primary}
              thumbTintColor={THEME.primary}
              minimumValue={MIN_VOICE_RATE}
              maximumValue={MAX_VOICE_RATE}
              onValueChange={(newValue) => setRate(newValue)}
              value={rate}
            />
          </View>

          {/* Pitch */}
          <View className="w-full">
            <View className="flex-row items-center gap-1.5">
              <Entypo name="bar-graph" size={20} color={THEME.foreground} />
              <Text className="text-lg font-medium">
                <Trans>Voice pitch</Trans>
              </Text>
            </View>

            <Slider
              step={0.01}
              minimumTrackTintColor={THEME.primary}
              maximumTrackTintColor={THEME.primary}
              thumbTintColor={THEME.primary}
              minimumValue={MIN_VOICE_PITCH}
              maximumValue={MAX_VOICE_PITCH}
              onValueChange={(newValue) => setPitch(newValue)}
              value={pitch}
            />
          </View>

          {/* Volume */}
          <View className="w-full">
            <View className="flex-row items-center gap-1.5">
              <FontAwesome5
                name={volume > 0.1 ? "volume-up" : "volume-mute"}
                size={20}
                color={THEME.foreground}
              />
              <Text className="text-lg font-medium">
                <Trans>Volume</Trans>
              </Text>
            </View>

            <Slider
              step={0.01}
              minimumTrackTintColor={THEME.primary}
              maximumTrackTintColor={THEME.primary}
              thumbTintColor={THEME.primary}
              minimumValue={MIN_VOICE_VOLUME}
              maximumValue={MAX_VOICE_VOLUME}
              onValueChange={(newValue) => setVolume(newValue)}
              value={volume}
            />
          </View>

          {/* Voices */}
          <VoicesPicker
            className="py-4"
            selectedVoice={selectedNativeVoice}
            setSelectedVoice={setSelectedNativeVoice}
            voices={nativeVoices}
            type="native"
          />
          <VoicesPicker
            selectedVoice={selectedForeignVoice}
            setSelectedVoice={setSelectedForeignVoice}
            voices={foreignVoices}
            type="foreign"
          />
        </View>
      </ScrollView>

      {/* Buttons */}
      <Button
        onPress={() =>
          updateProfile({
            onSuccess: () => navigation.goBack(),
            newProfile: {
              display_voice: selectedNativeVoice,
              learning_voice: selectedForeignVoice,
              voice_rate: rate,
              voice_pitch: pitch,
              voice_volume: volume,
            },
            isSuccessToast: true,
            isErrorToast: true,
          })
        }
        isLoading={isPending}
      >
        <Text>
          <Trans>Save and go back!</Trans>
        </Text>
      </Button>
    </View>
  );
}
