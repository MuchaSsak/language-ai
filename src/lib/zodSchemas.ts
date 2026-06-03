import { REPORT_CATEGORIES } from "@/lib/constants";
import { DEFAULT_LANGUAGE } from "@/lib/locales";
import allMessages from "@/locales/allMessages";
import { i18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { z } from "zod";

i18n.loadAndActivate({
  locale: DEFAULT_LANGUAGE,
  messages: allMessages[DEFAULT_LANGUAGE],
});

/**
 * Study sets
 */
export const MIN_STUDY_SET_TITLE_LENGTH = 2;
export const MAX_STUDY_SET_TITLE_LENGTH = 64;

export const MIN_STUDY_SET_GENERATE_AI_PROMPT_LENGTH = 7;
export const MAX_STUDY_SET_GENERATE_AI_PROMPT_LENGTH = 1024;
export const MIN_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT = 1;
export const DEFAULT_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT = 10;
export const MAX_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT = 150;

export const MIN_FLASHCARD_NATIVE_MSG_LENGTH = 1;
export const MAX_FLASHCARD_NATIVE_MSG_LENGTH = 512;
export const MIN_FLASHCARD_FOREIGN_MSG_LENGTH = 1;
export const MAX_FLASHCARD_FOREIGN_MSG_LENGTH = 512;
export const MIN_FLASHCARD_EXPLANATION_SENTENCE_LENGTH = 1;
export const MAX_FLASHCARD_EXPLANATION_SENTENCE_LENGTH = 2048;
export const MIN_FLASHCARD_EXAMPLE_SENTENCE_LENGTH = 1;
export const MAX_FLASHCARD_EXAMPLE_SENTENCE_LENGTH = 2048;

export const MIN_IMPORT_FLASHCARDS_DATA_LENGTH = 1;
export const MAX_IMPORT_FLASHCARDS_DATA_LENGTH = 1_048_576;

export const studySetTitle = z
  .string((() => t`Title is missing!`)())
  .trim()
  .min(MIN_STUDY_SET_TITLE_LENGTH, {
    message: (() =>
      t`Title should be at least ${MIN_STUDY_SET_TITLE_LENGTH} characters long`)(),
  })
  .max(MAX_STUDY_SET_TITLE_LENGTH, {
    message: (() =>
      t`Title cannot be longer than ${MAX_STUDY_SET_TITLE_LENGTH} characters`)(),
  });

export const studySetSchema = z.object({
  title: studySetTitle,
});

export const studySetGenerateAIPrompt = z
  .string((() => t`Prompt is missing!`)())
  .trim()
  .min(MIN_STUDY_SET_GENERATE_AI_PROMPT_LENGTH, {
    message: (() =>
      t`Please make the prompt for the AI a little bit longer!`)(),
  })
  .max(MAX_STUDY_SET_GENERATE_AI_PROMPT_LENGTH, {
    message: (() =>
      t`Prompt cannot be longer than ${MAX_STUDY_SET_GENERATE_AI_PROMPT_LENGTH} characters`)(),
  });

export const studySetGenerateNewFlashcardsCount = z.coerce
  .number({
    error: (() => t`Count must be a valid number`)(),
  })
  .min(MIN_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT, {
    message: (() =>
      t`Count must be at least ${MIN_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT}`)(),
  })
  .max(MAX_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT, {
    message: (() =>
      t`Count cannot be greater than ${MAX_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT}`)(),
  })
  .default(DEFAULT_STUDY_SET_GENERATE_AI_NEW_FLASHCARDS_COUNT);

export const studySetGenerateAISchema = z.object({
  prompt: studySetGenerateAIPrompt,
  newFlashcardsCount: studySetGenerateNewFlashcardsCount,
});

export const flashcardNativeMsg = z
  .string((() => t`Term is missing!`)())
  .trim()
  .min(MIN_FLASHCARD_NATIVE_MSG_LENGTH, {
    message: (() =>
      t`Term should be at least ${MIN_FLASHCARD_NATIVE_MSG_LENGTH} characters long`)(),
  })
  .max(MAX_FLASHCARD_NATIVE_MSG_LENGTH, {
    message: (() =>
      t`Term cannot be longer than ${MAX_FLASHCARD_NATIVE_MSG_LENGTH} characters`)(),
  });

export const flashcardForeignMsg = z
  .string((() => t`Definition is missing!`)())
  .trim()
  .min(MIN_FLASHCARD_FOREIGN_MSG_LENGTH, {
    message: (() =>
      t`Definition should be at least ${MIN_FLASHCARD_FOREIGN_MSG_LENGTH} characters long`)(),
  })
  .max(MAX_FLASHCARD_FOREIGN_MSG_LENGTH, {
    message: (() =>
      t`Definition cannot be longer than ${MAX_FLASHCARD_FOREIGN_MSG_LENGTH} characters`)(),
  });

export const flashcardExplanationSentence = z
  .string()
  .trim()
  .min(MIN_FLASHCARD_EXPLANATION_SENTENCE_LENGTH, {
    message: (() =>
      t`Explanation should be at least ${MIN_FLASHCARD_EXPLANATION_SENTENCE_LENGTH} characters long`)(),
  })
  .max(MAX_FLASHCARD_EXPLANATION_SENTENCE_LENGTH, {
    message: (() =>
      t`Explanation cannot be longer than ${MAX_FLASHCARD_EXPLANATION_SENTENCE_LENGTH} characters`)(),
  })
  .optional()
  .or(z.literal(""));

export const flashcardExampleSentence = z
  .string()
  .trim()
  .min(MIN_FLASHCARD_EXAMPLE_SENTENCE_LENGTH, {
    message: (() =>
      t`Example should be at least ${MIN_FLASHCARD_EXAMPLE_SENTENCE_LENGTH} characters long`)(),
  })
  .max(MAX_FLASHCARD_EXAMPLE_SENTENCE_LENGTH, {
    message: (() =>
      t`Example cannot be longer than ${MAX_FLASHCARD_EXAMPLE_SENTENCE_LENGTH} characters`)(),
  })
  .optional()
  .or(z.literal(""));

export const flashcardSchema = z.object({
  native_msg: flashcardNativeMsg,
  foreign_msg: flashcardForeignMsg,
  native_explanation: flashcardExplanationSentence,
  foreign_explanation: flashcardExplanationSentence,
  native_example: flashcardExampleSentence,
  foreign_example: flashcardExampleSentence,
});

export const importFlashcardsData = z
  .string((() => t`Data is missing!`)())
  .min(MIN_IMPORT_FLASHCARDS_DATA_LENGTH, {
    message: (() =>
      t`Data should be at least ${MIN_IMPORT_FLASHCARDS_DATA_LENGTH} characters long`)(),
  })
  .max(MAX_IMPORT_FLASHCARDS_DATA_LENGTH, {
    message: (() =>
      t`Data cannot be longer than ${MAX_IMPORT_FLASHCARDS_DATA_LENGTH} characters`)(),
  });

export const importFlashcardsTermsSeparator = z.string(
  (() => t`Separator between terms and definitions is missing!`)(),
);

export const importFlashcardsCardsSeparator = z.string(
  (() => t`Separator between cards is missing!`)(),
);

export const importFlashcardsSchema = z.object({
  data: importFlashcardsData,
  termsSeparator: importFlashcardsTermsSeparator,
  cardsSeparator: importFlashcardsCardsSeparator,
});

/**
 * Sign-in
 */
export const emailSchema = z
  .string()
  .trim()
  .email({
    message: (() => t`Please enter a valid email!`)(),
  });

/**
 * Account
 */
export const MIN_USERNAME_LENGTH = 1;
export const MAX_USERNAME_LENGTH = 256;

export const usernameSchema = z
  .string()
  .trim()
  .min(MIN_USERNAME_LENGTH, {
    message: (() =>
      t`Your name should be at least ${MIN_USERNAME_LENGTH} characters long`)(),
  })
  .max(MAX_USERNAME_LENGTH, {
    message: (() =>
      t`Your name cannot be longer than ${MAX_USERNAME_LENGTH} characters`)(),
  })
  .optional()
  .or(z.literal(""));

export const accountSchema = z.object({
  username: usernameSchema,
});

/**
 * Reports
 */
export const MIN_REPORT_DESCRIPTION_LENGTH = 5;
export const MAX_REPORT_DESCRIPTION_LENGTH = 3000;

export const reportCategorySchema = z
  .object({
    value: z.enum(
      REPORT_CATEGORIES.map(
        (cat) => cat.value as (typeof REPORT_CATEGORIES)[number]["value"],
      ),
    ),
    label: z.string(),
  })
  .optional();

export const reportDescriptionSchema = z
  .string((() => t`Description is missing!`)())
  .trim()
  .min(MIN_REPORT_DESCRIPTION_LENGTH, {
    message: (() =>
      t`Description should be at least ${MIN_REPORT_DESCRIPTION_LENGTH} characters long`)(),
  })
  .max(MAX_REPORT_DESCRIPTION_LENGTH, {
    message: (() =>
      t`Description cannot be longer than ${MAX_REPORT_DESCRIPTION_LENGTH} characters`)(),
  });

export const reportFormSchema = z.object({
  category: reportCategorySchema,
  description: reportDescriptionSchema,
});
