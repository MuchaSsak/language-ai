import { openURL } from "@/lib/utils";
import { Platform } from "react-native";
import Purchases, { CustomerInfo } from "react-native-purchases";

export type CancelSubscriptionServiceProps = {
  customerInfo?: CustomerInfo;
};

export default async function cancelSubscription({
  customerInfo,
}: CancelSubscriptionServiceProps) {
  if (customerInfo?.managementURL) {
    openURL(customerInfo.managementURL);
    return;
  }

  /**
   * iOS
   */
  if (Platform.OS === "ios") {
    await Purchases.showManageSubscriptions();
    /**
     * Android
     */
  } else {
    openURL("https://play.google.com/store/account/subscriptions");
  }
}
