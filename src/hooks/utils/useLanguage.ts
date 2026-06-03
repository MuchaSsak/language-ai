import { useMMKVString } from "react-native-mmkv";

import { useAuth } from "@/contexts/AuthContext";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES_LABELS,
  SupportedLanguage,
} from "@/lib/locales";
import allMessages from "@/locales/allMessages";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";
import { useLingui } from "@lingui/react/macro";

export default function useLanguage() {
  const { i18n } = useLingui();
  const { profile } = useAuth();
  const [mmkvDisplayLanguage, setMmkvDisplayLanguage] =
    useMMKVString("display_language");
  const { mutate: updateProfile } = useUpdateProfile();

  const displayLanguageLocale = (mmkvDisplayLanguage ||
    profile?.display_language ||
    DEFAULT_LANGUAGE) as SupportedLanguage;
  const learningLanguageLocale =
    profile?.learning_language ?? displayLanguageLocale;

  const displayLanguageLabel = SUPPORTED_LANGUAGES_LABELS.find(
    (l) => l.locale === displayLanguageLocale,
  )!;
  const learningLanguageLabel = SUPPORTED_LANGUAGES_LABELS.find(
    (l) => l.locale === learningLanguageLocale,
  )!;

  function handleChangeDisplayLanguage(newLanguage: SupportedLanguage) {
    setMmkvDisplayLanguage(newLanguage);
    i18n.loadAndActivate({
      locale: newLanguage,
      messages: allMessages[newLanguage],
    });

    if (!profile) return;

    queryClient.setQueryData(
      ["getProfile"],
      (oldProfile: Tables<"profiles">) => ({
        ...oldProfile,
        display_language: newLanguage,
      }),
    );

    updateProfile({
      newProfile: {
        display_language: newLanguage,
      },
    });
  }

  function handleChangeLearningLanguage(newLanguage: SupportedLanguage) {
    if (!profile) return;

    queryClient.setQueryData(
      ["getProfile"],
      (oldProfile: Tables<"profiles">) => ({
        ...oldProfile,
        learning_language: newLanguage,
      }),
    );

    updateProfile({
      newProfile: {
        learning_language: newLanguage,
      },
    });
  }

  return {
    handleChangeDisplayLanguage,
    handleChangeLearningLanguage,
    displayLanguage: displayLanguageLabel,
    learningLanguage: learningLanguageLabel,
  };
}
