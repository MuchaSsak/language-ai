import { useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";

export default function useAppState(
  onChangeAppState: (status: AppStateStatus) => void,
) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (newAppState) => {
      onChangeAppState(newAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [onChangeAppState]);
}
