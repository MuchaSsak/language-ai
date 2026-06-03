import { QuizAIResponseRefined } from "@/services/openrouter/createQuizQuestionsAI";
import { StudySetAIResponseRefined } from "@/services/openrouter/generateFlashcardsAI";
import * as Crypto from "expo-crypto";

export const IS_TESTING_MOCKS = __DEV__ && true;

/**
 * Create quiz questions
 */
const SAME_WORD_ID = Crypto.randomUUID();
export const CREATE_QUIZ_QUESTIONS_MOCK: QuizAIResponseRefined = {
  is_success: true,
  concerns: undefined,
  general_comment: "All went good broski",
  english_ai_prompt_decline: undefined,
  display_ai_prompt_decline: undefined,

  questions: [
    {
      id: Crypto.randomUUID(),
      question_native_msg: "Test question",
      question_foreign_msg: "Testowe pytanie",
      is_extra_difficult: false,
      answers: [
        {
          is_correct: true,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "--> Prawdziwa odpowiedź <--",
        },
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "To będzie generowane z AI",
        },
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Obym nie bankrutował",
        },
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Ma ktoś pożyczyć tokeny?",
        },
      ],
    },
    {
      id: Crypto.randomUUID(),
      question_native_msg: "Hard question (more than 1 correct answers)",
      question_foreign_msg: "Trudne pytanie (więcej niż 1 prawdziwa odpowiedź)",
      is_extra_difficult: true,
      answers: [
        {
          is_correct: true,
          word_id: SAME_WORD_ID,
          answer_foreign_msg: "ID słowa to samo co w innej odpowiedzi",
        },
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Imagine to missnąć",
        },
        {
          is_correct: true,
          word_id: SAME_WORD_ID,
          answer_foreign_msg: "O tą odpowiedź chodzi",
        },
        {
          is_correct: true,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "A to jeszcze jakaś odpowiedź",
        },
      ],
    },
    {
      id: Crypto.randomUUID(),
      question_native_msg: 'Last question: How to say "apple"?',
      question_foreign_msg: 'Ostatnie pytanie: Jak powiedzieć "apple"?',
      is_extra_difficult: false,
      answers: [
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Gruszka",
        },
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Pomarańcza",
        },
        {
          is_correct: false,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Banan",
        },
        {
          is_correct: true,
          word_id: Crypto.randomUUID(),
          answer_foreign_msg: "Jabłko",
        },
      ],
    },
  ],
};

/**
 * Generate flashcards
 */
export const GENERATE_FLASHCARDS_MOCK: StudySetAIResponseRefined = {
  is_success: true,
  display_ai_prompt_decline: undefined,
  english_ai_prompt_decline: undefined,

  newWords: [
    {
      id: Crypto.randomUUID(),
      native_msg: "Apple",
      native_lang: "en",
      native_example: "Matthew is eating an apple",
      native_explanation: "A round red or green fruit",
      foreign_msg: "Jabłko",
      foreign_lang: "pl",
      foreign_example: "Mateusz je jabłko",
      foreign_explanation: "Okrągły, czerwony lub zielony owoc",
    },
    {
      id: Crypto.randomUUID(),
      native_msg: "Banana",
      native_lang: "en",
      native_example: "Matthew is eating a banana",
      native_explanation: "A yellow fruit (Bruh I'm so creative)",
      foreign_msg: "Banan",
      foreign_lang: "pl",
      foreign_example: "Mateusz je banana",
      foreign_explanation: "Żółty owoc (Bruh ale jestem kreatywny)",
    },
  ],
};
