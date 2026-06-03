import useAppState from "@/hooks/tanstack-query/useAppState";
import useOnlineManager from "@/hooks/tanstack-query/useOnlineManager";
import { onAppStateChange } from "@/services/tanstack-query/appStateChange";

export default function useLoadTanstackQuery() {
  useOnlineManager();
  useAppState(onAppStateChange);
}
