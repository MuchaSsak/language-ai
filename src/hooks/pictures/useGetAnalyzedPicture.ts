import getAnalyzedPicture from "@/services/pictures/getAnalyzedPicture";
import { useQuery } from "@tanstack/react-query";

export default function useGetAnalyzedPicture(pictureId: string) {
  const query = useQuery({
    queryKey: ["getAnalyzedPicture"],
    queryFn: () => getAnalyzedPicture({ pictureId }),
  });

  return query;
}
