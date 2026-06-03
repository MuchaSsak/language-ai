import { useQuery } from "@tanstack/react-query";

import getAchievements from "@/services/achievements/getAchievements";

export default function useGetAchievements() {
  const query = useQuery({
    queryKey: ["getAchievements"],
    queryFn: () => getAchievements(),
  });

  return query;
}
