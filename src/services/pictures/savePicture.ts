// import { t } from "@lingui/core/macro";
// import * as FileSystem from "expo-file-system/legacy";
// // import * as Sharing from "expo-sharing";
// import { Platform } from "react-native";

// async function savePicture(pictureUri: string) {
//   if (!pictureUri) return;

//   if (Platform.OS === "android") {
//     const permissions =
//       await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

//     if (permissions.granted) {
//       const fileName = `${t`Picture`}-${Date.now()}.jpg`;

//       const destinationUri =
//         await FileSystem.StorageAccessFramework.createFileAsync(
//           permissions.directoryUri,
//           fileName,
//           "image/jpeg",
//         );

//       await FileSystem.copyAsync({
//         from: pictureUri,
//         to: destinationUri,
//       });
//     }
//   }

//   //   TODO: Sharing
//   //   if (Platform.OS === "ios") {
//   //     if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(pictureUri);
//   //     else throw new Error(t`Sharing is not available on this device.`);
//   //   }
// }

// export default savePicture;

import { t } from "@lingui/core/macro";
import * as MediaLibrary from "expo-media-library";

export type SavePictureServiceProps = {
  pictureUri: string;
};

export default async function savePicture({
  pictureUri,
}: SavePictureServiceProps) {
  if (!pictureUri) return;

  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status === "granted") {
    await MediaLibrary.createAssetAsync(pictureUri);
  } else throw new Error(t`Please allow access to save photos!`);
}
