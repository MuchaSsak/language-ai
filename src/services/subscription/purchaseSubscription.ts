import Purchases, { PurchasesPackage } from "react-native-purchases";

export type PurchaseSubscriptionServiceProps = {
  pkg: PurchasesPackage;
};

export default async function purchaseSubscription({
  pkg,
}: PurchaseSubscriptionServiceProps) {
  const customerInfo = await Purchases.getCustomerInfo();
  const activeProductIdentifier = customerInfo.activeSubscriptions[0];

  await Purchases.purchasePackage(
    pkg,
    // Swap the old subscription for the new one to avoid having 2 at once
    activeProductIdentifier ? { oldSKU: activeProductIdentifier } : null,
  );
}
