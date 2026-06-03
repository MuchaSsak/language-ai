import { useCallback, useEffect, useState } from "react";

export default function useCountTimeSpent(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return {
    seconds,
    isActive,
    start,
    pause,
    reset,
    setSeconds,
  };
}
