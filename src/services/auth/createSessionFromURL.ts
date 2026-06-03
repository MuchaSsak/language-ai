import * as QueryParams from "expo-auth-session/build/QueryParams";

import { getURLSearchParam } from "@/lib/utils";
import { SetSessionServiceProps } from "@/services/auth/setSession";

export type CreateSessionFromURLServiceProps = {
  url: string | null;
  setSession: (props: SetSessionServiceProps) => any;
};

export default async function createSessionFromURL({
  setSession,
  url,
}: CreateSessionFromURLServiceProps) {
  if (!url) return null;

  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode)
    throw new Error(`Couldn't obtain the query params (${errorCode})`);
  const access_token = getURLSearchParam(params, "access_token");
  const refresh_token = getURLSearchParam(params, "refresh_token");

  if (!access_token || !refresh_token) return null;
  setSession({ access_token, refresh_token });
}
