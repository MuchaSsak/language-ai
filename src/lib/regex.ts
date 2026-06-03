export const LETTERS_AND_NUMBERS_REGEX = /[^\p{L}\p{N}\s]/gu;

export const CLEAN_SPEECH_REGEX = /[^\p{L}\p{N}\s.,'!?]/gu;

export const IS_MANUAL_FLASHCARD_SEPARATOR = /^(manual-)/;
export const IS_UNSANITIZED_FLASHCARD_SEPARATOR = /^(manual-|custom-)/;
