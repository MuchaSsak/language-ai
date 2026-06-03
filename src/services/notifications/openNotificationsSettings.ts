import * as IntentLauncher from "expo-intent-launcher";
import { Linking, Platform } from "react-native";

import { getAndroidPackageName } from "@/lib/utils";

export default async function openNotificationsSettings() {
  if (Platform.OS !== "android") {
    await Linking.openSettings();
    return;
  }

  const packageName = getAndroidPackageName();

  if (!packageName) {
    await Linking.openSettings();
    return;
  }

  await IntentLauncher.startActivityAsync(
    IntentLauncher.ActivityAction["APP_NOTIFICATION_SETTINGS"],
    {
      extra: {
        "android.provider.extra.APP_PACKAGE": packageName,
      },
    },
  );
}
