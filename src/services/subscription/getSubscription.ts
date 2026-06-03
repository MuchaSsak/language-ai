import { serviceLog } from "@/lib/utils";
import Purchases from "react-native-purchases";

export type GetSubscriptiotServiceProps = {
  userId: string;
};

export default async function getSubscription({
  userId,
}: GetSubscriptiotServiceProps) {
  try {
    const offerings = await Purchases.getOfferings();
    const { customerInfo } = await Purchases.logIn(userId);

    serviceLog("getSubscription", { customerInfo, offerings });
    return { customerInfo, offerings };
  } catch (err) {
    console.error(err);
    return null;
  }
}
