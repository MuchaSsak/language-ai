import { hookLog } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

export default function useFunctionAfterReturnToApp() {
  const queuedFunction = useRef<() => void | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (!queuedFunction.current || nextState !== "active") return;

      hookLog("useFunctionAfterReturnToApp", queuedFunction.current);
      queuedFunction.current();
      queuedFunction.current = null;
    });

    return () => subscription.remove();
  }, []);

  return queuedFunction;
}
