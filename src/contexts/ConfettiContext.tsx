import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { Confetti, ConfettiMethods } from "react-native-fast-confetti";

/**
 * Initialize context
 */
const CONFETTI_CANCEL_DEBOUNCE_MS = 10_000;

const initialContext: ConfettiMethods = {
  pause: () => {},
  reset: () => {},
  resume: () => {},
  restart: () => {},
};

const ConfettiContext = createContext<ConfettiMethods>(initialContext);

/**
 * Provider
 */
export default function ConfettiProvider({ children }: PropsWithChildren) {
  const confettiMethodsRef = useRef<ConfettiMethods>(initialContext);
  const lastBlastTimeRef = useRef<number | null>(null);

  function setConfettiRef(instance: ConfettiMethods | null) {
    if (instance) confettiMethodsRef.current = instance;
  }

  const debouncedConfettiMethods: ConfettiMethods = {
    ...confettiMethodsRef.current,
    restart: () => {
      const now = Date.now();
      const lastBlast = lastBlastTimeRef.current;

      // Cancel confetti if occurred recently
      if (lastBlast && now - lastBlast < CONFETTI_CANCEL_DEBOUNCE_MS) return;

      lastBlastTimeRef.current = now;
      confettiMethodsRef.current.restart();
    },
  };

  return (
    <ConfettiContext.Provider value={debouncedConfettiMethods}>
      <Confetti
        ref={setConfettiRef}
        fadeOutOnEnd
        fallDuration={6000}
        blastDuration={100}
        count={250}
        verticalSpacing={100}
        autoplay={false}
      />

      {children}
    </ConfettiContext.Provider>
  );
}

/**
 * Hook
 */
export function useConfetti() {
  return useContext(ConfettiContext);
}
