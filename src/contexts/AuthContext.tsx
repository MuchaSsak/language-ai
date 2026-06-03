import { queryClient } from "@/services/tanstack-query/client";
import { UseQueryResult } from "@tanstack/react-query";
import { useLinkingURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useMMKVObject } from "react-native-mmkv";
import {
  disableTracking,
  enableTracking,
  identifyDevice,
} from "vexo-analytics";

import useCreateSessionFromURL from "@/hooks/auth/useCreateSessionFromURL";
import useGetProfile from "@/hooks/profiles/useGetProfile";
import useGetSubscription from "@/hooks/subscription/useGetSubscription";
import useConsent from "@/hooks/utils/useConsent";
import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";
import { CustomerInfo, PurchasesOfferings } from "react-native-purchases";

/**
 * Types
 */
type AuthContextValue = UseQueryResult<Tables<"profiles"> | null, Error> & {
  profile?: Tables<"profiles"> | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
};

type CachedSubscription = {
  profileId?: string;
  data?: { customerInfo?: CustomerInfo; offerings?: PurchasesOfferings };
} | null;

/**
 * Initialize context
 */
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

/**
 * Provider
 */
export default function AuthProvider({ children }: PropsWithChildren) {
  const query = useGetProfile();
  const { data: profile, isFetched, isError, refetch } = query;
  const { data: subscription, refetch: refetchSubscription } =
    useGetSubscription();
  const bootstrappedRef = useRef(false);

  const { hasConsentedAnalytics } = useConsent();

  const [mmkvCachedProfile, setMmkvCachedProfile] =
    useMMKVObject<Tables<"profiles"> | null>("cached_profile");
  const [mmkvCachedSubscription, setMmkvCachedSubscription] =
    useMMKVObject<CachedSubscription>("cached_subscription");

  const isAuthenticated = !!(profile && isFetched && !isError);
  const isSubscribed = !!(
    (subscription?.customerInfo.activeSubscriptions &&
      (subscription?.customerInfo.activeSubscriptions?.length ?? 0) > 0) ||
    profile?.is_subscribed ||
    // TODO:
    true
  );

  // Required for web
  WebBrowser.maybeCompleteAuthSession();

  // Handle linking into this RN app from an email app.
  const { mutate: createSessionFromURL, isSuccess } = useCreateSessionFromURL();
  const url = useLinkingURL();
  useEffect(() => {
    if (profile) return;
    if (url) createSessionFromURL({ url });
  }, [url, createSessionFromURL, profile]);

  // Analytics
  useEffect(() => {
    if (!profile) return;

    if (hasConsentedAnalytics) {
      identifyDevice(profile.email);
      enableTracking();
    } else {
      identifyDevice(null);
      disableTracking();
    }
  }, [hasConsentedAnalytics, profile]);

  // Fetch the session once, and subscribe to auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refetch();
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [refetch, isSuccess]);

  //   TODO: Refactor and make pretty :) thanks copilot
  // Fast bootstrap from MMKV cache: populate Tanstack Query cache with last-known values for authentication and subscription check
  useEffect(() => {
    try {
      if (mmkvCachedProfile) {
        queryClient.setQueryData(["getProfile"], mmkvCachedProfile);
      }

      if (mmkvCachedSubscription) {
        const profileId =
          mmkvCachedSubscription.profileId ?? mmkvCachedProfile?.id;
        if (profileId) {
          // set exact subscription key for the profile
          queryClient.setQueryData(
            ["getSubscription", profileId],
            mmkvCachedSubscription.data as any,
          );
          // also set any subscription queries that match base key
          queryClient.setQueriesData(
            { predicate: (q) => q.queryKey?.[0] === "getSubscription" },
            () => mmkvCachedSubscription.data as any,
          );
        }
      }
    } catch (err) {
      console.warn("Auth bootstrap MMKV cache failed", err);
    }
  }, [mmkvCachedProfile, mmkvCachedSubscription]);

  // Persist profile and subscription to cache when they change, and trigger background revalidation once
  useEffect(() => {
    if (!bootstrappedRef.current) {
      // ensure we only trigger the first revalidation after mounting
      bootstrappedRef.current = true;
      // background revalidation: refresh both profile and subscription without blocking render
      (async () => {
        try {
          // refetch profile and subscription to get canonical state
          refetch();
          // subscription query may depend on profile; wait briefly then refetch if available
          setTimeout(() => {
            try {
              refetchSubscription();
            } catch (e) {
              /* ignore */
            }
          }, 250);
        } catch (e) {
          console.warn("background revalidation failed", e);
        }
      })();
    }

    try {
      if (profile) setMmkvCachedProfile(profile ?? null);
      if (subscription)
        setMmkvCachedSubscription({
          profileId: profile?.id,
          data: subscription,
        });
    } catch (err) {
      console.warn("Auth MMKV persist failed", err);
    }
  }, [
    profile,
    subscription,
    refetch,
    refetchSubscription,
    setMmkvCachedProfile,
    setMmkvCachedSubscription,
  ]);

  return (
    <AuthContext.Provider
      value={{
        ...query,
        profile,
        isAuthenticated,
        isSubscribed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth was used outside of AuthProvider!");
  return context;
}
