import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Keyboard } from "react-native";

export type SlidesMMKVState<SupportedSlideId extends string = string> = {
  slideProgress: number;
  slideId: SupportedSlideId;
  isFinished: boolean;
};

export type Slide<SupportedSlideId extends string = string> = {
  id: SupportedSlideId;
  Component: ComponentType<any>;
  guard?: boolean;
  shouldSkip?: boolean;
  isHiddenHeaderProgress?: boolean;
  continueButtonText?: (() => string) | null;
  isScrollView?: boolean;
  onPress?: () => void;
  onPressCheck?: boolean;
};

export type SlidesContextValue<SupportedSlideId extends string = string> = {
  slides: Slide<SupportedSlideId>[];
  slideIndex: number;
  previousSlideIndex: number;
  isUserGoingBack: boolean;
  currentSlide: Slide<SupportedSlideId>;
  progress: number;

  handlePreviousSlide: () => void;
  handleSetSlide: (newSlideId: SupportedSlideId) => void;
  handleNextSlide: () => void;
  handleJumpToSkippedSlide: () => boolean;
  isContinueDisabled: boolean;
  setIsContinueDisabled: Dispatch<SetStateAction<boolean>>;
  isContinueLoading: boolean;
  setIsContinueLoading: Dispatch<SetStateAction<boolean>>;
};

/**
 * Hook
 */
type UseHorizontalFlowSlidesHookProps<
  SupportedSlideId extends string = string,
> = {
  baseSlides: Slide<SupportedSlideId>[];
  slidesMMKVState: SlidesMMKVState<SupportedSlideId>;
  setSlidesMMKVState: (
    newState: Partial<SlidesMMKVState<SupportedSlideId>>,
  ) => void;
  onNextSlide?: () => void;
  onFinish?: () => void;
};

export default function useHorizontalFlowSlides<
  SupportedSlideId extends string = string,
>({
  baseSlides,
  setSlidesMMKVState,
  slidesMMKVState,
  onFinish,
  onNextSlide,
}: UseHorizontalFlowSlidesHookProps<SupportedSlideId>) {
  const [slides, setSlides] = useState([...baseSlides]);
  useEffect(() => {
    setSlides([...baseSlides]);
  }, [baseSlides]);

  // Get current slide by either string ID or index number
  const currentSlide =
    slides.find((s) => s.id === slidesMMKVState.slideId) ||
    slides[slidesMMKVState.slideProgress ?? 0];

  const [slideIndex, setSlideIndex] = useState(slides.indexOf(currentSlide));
  const [previousSlideIndex, setPreviousSlideIndex] = useState(-1);

  useEffect(() => {
    Keyboard.dismiss();
    setSlideIndex(slidesMMKVState.slideProgress);
  }, [slidesMMKVState.slideProgress]);

  useEffect(() => {
    if (!onNextSlide) return;
    if (previousSlideIndex < slideIndex) onNextSlide();
  }, [previousSlideIndex, slideIndex, onNextSlide]);

  // Handlers
  function handlePreviousSlide() {
    if (slideIndex <= 0) return;

    const newSlideIndex = slideIndex - 1;
    const isFinished = newSlideIndex >= slides.length - 1;
    const newSlideId = slides[newSlideIndex].id;

    setSlidesMMKVState({
      slideProgress: newSlideIndex,
      slideId: newSlideId,
      isFinished,
    });
    setSlideIndex(newSlideIndex);
    setPreviousSlideIndex(slideIndex);
  }

  function handleSetSlide(
    slides: Slide<SupportedSlideId>[],
    newSlideId: SupportedSlideId,
  ) {
    const newSlide = slides.find((s) => s.id === newSlideId);
    if (!newSlide) return;

    const newSlideIndex = slides.indexOf(newSlide);
    const isUnfinished = newSlideIndex < slides.length - 1;
    const newSlidesMMKVState: SlidesMMKVState<SupportedSlideId> = {
      ...slidesMMKVState,
      slideId: newSlide.id,
      slideProgress: newSlideIndex,
    };

    if (slidesMMKVState.isFinished && !isUnfinished) handleFinishSlide();
    else {
      setSlidesMMKVState({
        ...newSlidesMMKVState,
        isFinished: isUnfinished ? false : undefined,
      });
      setSlideIndex(newSlideIndex);
      setPreviousSlideIndex(slideIndex);
    }
  }

  function handleNextSlide() {
    const newSlideIndex = slideIndex + 1;
    if (newSlideIndex > slides.length - 1) return handleFinishSlide();

    const isUnfinished = newSlideIndex < slides.length - 1;
    const newSlideId = slides[newSlideIndex].id;

    setSlidesMMKVState({
      slideProgress: newSlideIndex,
      slideId: newSlideId,
      isFinished: isUnfinished ? false : undefined,
    });
    setSlideIndex(newSlideIndex);
    setPreviousSlideIndex(slideIndex);
  }

  function handleJumpToSkippedSlide() {
    const firstSkippedSlide = slides.find((s) => s.guard === false);

    if (!firstSkippedSlide) return false;
    handleSetSlide(slides, firstSkippedSlide.id);
    return true;
  }

  function handleFinishSlide() {
    const hasFoundSkipped = handleJumpToSkippedSlide();

    if (hasFoundSkipped) {
      setSlidesMMKVState({ isFinished: false });
      return;
    } else {
      if (onFinish) onFinish();
      else setSlidesMMKVState({ isFinished: true });
    }
  }

  return {
    slides,
    currentSlide,
    slideIndex,
    previousSlideIndex,
    isUserGoingBack:
      previousSlideIndex > slideIndex &&
      previousSlideIndex !== 0 &&
      previousSlideIndex !== slides.length,
    handleNextSlide,
    handlePreviousSlide,
    handleSetSlide: (newSlideId: SupportedSlideId) =>
      handleSetSlide(slides, newSlideId),
    handleJumpToSkippedSlide,
  };
}
