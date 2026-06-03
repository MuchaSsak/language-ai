import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { PropsWithChildren, useEffect } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { DEFAULT_LANGUAGE, SupportedLanguage } from "@/lib/locales";
import allMessages from "@/locales/allMessages";
import { useMMKVString } from "react-native-mmkv";

type LinguiProviderProps = PropsWithChildren & {};

export default function LinguiProvider({ children }: LinguiProviderProps) {
  const { profile } = useAuth();
  const [mmkvLanguage] = useMMKVString("display_language");
  const language = (mmkvLanguage ||
    profile?.display_language ||
    DEFAULT_LANGUAGE) as SupportedLanguage;

  useEffect(() => {
    if (i18n.locale === language) return;

    i18n.loadAndActivate({
      locale: language,
      messages: allMessages[language as SupportedLanguage],
    });
  }, [language]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
