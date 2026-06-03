import { OpenRouter, SDKOptions } from "@openrouter/sdk";

// Doing separate clients because I want to separate the API keys in order to have better insight in the activity pannel and token consumption :)
const baseOpenRouterOptions: SDKOptions = {
  appTitle: "Linkoglot",
  appCategories: "Language learning application",
};
const defaultTextToTextModel = "openrouter/owl-alpha";

/**
 * Create quiz
 */
export const OPENROUTER_CREATE_QUIZES_API_KEY =
  process.env.EXPO_PUBLIC_OPENROUTER_CREATE_QUIZES_API_KEY;
export const OPENROUTER_CREATE_QUIZES_MODEL = defaultTextToTextModel;

if (!OPENROUTER_CREATE_QUIZES_API_KEY)
  throw new Error("Missing OPENROUTER_CREATE_QUIZES_API_KEY! ❌");

export const openRouterCreateQuiz = new OpenRouter({
  ...baseOpenRouterOptions,
  apiKey: OPENROUTER_CREATE_QUIZES_API_KEY,
});

/**
 * Generate flashcards
 */
export const OPENROUTER_GENERATE_FLASHCARDS_API_KEY =
  process.env.EXPO_PUBLIC_OPENROUTER_GENERATE_FLASHCARDS_API_KEY;
export const OPENROUTER_GENERATE_FLASHCARDS_MODEL = defaultTextToTextModel;

if (!OPENROUTER_GENERATE_FLASHCARDS_API_KEY)
  throw new Error("Missing OPENROUTER_GENERATE_FLASHCARDS_API_KEY! ❌");

export const openRouterGenerateFlashcards = new OpenRouter({
  ...baseOpenRouterOptions,
  apiKey: OPENROUTER_GENERATE_FLASHCARDS_API_KEY,
});
