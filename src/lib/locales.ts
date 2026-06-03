import { MacroMessageDescriptor, t } from "@lingui/core/macro";

// Languages
// prettier-ignore
export const SUPPORTED_LANGUAGES_LABELS = [
  { labelRaw: "Afrikaans", label: () => t`Afrikaans`, emoji: "🇿🇦", locale: "af", fullLocale: "af-ZA", countries: [() => t`South Africa`, () => t`Namibia`] },
  { labelRaw: "Arabic", label: () => t`Arabic`, emoji: "🇸🇦", locale: "ar", fullLocale: "ar-SA", countries: [() => t`Saudi Arabia`, () => t`Egypt`, () => t`United Arab Emirates`, () => t`Morocco`] },
  { labelRaw: "Azerbaijani", label: () => t`Azerbaijani`, emoji: "🇦🇿", locale: "az", fullLocale: "az-AZ", countries: [() => t`Azerbaijan`] },
  { labelRaw: "Belarusian", label: () => t`Belarusian`, emoji: "🇧🇾", locale: "be", fullLocale: "be-BY", countries: [() => t`Belarus`] },
  { labelRaw: "Bulgarian", label: () => t`Bulgarian`, emoji: "🇧🇬", locale: "bg", fullLocale: "bg-BG", countries: [() => t`Bulgaria`] },
  { labelRaw: "Bengali", label: () => t`Bengali`, emoji: "🇧🇩", locale: "bn", fullLocale: "bn-BD", countries: [() => t`Bangladesh`, () => t`India`] },
  { labelRaw: "Bosnian", label: () => t`Bosnian`, emoji: "🇧🇦", locale: "bs", fullLocale: "bs-BA", countries: [() => t`Bosnia and Herzegovina`] },
  { labelRaw: "Catalan", label: () => t`Catalan`, emoji: "🇪🇸", locale: "ca", fullLocale: "ca-ES", countries: [() => t`Spain`, () => t`Andorra`] },
  { labelRaw: "Czech", label: () => t`Czech`, emoji: "🇨🇿", locale: "cs", fullLocale: "cs-CZ", countries: [() => t`Czech Republic`] },
  { labelRaw: "Welsh", label: () => t`Welsh`, emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", locale: "cy", fullLocale: "cy-GB", countries: [() => t`Wales`] },
  { labelRaw: "Danish", label: () => t`Danish`, emoji: "🇩🇰", locale: "da", fullLocale: "da-DK", countries: [() => t`Denmark`, () => t`Greenland`] },
  { labelRaw: "German", label: () => t`German`, emoji: "🇩🇪", locale: "de", fullLocale: "de-DE", countries: [() => t`Germany`, () => t`Austria`, () => t`Switzerland`] },
  { labelRaw: "Greek", label: () => t`Greek`, emoji: "🇬🇷", locale: "el", fullLocale: "el-GR", countries: [() => t`Greece`, () => t`Cyprus`] },
  { labelRaw: "English", label: () => t`English`, emoji: "🇬🇧", locale: "en", fullLocale: "en-GB", countries: [() => t`United Kingdom`, () => t`United States`, () => t`Canada`, () => t`Australia`] },
  { labelRaw: "Spanish", label: () => t`Spanish`, emoji: "🇪🇸", locale: "es", fullLocale: "es-ES", countries: [() => t`Spain`, () => t`Mexico`, () => t`Argentina`, () => t`Colombia`] },
  { labelRaw: "Estonian", label: () => t`Estonian`, emoji: "🇪🇪", locale: "et", fullLocale: "et-EE", countries: [() => t`Estonia`] },
  { labelRaw: "Basque", label: () => t`Basque`, emoji: "⚑", locale: "eu", fullLocale: "eu-ES", countries: [() => t`Spain`, () => t`France`] },
  { labelRaw: "Persian", label: () => t`Persian`, emoji: "🇮🇷", locale: "fa", fullLocale: "fa-IR", countries: [() => t`Iran`, () => t`Afghanistan`, () => t`Tajikistan`] },
  { labelRaw: "Finnish", label: () => t`Finnish`, emoji: "🇫🇮", locale: "fi", fullLocale: "fi-FI", countries: [() => t`Finland`] },
  { labelRaw: "French", label: () => t`French`, emoji: "🇫🇷", locale: "fr", fullLocale: "fr-FR", countries: [() => t`France`, () => t`Canada`, () => t`Belgium`, () => t`Switzerland`] },
  { labelRaw: "Irish", label: () => t`Irish`, emoji: "🇮🇪", locale: "ga", fullLocale: "ga-IE", countries: [() => t`Ireland`] },
  { labelRaw: "Galician", label: () => t`Galician`, emoji: "🇪🇸", locale: "gl", fullLocale: "gl-ES", countries: [() => t`Spain`] },
  { labelRaw: "Gujarati", label: () => t`Gujarati`, emoji: "🇮🇳", locale: "gu", fullLocale: "gu-IN", countries: [() => t`India`] },
  { labelRaw: "Hebrew", label: () => t`Hebrew`, emoji: "🇮🇱", locale: "he", fullLocale: "he-IL", countries: [() => t`Israel`] },
  { labelRaw: "Hindi", label: () => t`Hindi`, emoji: "🇮🇳", locale: "hi", fullLocale: "hi-IN", countries: [() => t`India`] },
  { labelRaw: "Croatian", label: () => t`Croatian`, emoji: "🇭🇷", locale: "hr", fullLocale: "hr-HR", countries: [() => t`Croatia`] },
  { labelRaw: "Hungarian", label: () => t`Hungarian`, emoji: "🇭🇺", locale: "hu", fullLocale: "hu-HU", countries: [() => t`Hungary`] },
  { labelRaw: "Armenian", label: () => t`Armenian`, emoji: "🇦🇲", locale: "hy", fullLocale: "hy-AM", countries: [() => t`Armenia`] },
  { labelRaw: "Indonesian", label: () => t`Indonesian`, emoji: "🇮🇩", locale: "id", fullLocale: "id-ID", countries: [() => t`Indonesia`] },
  { labelRaw: "Icelandic", label: () => t`Icelandic`, emoji: "🇮🇸", locale: "is", fullLocale: "is-IS", countries: [() => t`Iceland`] },
  { labelRaw: "Italian", label: () => t`Italian`, emoji: "🇮🇹", locale: "it", fullLocale: "it-IT", countries: [() => t`Italy`, () => t`Switzerland`] },
  { labelRaw: "Japanese", label: () => t`Japanese`, emoji: "🇯🇵", locale: "ja", fullLocale: "ja-JP", countries: [() => t`Japan`] },
  { labelRaw: "Georgian", label: () => t`Georgian`, emoji: "🇬🇪", locale: "ka", fullLocale: "ka-GE", countries: [() => t`Georgia`] },
  { labelRaw: "Kazakh", label: () => t`Kazakh`, emoji: "🇰🇿", locale: "kk", fullLocale: "kk-KZ", countries: [() => t`Kazakhstan`] },
  { labelRaw: "Khmer", label: () => t`Khmer`, emoji: "🇰🇭", locale: "km", fullLocale: "km-KH", countries: [() => t`Cambodia`] },
  { labelRaw: "Kannada", label: () => t`Kannada`, emoji: "🇮🇳", locale: "kn", fullLocale: "kn-IN", countries: [() => t`India`] },
  { labelRaw: "Korean", label: () => t`Korean`, emoji: "🇰🇷", locale: "ko", fullLocale: "ko-KR", countries: [() => t`South Korea`, () => t`North Korea`] },
  { labelRaw: "Lithuanian", label: () => t`Lithuanian`, emoji: "🇱🇹", locale: "lt", fullLocale: "lt-LT", countries: [() => t`Lithuania`] },
  { labelRaw: "Latvian", label: () => t`Latvian`, emoji: "🇱🇻", locale: "lv", fullLocale: "lv-LV", countries: [() => t`Latvia`] },
  { labelRaw: "Macedonian", label: () => t`Macedonian`, emoji: "🇲🇰", locale: "mk", fullLocale: "mk-MK", countries: [() => t`North Macedonia`] },
  { labelRaw: "Malayalam", label: () => t`Malayalam`, emoji: "🇮🇳", locale: "ml", fullLocale: "ml-IN", countries: [() => t`India`] },
  { labelRaw: "Mongolian", label: () => t`Mongolian`, emoji: "🇲🇳", locale: "mn", fullLocale: "mn-MN", countries: [() => t`Mongolia`] },
  { labelRaw: "Marathi", label: () => t`Marathi`, emoji: "🇮🇳", locale: "mr", fullLocale: "mr-IN", countries: [() => t`India`] },
  { labelRaw: "Malay", label: () => t`Malay`, emoji: "🇲🇾", locale: "ms", fullLocale: "ms-MY", countries: [() => t`Malaysia`, () => t`Singapore`, () => t`Brunei`] },
  { labelRaw: "Maltese", label: () => t`Maltese`, emoji: "🇲🇹", locale: "mt", fullLocale: "mt-MT", countries: [() => t`Malta`] },
  { labelRaw: "Burmese", label: () => t`Burmese`, emoji: "🇲🇲", locale: "my", fullLocale: "my-MM", countries: [() => t`Myanmar`] },
  { labelRaw: "Norwegian", label: () => t`Norwegian`, emoji: "🇳🇴", locale: "no", fullLocale: "nb-NO", countries: [() => t`Norway`] },
  { labelRaw: "Nepali", label: () => t`Nepali`, emoji: "🇳🇵", locale: "ne", fullLocale: "ne-NP", countries: [() => t`Nepal`, () => t`India`] },
  { labelRaw: "Dutch", label: () => t`Dutch`, emoji: "🇳🇱", locale: "nl", fullLocale: "nl-NL", countries: [() => t`Netherlands`, () => t`Belgium`, () => t`Suriname`] },
  { labelRaw: "Punjabi", label: () => t`Punjabi`, emoji: "🇮🇳", locale: "pa", fullLocale: "pa-IN", countries: [() => t`India`, () => t`Pakistan`] },
  { labelRaw: "Polish", label: () => t`Polish`, emoji: "🇵🇱", locale: "pl", fullLocale: "pl-PL", countries: [() => t`Poland`] },
  { labelRaw: "Portuguese", label: () => t`Portuguese`, emoji: "🇵🇹", locale: "pt", fullLocale: "pt-BR", countries: [() => t`Portugal`, () => t`Brazil`, () => t`Angola`, () => t`Mozambique`] },
  { labelRaw: "Romanian", label: () => t`Romanian`, emoji: "🇷🇴", locale: "ro", fullLocale: "ro-RO", countries: [() => t`Romania`, () => t`Moldova`] },
  { labelRaw: "Russian", label: () => t`Russian`, emoji: "🇷🇺", locale: "ru", fullLocale: "ru-RU", countries: [() => t`Russia`, () => t`Kazakhstan`, () => t`Belarus`] },
  { labelRaw: "Slovak", label: () => t`Slovak`, emoji: "🇸🇰", locale: "sk", fullLocale: "sk-SK", countries: [() => t`Slovakia`] },
  { labelRaw: "Slovenian", label: () => t`Slovenian`, emoji: "🇸🇮", locale: "sl", fullLocale: "sl-SI", countries: [() => t`Slovenia`] },
  { labelRaw: "Albanian", label: () => t`Albanian`, emoji: "🇦🇱", locale: "sq", fullLocale: "sq-AL", countries: [() => t`Albania`, () => t`Kosovo`, () => t`North Macedonia`] },
  { labelRaw: "Serbian", label: () => t`Serbian`, emoji: "🇷🇸", locale: "sr", fullLocale: "sr-RS", countries: [() => t`Serbia`, () => t`Bosnia and Herzegovina`] },
  { labelRaw: "Swedish", label: () => t`Swedish`, emoji: "🇸🇪", locale: "sv", fullLocale: "sv-SE", countries: [() => t`Sweden`, () => t`Finland`] },
  { labelRaw: "Swahili", label: () => t`Swahili`, emoji: "🇰🇪", locale: "sw", fullLocale: "sw-KE", countries: [() => t`Kenya`, () => t`Tanzania`, () => t`Uganda`] },
  { labelRaw: "Tamil", label: () => t`Tamil`, emoji: "🇮🇳", locale: "ta", fullLocale: "ta-IN", countries: [() => t`India`, () => t`Sri Lanka`, () => t`Singapore`] },
  { labelRaw: "Telugu", label: () => t`Telugu`, emoji: "🇮🇳", locale: "te", fullLocale: "te-IN", countries: [() => t`India`] },
  { labelRaw: "Thai", label: () => t`Thai`, emoji: "🇹🇭", locale: "th", fullLocale: "th-TH", countries: [() => t`Thailand`] },
  { labelRaw: "Turkish", label: () => t`Turkish`, emoji: "🇹🇷", locale: "tr", fullLocale: "tr-TR", countries: [() => t`Turkey`, () => t`Cyprus`] },
  { labelRaw: "Ukrainian", label: () => t`Ukrainian`, emoji: "🇺🇦", locale: "uk", fullLocale: "uk-UA", countries: [() => t`Ukraine`] },
  { labelRaw: "Urdu", label: () => t`Urdu`, emoji: "🇵🇰", locale: "ur", fullLocale: "ur-PK", countries: [() => t`Pakistan`, () => t`India`] },
  { labelRaw: "Uzbek", label: () => t`Uzbek`, emoji: "🇺🇿", locale: "uz", fullLocale: "uz-UZ", countries: [() => t`Uzbekistan`] },
  { labelRaw: "Vietnamese", label: () => t`Vietnamese`, emoji: "🇻🇳", locale: "vi", fullLocale: "vi-VN", countries: [() => t`Vietnam`] },
  { labelRaw: "Chinese", label: () => t`Chinese`, emoji: "🇨🇳", locale: "zh", fullLocale: "zh-CN", countries: [() => t`China`, () => t`Taiwan`, () => t`Singapore`] },
  { labelRaw: "Zulu", label: () => t`Zulu`, emoji: "🇿🇦", locale: "zu", fullLocale: "zu-ZA", countries: [() => t`South Africa`] },
] as const;

export const SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES_LABELS.map(
  ({ locale }) => locale,
);
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const SOURCE_LANGUAGE: SupportedLanguage = "en";

export type LinguiTranslateDescriptor = {
  (descriptor: MacroMessageDescriptor): string;
  (literals: TemplateStringsArray, ...placeholders: any[]): string;
};
