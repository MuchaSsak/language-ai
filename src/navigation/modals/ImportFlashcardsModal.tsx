import ImportFlashcardsFormData from "@/components/study-sets/ImportFlashcardsFormData";
import ImportFlashcardsFormSeparators from "@/components/study-sets/ImportFlashcardsFormSeparators";
import ImportFlashcardsFormSubmit from "@/components/study-sets/ImportFlashcardsFormSubmit";
import { Text } from "@/components/ui/text";
import useStudySetHelpers from "@/hooks/study-sets/useStudySetHelpers";
import { importFlashcardsSchema } from "@/lib/zodSchemas";
import { NavigationRouteParams } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  useWatch,
} from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

/**
 * Types
 */
export type ImportFlashcardsMethod = "quizlet" | "anki" | "csv" | "paste-text";

type ImportFlashcardsFormStructure = z.infer<typeof importFlashcardsSchema>;

export type ImportFlashcardsFormControl = Control<
  ImportFlashcardsFormStructure,
  unknown,
  ImportFlashcardsFormStructure
>;
export type ImportFlashcardsFormErrors =
  FieldErrors<ImportFlashcardsFormStructure>;
export type ImportFlashcardsFormHandleSubmit = UseFormHandleSubmit<
  ImportFlashcardsFormStructure,
  ImportFlashcardsFormStructure
>;

type ImportFlashcardsFormModalProps =
  NavigationRouteParams<"ImportFlashcardsForm"> & {};

export default function ImportFlashcardsFormModal({
  route,
}: ImportFlashcardsFormModalProps) {
  const { t } = useLingui();
  const { getDefaultImportSeparators, clearSeparator, importFlashcards } =
    useStudySetHelpers();
  const defaultSeparators = getDefaultImportSeparators(route.params.method);

  // Hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(importFlashcardsSchema),
    mode: "all",
    defaultValues: {
      data: "",
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

  // Amount of flashcards that will be imported preview
  const data = useWatch({ control, name: "data" });
  const detectedFlashcardsCount = importFlashcards(
    data,
    termsSeparator,
    cardsSeparator,
    false,
  ).flashcardsToAdd.length;

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} className="flex-1">
      <KeyboardAwareScrollView
        contentContainerClassName="flex-grow gap-6 px-5 pt-6"
        bounces={false}
      >
        <View className="flex-1 gap-8">
          <ImportFlashcardsFormData control={control} errors={errors} />
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

          <Text className="text-muted-foreground">
            <Trans>
              Amount of flashcards detected: {detectedFlashcardsCount}
            </Trans>
          </Text>
        </View>

        <ImportFlashcardsFormSubmit handleSubmit={handleSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
