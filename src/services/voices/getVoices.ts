import { SupportedLanguage } from "@/lib/locales";
import * as Speech from "expo-speech";

type GetVoicesServiceProps = {
  displayLanguageLocale: SupportedLanguage;
  learningLanguageLocale: SupportedLanguage;
};

export default async function getVoices({
  displayLanguageLocale,
  learningLanguageLocale,
}: GetVoicesServiceProps) {
  try {
    const allVoices = await Speech.getAvailableVoicesAsync();

    const nativeVoices = allVoices.filter((v) =>
      v.language.includes(displayLanguageLocale),
    );
    const foreignVoices = allVoices.filter((v) =>
      v.language.includes(learningLanguageLocale),
    );

    return {
      nativeVoices,
      foreignVoices,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
