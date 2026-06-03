import ExportFlashcardsFormSubmit from "@/components/study-sets/ExportFlashcardsFormSubmit";
import ImportFlashcardsFormData from "@/components/study-sets/ImportFlashcardsFormData";
import ImportFlashcardsFormSeparators from "@/components/study-sets/ImportFlashcardsFormSeparators";
import useStudySetHelpers from "@/hooks/study-sets/useStudySetHelpers";
import { importFlashcardsSchema } from "@/lib/zodSchemas";
import { NavigationRouteParams } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

type ExportFlashcardsFormModalProps =
  NavigationRouteParams<"ExportFlashcardsForm"> & {};

export default function ExportFlashcardsFormModal({
  route: {
    params: { flashcards },
  },
}: ExportFlashcardsFormModalProps) {
  const { t } = useLingui();
  const { exportFlashcards, getDefaultImportSeparators, clearSeparator } =
    useStudySetHelpers();
  const defaultSeparators = getDefaultImportSeparators();

  // Hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    // TODO: ts
    resolver: zodResolver(importFlashcardsSchema),
    mode: "all",
    defaultValues: {
      data: exportFlashcards(
        defaultSeparators.termsSeparator,
        defaultSeparators.cardsSeparator,
      ),
      termsSeparator: defaultSeparators.termsSeparator,
      cardsSeparator: defaultSeparators.cardsSeparator,
    },
  });

  // The zod errors are broken here for some reason bro
  const termsSeparator = useWatch({ control, name: "termsSeparator" });
  const cardsSeparator = useWatch({ control, name: "cardsSeparator" });
  const missingSeparators =
    !clearSeparator(termsSeparator) || !clearSeparator(cardsSeparator);
  const sameSeparators =
    clearSeparator(termsSeparator) === clearSeparator(cardsSeparator);

  // Sync data
  useEffect(() => {
    setValue(
      "data",
      exportFlashcards(termsSeparator, cardsSeparator, flashcards),
    );
  }, [termsSeparator, cardsSeparator, exportFlashcards, setValue, flashcards]);

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} className="flex-1">
      <KeyboardAwareScrollView
        contentContainerClassName="flex-grow gap-6 px-5 pt-6"
        bounces={false}
      >
        <View className="flex-1 gap-8">
          <ImportFlashcardsFormData
            isExportMode
            control={control}
            errors={errors}
          />
          <ImportFlashcardsFormSeparators
            control={control}
            errors={{
              ...errors,
              termsSeparator: {
                message: missingSeparators
                  ? t`Separator is missing!`
                  : sameSeparators
                    ? t`Separators cannot be the exact same!`
                    : undefined,
                type: "custom",
              },
            }}
          />
        </View>

        <ExportFlashcardsFormSubmit handleSubmit={handleSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
