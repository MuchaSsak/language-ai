import { useConfetti } from "@/contexts/ConfettiContext";
import {
  CreateFlashcardsStudySessionProps,
  FlashcardsContextValue,
  FlashcardsPreferences,
  initialFlashcardsMMKVState,
  useFlashcards,
} from "@/contexts/FlashcardsContext";
import { useTimeSpent } from "@/contexts/TimeSpentContext";
import { getNextWordsIds } from "@/lib/utils";
import { Tables } from "@/typings/database.types";
import * as Crypto from "expo-crypto";

export function useFlashcardsHelpersUnwrapped(context: FlashcardsContextValue) {
  const {
    flashcardsState: {
      studySet,
      currentIndex,
      unshuffledFlashcards,
      preferences,
      rememberedWordsIds,
      missedWordsIds,
      currentFlashcard,
      totalAnswers,
    },
    debouncedCreateFlashcardsStudySession,
    handleCancelDebounces,
    optimisticSubmitAnswer,
    createFlashcardsStudySession,
    setFlashcardsState,
  } = context;
  const { pauseTimeSpent, resetTimeSpent, startTimeSpent } = useTimeSpent();
  const { isLooped } = preferences;
  const confetti = useConfetti();

  function shuffleFlashcards() {
    if (!studySet) return;

    const shuffled = studySet.words
      .map((item) => ({ item, sortValue: Math.random() }))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ item }) => item);

    setFlashcardsState({ studySet: { ...studySet, words: [...shuffled] } });
  }

  function unshuffleFlashcards() {
    if (!studySet || !unshuffledFlashcards) return;

    setFlashcardsState({
      studySet: { ...studySet, words: [...unshuffledFlashcards] },
    });
  }

  function finishFlashcards() {
    pauseTimeSpent();
    setFlashcardsState({ isFinished: true });

    confetti.restart();
  }

  function restartFlashcards(studySetArg?: Tables<"study_sets">) {
    const usedStudySet = studySetArg ?? studySet;
    if (!usedStudySet) return;

    resetTimeSpent();
    startTimeSpent();

    const newSessionId = Crypto.randomUUID();
    setFlashcardsState({
      ...initialFlashcardsMMKVState,
      sessionId: newSessionId,
      studySet: usedStudySet,
      unshuffledFlashcards: usedStudySet.words,
      currentFlashcard: usedStudySet.words[0],
      preferences: { ...preferences },
    });

    debouncedCreateFlashcardsStudySession({
      newSessionId,
      missedWordsIds: [],
      rememberedWordsIds: [],
      totalAnswers: [],
      masteredWordsIds: [],
    });
  }

  function resetHint() {
    setFlashcardsState({
      hintString: undefined,
      isHintFullyRevealed: false,
      revealedHintIndices: [],
    });
  }

  function swipeUndo() {
    if (!studySet) return;

    const previousIndex = currentIndex - 1;
    const hasPrevious = previousIndex >= 0;
    if (!hasPrevious) return;

    const previousFlashcard = studySet.words[previousIndex];

    setFlashcardsState({
      isFinished: false,
      currentIndex: previousIndex,
      currentFlashcard: previousFlashcard,
    });

    // Study session
    const newStudySession: CreateFlashcardsStudySessionProps = {
      totalAnswers: totalAnswers.filter((id) => id !== previousFlashcard.id),
      rememberedWordsIds: rememberedWordsIds.filter(
        (id) => id !== previousFlashcard.id,
      ),
      missedWordsIds: missedWordsIds.filter(
        (id) => id !== previousFlashcard.id,
      ),
      masteredWordsIds: studySet.mastered_words_ids.filter(
        (id) => id !== previousFlashcard.id,
      ),
    };
    optimisticSubmitAnswer(newStudySession);

    debouncedCreateFlashcardsStudySession(newStudySession);
  }

  function swipeLeft() {
    swipeNext({ isCorrectAnswer: false });
  }

  function swipeRight({
    newMasteredWords,
  }: { newMasteredWords?: string[] } = {}) {
    swipeNext({
      isCorrectAnswer: true,
      newMasteredWords,
    });
  }

  function swipeNext({
    isCorrectAnswer,
    newMasteredWords,
  }: {
    isCorrectAnswer: boolean;
    newMasteredWords?: string[];
  }) {
    if (!studySet) return;

    resetHint();

    if (isLooped) {
      const nextIndex = (currentIndex + 1) % studySet.words.length;
      const nextFlashcard = studySet.words[nextIndex];

      submitAnswer({
        isCorrectAnswer,
        isFinished: false,
        newMasteredWords,
      });

      setFlashcardsState({
        isFinished: false,
        currentIndex: nextIndex,
        currentFlashcard: nextFlashcard,
      });
    } else {
      const nextIndex = currentIndex + 1;
      const hasNext = nextIndex < studySet.words.length;

      submitAnswer({
        isCorrectAnswer,
        isFinished: !hasNext,
        newMasteredWords,
      });
      if (!hasNext) return finishFlashcards();

      const nextFlashcard = studySet.words[nextIndex];

      setFlashcardsState({
        isFinished: false,
        currentIndex: nextIndex,
        currentFlashcard: nextFlashcard,
      });
    }
  }

  function submitAnswer({
    isCorrectAnswer,
    isFinished,
    newMasteredWords,
  }: {
    isCorrectAnswer: boolean;
    isFinished: boolean;
    newMasteredWords?: string[];
  }) {
    if (!currentFlashcard) return;

    // Only unique ones
    let nextTotalAnswers = [
      ...new Set([...totalAnswers, currentFlashcard.foreign_msg]),
    ];

    const { nextRememberedIds, nextMissedIds, nextMasteredIds } =
      getNextWordsIds({
        wordIds: [currentFlashcard.id],
        isCorrect: isCorrectAnswer,
        rememberedIds: rememberedWordsIds,
        missedIds: missedWordsIds,
        masteredIds: !isCorrectAnswer
          ? studySet?.mastered_words_ids
          : newMasteredWords,
      });

    // Study session
    const newStudySession: CreateFlashcardsStudySessionProps = {
      totalAnswers: nextTotalAnswers,
      rememberedWordsIds: nextRememberedIds,
      missedWordsIds: nextMissedIds,
      masteredWordsIds: nextMasteredIds,
    };
    optimisticSubmitAnswer(newStudySession);

    if (isFinished) {
      handleCancelDebounces();
      createFlashcardsStudySession(newStudySession);
    } else {
      debouncedCreateFlashcardsStudySession(newStudySession);
    }
  }

  function setFlashcardsPreferences(
    newPreferences: Partial<FlashcardsPreferences>,
  ) {
    setFlashcardsState({
      preferences: {
        ...preferences,
        ...newPreferences,
      },
    });
  }

  return {
    shuffleFlashcards,
    unshuffleFlashcards,
    swipeLeft,
    swipeRight,
    swipeUndo,
    restartFlashcards,
    setFlashcardsPreferences,
  };
}

export default function useFlashcardsHelpers() {
  return useFlashcardsHelpersUnwrapped(useFlashcards());
}
