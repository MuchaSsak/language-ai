import getChallenge from "@/services/challenge/getChallenge";
import { useQuery } from "@tanstack/react-query";

export default function useGetChallenge() {
  const query = useQuery({
    queryKey: ["getChallenge"],
    queryFn: () => getChallenge(),
  });

  return query;
}
