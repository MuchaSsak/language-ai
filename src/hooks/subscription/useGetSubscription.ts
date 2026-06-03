import { useAuth } from "@/contexts/AuthContext";
import getSubscription from "@/services/subscription/getSubscription";
import { queryClient } from "@/services/tanstack-query/client";
import { Tables } from "@/typings/database.types";
import { useLingui } from "@lingui/react/macro";
import { useQuery } from "@tanstack/react-query";

export default function useGetSubscription() {
  const { t } = useLingui();
  const { profile } = useAuth();

  const cachedProfile = queryClient.getQueryData<Tables<"profiles">>([
    "getProfile",
  ]);
  const profileForQuery = profile ?? cachedProfile;

  const query = useQuery({
    queryKey: ["getSubscription", profileForQuery?.id],
    queryFn: () => {
      if (!profileForQuery)
        throw new Error(
          `${t`Uh oh, you are not signed in yet!`} (useGetSubscription)`,
        );

      return getSubscription({ userId: profileForQuery.user_id });
    },

    enabled: !!profileForQuery?.id,
    retry: 1,
    retryDelay: 3_000,
  });

  return query;
}
