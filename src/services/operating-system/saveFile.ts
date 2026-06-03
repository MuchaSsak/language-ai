import { t } from "@lingui/core/macro";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { Platform, Share } from "react-native";

export type SaveFileServiceResult = {
  exists: boolean;
  uri: string;
  type: "saved_to_files" | "copied" | "shared" | "android_saved";
};

export type SaveFileServiceProps = {
  textContents: string;
  fileName?: string;
};

export default async function saveFile({
  fileName: fileNameArg,
  textContents,
}: SaveFileServiceProps): Promise<SaveFileServiceResult> {
  const fileName = fileNameArg || `Linkoglot ${t`exported data`}.json`;

  /**
   * Android
   */
  if (Platform.OS === "android") {
    const permissions =
      await FileSystemLegacy.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted)
      throw new Error(t`We need your permission to save the file!`);

    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

    const destinationFileUri =
      await FileSystemLegacy.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        nameWithoutExtension,
        "application/json",
      );

    await FileSystemLegacy.StorageAccessFramework.writeAsStringAsync(
      destinationFileUri,
      textContents,
      { encoding: FileSystemLegacy.EncodingType.UTF8 },
    );

    return { exists: true, uri: destinationFileUri, type: "android_saved" };
  }

  /**
   * iOS
   */
  if (Platform.OS === "ios") {
    const tempUri = `${FileSystemLegacy.cacheDirectory}${fileName}`;

    await FileSystemLegacy.writeAsStringAsync(tempUri, textContents, {
      encoding: FileSystemLegacy.EncodingType.UTF8,
    });

    try {
      const result = await Share.share({
        url: tempUri,
        title: t`Save your data`,
      });

      if (result.action === Share.sharedAction) {
        const activity = result.activityType?.toLowerCase() || "";

        if (activity.includes("savetofiles"))
          return { exists: true, uri: tempUri, type: "saved_to_files" };

        if (activity.includes("copytopasteboard"))
          return { exists: true, uri: tempUri, type: "copied" };

        return { exists: true, uri: tempUri, type: "shared" };
      } else if (result.action === Share.dismissedAction) {
        throw new Error(t`Oh! File saving was cancelled!`);
      }

      throw new Error(t`Oh! File saving was cancelled!`);
    } catch (error: any) {
      if (error?.message?.includes("cancelled"))
        throw new Error(t`Oh! File saving was cancelled!`);

      throw error;
    }
  }

  throw new Error(
    t`Oh no! Your device's platform is not supported for saving files. That's really sad...`,
  );
}
