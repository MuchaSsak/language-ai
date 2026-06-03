import { PopUpsMMKV } from "@/navigation/modals/PopUpsModal";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";

export default function useShowGoalsForSession() {
  const [mmkvPopUps] = useMMKVObject<PopUpsMMKV>("pop_ups");
  const isGoalsForSessionAllowed =
    (mmkvPopUps?.goals_for_session && mmkvPopUps?.all) ?? true;

  const [mmkvHideGoalsForSessionUntil, setHideGoalsForSessionUntil] =
    useMMKVString("hide_goals_for_session_until");
  const now = new Date().getTime();
  const hideGoalsForSessionUntil = new Date(
    mmkvHideGoalsForSessionUntil || now,
  );

  const showGoalsForSession =
    isGoalsForSessionAllowed && now >= hideGoalsForSessionUntil.getTime();

  function handleHideGoalsForSession() {
    const now = new Date();

    // Expires in 1 hour
    now.setHours(now.getHours() + 1);

    setHideGoalsForSessionUntil(now.toISOString());
  }

  return { showGoalsForSession, handleHideGoalsForSession };
}
