import { hookLog } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

export default function useFunctionAfterLeavingApp() {
  const appState = useRef(AppState.currentState);
  const queuedFunction = useRef<() => void | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (!queuedFunction.current || nextState !== "background") return;
      if (!appState.current.match(/active|foreground/)) return;

      hookLog("useFunctionAfterLeavingApp", queuedFunction.current);
      queuedFunction.current();
      queuedFunction.current = null;
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  return queuedFunction;
}
