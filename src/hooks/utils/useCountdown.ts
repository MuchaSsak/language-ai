import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown(
  initialSeconds: number,
  onComplete?: () => void,
) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isActive || initialSeconds < 0) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          onCompleteRef.current?.();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, initialSeconds]);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const start = useCallback(() => {
    if (initialSeconds < 0) return;
    setIsActive(true);
  }, [initialSeconds]);
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
