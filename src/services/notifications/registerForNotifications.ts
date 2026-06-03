import { t } from "@lingui/core/macro";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as IntentLauncher from "expo-intent-launcher";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";

import { getAndroidPackageName, serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { TablesUpdate } from "@/typings/database.types";

// Set up notifications handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export type RegisterForNotificationsServiceProps = {
  userId: string;
};

export default async function registerForNotifications({
  userId,
}: RegisterForNotificationsServiceProps) {
  if (Device.isDevice) {
    // 1) Check for permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // 2) Request permissions if not already granted
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Throw error on deny
    if (finalStatus !== "granted") {
      // Open settings to allow notifications
      if (Platform.OS === "android") {
        const packageName = getAndroidPackageName();

        if (packageName) {
          IntentLauncher.startActivityAsync(
            IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS,
            {
              extra: {
                "android.provider.extra.APP_PACKAGE": packageName,
              },
            },
          );
        }
      } else if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
      }

      throw new Error("Permissions not granted to turn on notifications!");
    }

    // 3) Get the push token
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) throw new Error(t`Project ID not found`);

    const { data: pushTokenString } = await Notifications.getExpoPushTokenAsync(
      {
        projectId,
      },
    );

    //  4) Upsert the push token to the user's profile
    const { error: errorUpdateProfile } = await supabase
      .from("profiles")
      .update({ expo_push_token: pushTokenString } as TablesUpdate<"profiles">)
      .eq("user_id", userId);

    if (errorUpdateProfile) throw errorUpdateProfile;

    serviceLog("registerForNotifications", finalStatus);
    return { grantStatus: finalStatus };
  } else {
    throw new Error(t`You must use a physical device for push notifications`);
  }
}
