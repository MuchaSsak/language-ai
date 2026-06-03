import { t } from "@lingui/core/macro";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { CONTACT_EMAIL } from "@/lib/constants";
import { SignInViaAppleServiceProps } from "@/services/auth/signInViaApple";
import { supabase } from "@/services/supabase/client";
import { TablesUpdate } from "@/typings/database.types";

// This data is safe to store in the code
GoogleSignin.configure({
  scopes: [],
  webClientId:
    "666295664235-m5a3on33kj4pgf0evagnnkrr2rbnmnn3.apps.googleusercontent.com",
  iosClientId:
    "666295664235-a5kd607tfjo6uii0q1d83r716lhoiu5c.apps.googleusercontent.com",
});

export type SignInViaGoogleServiceProps = SignInViaAppleServiceProps;

export default async function signInViaGoogle({
  consentRequired,
  timeZone,
  consentAnalytics,
  consentMarketing,
  onboardingState,
}: SignInViaGoogleServiceProps) {
  try {
    // 1) Get the user's info from Google including their ID token
    await GoogleSignin.hasPlayServices();
    const { data: userInfo, type } = await GoogleSignin.signIn();
    if (type !== "success") throw new Error(t`Signing in was cancelled`);

    if (userInfo?.idToken) {
      // 2) Authenticate the user with this token
      const { data, error: signInError } =
        await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });

      if (signInError) throw signInError;

      // 3) Update the profile in database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          consent_required: consentRequired,
          consent_marketing: consentMarketing ?? null,
          consent_analytics: consentAnalytics ?? null,
          //TODO: update onboarding state properly a(and in apple sign in)
          time_zone: timeZone,
          learning_language: onboardingState?.learningLanguage,
          expo_push_token: onboardingState?.expoPushToken,
          slide_id: onboardingState?.slideId,
          slide_progress: onboardingState?.slideProgress,
        } as TablesUpdate<"profiles">)
        .eq("user_id", data?.user.id);

      if (updateError) throw updateError;
    } else {
      throw new Error(
        t`Something went wrong with inspecting your profile. Please try again!`,
      );
    }
  } catch (err: any) {
    console.error(err);

    switch (err?.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        throw new Error(t`Oh! Signing in was cancelled!`);
      case statusCodes.SIGN_IN_REQUIRED:
        throw new Error(t`Oops! Signing in is required!`);
      case statusCodes.IN_PROGRESS:
        throw new Error(t`Oops! Signing in was interrupted!`);
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        throw new Error(
          `${t`Uh oh, Google Play Services are currently not available.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
        );
      default:
        throw new Error(
          `${t`Uh oh, something went wrong while trying to sign in via Google`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
        );
    }
  }
}
