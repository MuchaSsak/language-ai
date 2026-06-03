import { PACKAGE_NAME } from "@/lib/constants";
import { t } from "@lingui/core/macro";
import * as Linking from "expo-linking";
import * as StoreReview from "expo-store-review";
import { Platform } from "react-native";

export default async function storeReview() {
  if (await StoreReview.hasAction()) {
    await StoreReview.requestReview();
  } else {
    // iOS
    if (Platform.OS === "ios") {
      const itunesItemId = 982107779;
      try {
        await Linking.openURL(
          `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`,
        );
      } catch {
        await Linking.openURL(
          `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`,
        );
      }
      // Android
    } else if (Platform.OS === "android") {
      try {
        await Linking.openURL(`market://details?id=${PACKAGE_NAME}`);
      } catch {
        await Linking.openURL(
          `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`,
        );
      }
    } else {
      throw new Error(
        t`Uh oh, it seems that your system is not supported for this feature...`,
      );
    }
  }
}
