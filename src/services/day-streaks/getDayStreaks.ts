import { DAY_TRANSLATIONS_KEYS } from "@/lib/constants";
import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";

export default async function getDayStreaks() {
  try {
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("day_streaks")
      .select("created_at")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    if (error) throw error;

    // 1. Generate the last 7 days window
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      return d;
    });

    // 2. Build a quick lookup map keyed by the day index (0-6)
    const processedDaysMap: Record<number, boolean> = {};

    lastSevenDays.forEach((date) => {
      const dayStart = new Date(date).setHours(0, 0, 0, 0);
      const dayEnd = new Date(date).setHours(23, 59, 59, 999);

      const hasStreak = data
        ? data.some((streak) => {
            const streakDate = new Date(streak.created_at).getTime();
            return streakDate >= dayStart && streakDate <= dayEnd;
          })
        : false;

      const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      processedDaysMap[dayIndex] = hasStreak;
    });

    // 3. Map over the DAY_TRANSLATIONS_KEYS keys to force the exact order (0 -> 6)
    const dayStreaks = Object.keys(DAY_TRANSLATIONS_KEYS).map((key) => {
      const dayIndex = Number(key);
      const hasStreak = processedDaysMap[dayIndex] ?? false;

      return hasStreak;
    });

    serviceLog("getDayStreaks", dayStreaks);
    return dayStreaks;
  } catch (err) {
    console.error(err);
    return null;
  }
}
