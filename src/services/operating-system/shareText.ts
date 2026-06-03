import { t } from "@lingui/core/macro";
import { Share } from "react-native";

export type ShareFileServiceProps = {
  textContents: string;
};

export default async function shareText({
  textContents,
}: ShareFileServiceProps) {
  const result = await Share.share({
    message: textContents,
    title: t`Share via...`,
  });

  if (result.action === Share.dismissedAction)
    throw new Error(t`Oops, sharing was cancelled!`);
}
