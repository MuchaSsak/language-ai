import getProfile from "@/services/profiles/getProfile";
import { useQuery } from "@tanstack/react-query";

export default function useGetProfile() {
  const query = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
  });

  return query;
}
