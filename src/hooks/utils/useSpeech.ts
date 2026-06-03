import { useAuth } from "@/contexts/AuthContext";
import useLanguage from "@/hooks/utils/useLanguage";
import { CLEAN_SPEECH_REGEX } from "@/lib/regex";
import { hookLog } from "@/lib/utils";
import {
  DEFAULT_VOICE_PITCH,
  DEFAULT_VOICE_RATE,
  DEFAULT_VOICE_VOLUME,
} from "@/navigation/modals/AudioFeedbackModal";
import * as Speech from "expo-speech";
import { useCallback, useEffect, useRef } from "react";

export default function useSpeech(
  { isDisplayLanguage } = { isDisplayLanguage: true },
) {
  const { profile } = useAuth();
  const { displayLanguage, learningLanguage } = useLanguage();
  const timeoutRef = useRef<number | null>(null);

  const stopTTS = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    Speech.stop();
  }, []);

  const playTTS = useCallback(
    (
      tts: string,
      {
        speakInDisplayLanguage,
        delay,
        voice,
      }: {
        speakInDisplayLanguage?: boolean;
        delay?: number;
        voice?: string;
      } = {},
    ) => {
      hookLog("useSpeech", tts.replace(CLEAN_SPEECH_REGEX, ""));

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopTTS();

      // Language switch
      let isDisplayLang: boolean;
      if (speakInDisplayLanguage !== undefined)
        isDisplayLang = speakInDisplayLanguage;
      else isDisplayLang = isDisplayLanguage;

      function speak() {
        Speech.speak(tts.replace(CLEAN_SPEECH_REGEX, ""), {
          language: isDisplayLang
            ? displayLanguage.locale
            : learningLanguage.locale,

          pitch: profile?.voice_pitch ?? DEFAULT_VOICE_PITCH,
          rate: profile?.voice_rate ?? DEFAULT_VOICE_RATE,
          volume: profile?.voice_volume ?? DEFAULT_VOICE_VOLUME,

          voice:
            voice ??
            (isDisplayLang
              ? profile?.display_voice
              : profile?.learning_voice) ??
            undefined,
        });
      }

      // Delay
      if (delay) {
        timeoutRef.current = setTimeout(() => {
          stopTTS();
          speak();
        }, delay);
      } else {
        speak();
      }
    },
    [
      isDisplayLanguage,
      displayLanguage,
      learningLanguage,
      stopTTS,
      profile?.display_voice,
      profile?.learning_voice,
    ],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { playTTS, stopTTS };
}
