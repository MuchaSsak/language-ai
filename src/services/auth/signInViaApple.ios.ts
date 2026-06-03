import { t } from "@lingui/core/macro";
import * as AppleAuthentication from "expo-apple-authentication";

import { CONTACT_EMAIL } from "@/lib/constants";
import { supabase } from "@/services/supabase/client";

export default async function signInViaApple() {
  try {
    // 1) Retrieve the user's credentials from the Apple popup
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    // 2) Sign in to Supabase using those credentials
    if (credential.identityToken) {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });

      if (error) throw error;
    } else
      throw new Error(
        `${t`Uh oh, something went wrong while trying to sign in via Apple.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
      );
  } catch (err: any) {
    switch (err.code) {
      case "ERR_REQUEST_CANCELED":
        throw new Error(t`Oh! Signing in was cancelled!`);

      default:
        throw new Error(
          t`Uh oh, something went wrong while trying to sign in via Apple.` +
            t` Please contact us immediately at ${CONTACT_EMAIL}`,
        );
    }
  }
}
