import { useQuery } from "@tanstack/react-query";

import getLatestDocuments from "@/services/documents/getLatestDocuments";

export default function useGetLatestDocuments() {
  const query = useQuery({
    queryKey: ["getLatestDocuments"],
    queryFn: () => getLatestDocuments(),
  });

  return query;
}
