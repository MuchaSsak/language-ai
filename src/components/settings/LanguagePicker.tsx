import { Input } from "@/components/ui/input";
import RadioButton from "@/components/ui/radio-button";
import { RadioGroup } from "@/components/ui/radio-group";
import useTheme from "@/hooks/utils/useTheme";
import { SUPPORTED_LANGUAGES_LABELS, SupportedLanguage } from "@/lib/locales";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { View } from "react-native";

type LanguagePickerProps = {
  value?: SupportedLanguage;
  onValueChange: (newLanguage: SupportedLanguage) => void;
  className?: string;
};

export default function LanguagePicker({
  value,
  onValueChange,
  className,
}: LanguagePickerProps) {
  const { i18n, t } = useLingui();
  const { THEME } = useTheme();

  const [search, setSearch] = useState("");
  const buttons = useMemo(
    () =>
      [...SUPPORTED_LANGUAGES_LABELS]
        // Search
        .filter(({ label, locale, countries }) => {
          const trimmedSearch = search.trim().toLowerCase();
          if (!trimmedSearch) return true;

          return (
            label().toLowerCase().includes(trimmedSearch) ||
            locale.toLowerCase().includes(trimmedSearch) ||
            countries.some((country) =>
              country().toLowerCase().includes(trimmedSearch),
            )
          );
        })
        // Sort alphabetically
        .sort((a, b) => {
          const collator = new Intl.Collator(i18n.locale);

          const labelA = a.label();
          const labelB = b.label();

          return collator.compare(labelA, labelB);
        }),
    [search, i18n.locale],
  );

  const initialScrollIndex = useMemo(() => {
    if (!value) return undefined;
    const index = buttons.findIndex((item) => item.locale === value);
    // FlashList will error out or behave weirdly if the index is -1 (e.g. filtered out by search)
    return index >= 0 ? index : undefined;
  }, [value, buttons]);

  return (
    <View className={cn("gap-3 flex-1 relative", className)}>
      {/* Fade out bottom gradient */}
      <LinearGradient
        colors={["transparent", THEME.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          width: "100%",
          height: 64,
          left: 0,
          bottom: 0,
          zIndex: 10,
        }}
      />

      {/* Search */}
      <Input
        placeholder={t`Search...`}
        value={search}
        onChangeText={(newSearch) => setSearch(newSearch)}
      />

      {/* List */}
      <RadioGroup value={value} onValueChange={() => {}} className="flex-1">
        <FlashList
          data={buttons}
          scrollEnabled
          initialScrollIndex={initialScrollIndex}
          keyExtractor={({ locale }) => locale}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item: { locale, emoji, label }, index }) => (
            <RadioButton
              key={locale}
              onPress={() => onValueChange(locale)}
              buttonsLength={buttons.length}
              index={index}
              nextValue={buttons?.[index + 1]?.locale}
              value={locale}
              activeValue={value}
            >
              {emoji} {label()}
            </RadioButton>
          )}
        />
      </RadioGroup>
    </View>
  );
}
