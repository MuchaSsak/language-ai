import getQuests from "@/services/quests/getQuests";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuests() {
  const query = useQuery({
    queryKey: ["getQuests"],
    queryFn: () => getQuests(),
  });

  return query;
}
