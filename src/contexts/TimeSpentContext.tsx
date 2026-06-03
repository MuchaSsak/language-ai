import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import useCountTimeSpent from "@/hooks/utils/useCountTimeSpent";
import useCountdown from "@/hooks/utils/useCountdown";

/**
 * Types
 */
type TimeSpentContextValue = {
  timeSpentSeconds: number;
  isActiveTimeSpent: boolean;
  startTimeSpent: () => void;
  pauseTimeSpent: () => void;
  resetTimeSpent: () => void;

  countdownSeconds: number;
  countdownSetSeconds: Dispatch<SetStateAction<number>>;
  countdownPause: () => void;
  countdownStart: () => void;
  countdownReset: () => void;

  initialCountdown: number;
  setInitialCountdown: Dispatch<SetStateAction<number>>;
  setCountdownOnComplete: (callback: () => void) => void;
};

/**
 * Initialize context
 */
const TimeSpentContext = createContext<TimeSpentContextValue>(
  {} as TimeSpentContextValue,
);

/**
 * Provider
 */
export default function TimeSpentProvider({ children }: PropsWithChildren) {
  const {
    seconds: timeSpentSeconds,
    isActive: isActiveTimeSpent,
    start: startTimeSpent,
    pause: pauseTimeSpent,
    reset: resetTimeSpent,
  } = useCountTimeSpent();

  const [initialCountdown, setInitialCountdown] = useState(0);
  const onCompleteRef = useRef<() => void>(() => {});

  const setCountdownOnComplete = useCallback((callback: () => void) => {
    onCompleteRef.current = callback;
  }, []);

  const {
    seconds: countdownSeconds,
    pause: countdownPause,
    start: countdownStart,
    setSeconds: countdownSetSeconds,
    reset: countdownReset,
  } = useCountdown(initialCountdown, () => onCompleteRef.current());

  return (
    <TimeSpentContext.Provider
      value={{
        resetTimeSpent,
        startTimeSpent,
        pauseTimeSpent,
        timeSpentSeconds,
        isActiveTimeSpent,

        countdownSeconds,
        countdownSetSeconds,
        countdownPause,
        countdownStart,
        countdownReset,

        initialCountdown,
        setInitialCountdown,
        setCountdownOnComplete,
      }}
    >
      {children}
    </TimeSpentContext.Provider>
  );
}

/**
 * Hook
 */
export function useTimeSpent() {
  const context = useContext(TimeSpentContext);
  if (context === undefined)
    throw new Error("useTimeSpent was used outside of TimeSpentProvider!");
  return context;
}
