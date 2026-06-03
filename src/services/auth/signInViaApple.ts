import { t } from "@lingui/core/macro";

import { OnboardingMMKVState } from "@/contexts/OnboardingContext";
import { CONTACT_EMAIL } from "@/lib/constants";
import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

const redirectUri = AuthSession.makeRedirectUri();

export type SignInViaAppleServiceProps = {
  timeZone: string;
  consentRequired: Tables<"profiles">["consent_required"];
  consentMarketing?: Tables<"profiles">["consent_marketing"];
  consentAnalytics?: Tables<"profiles">["consent_analytics"];
  onboardingState?: OnboardingMMKVState;
};

export default async function signInViaApple({
  consentRequired,
  timeZone,
  consentMarketing,
  consentAnalytics,
  onboardingState,
}: SignInViaAppleServiceProps) {
  try {
    // 1) Begin authenticating the user with oAuth
    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: redirectUri, skipBrowserRedirect: true },
    });

    if (signInError) throw signInError;

    // 2) Open browser to sign in via Apple
    if (data?.url) {
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUri,
      );

      if (result.type === "cancel") throw { code: "ERR_REQUEST_CANCELED" };
    }

    // 2) Update profile in database
    // const { error: updateError } = await supabase
    //   .from("profiles")
    //   .update({
    //     consent_required: consentRequired,
    //     consent_optional: consentOptional ? consentOptional : null,...onboardingState
    //   })
    //   .eq("user_id", data?.user.id);

    // if (updateError) throw updateError;

    serviceLog("signInViaApple", "TODO");
  } catch (err: any) {
    switch (err.code) {
      case "ERR_REQUEST_CANCELED":
        throw new Error(t`Oh! Signing in was cancelled!`);

      default:
        throw new Error(
          `${t`Uh oh, something went wrong while trying to sign in via Apple.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
        );
    }
  }
}
