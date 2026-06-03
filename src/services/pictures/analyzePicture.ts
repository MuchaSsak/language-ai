import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { decode } from "base64-arraybuffer";
import * as Crypto from "expo-crypto";
import * as ImageManipulator from "expo-image-manipulator";

const MAX_PICTURE_HEIGHT = 1280;

export type AnalyzePictureServiceProps = { pictureUri: string; userId: string };

export default async function analyzePicture({
  pictureUri,
  userId,
}: AnalyzePictureServiceProps) {
  // 1) Compress and resize
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    pictureUri,
    [{ resize: { height: MAX_PICTURE_HEIGHT } }],
    {
      compress: 0.25,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    },
  );

  const fileName = Crypto.randomUUID();
  const filePath = `${userId}/${fileName}.jpg`;

  // 2) Upload the picture
  const { data, error: uploadError } = await supabase.storage
    .from("pictures")
    .upload(filePath, decode(manipulatedImage.base64!), {
      contentType: "image/jpeg",
      upsert: false,
      metadata: {
        width: manipulatedImage.width,
        height: manipulatedImage.height,
      },
    });

  if (uploadError) throw uploadError;

  serviceLog("analyzePicture", data);
  return data;
}

// TODO: also update RLS in buckets supabase for authenticated instead of public
// ((bucket_id = 'raw-pictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1]) AND (storage.filename(name) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\.[a-zA-Z0-9]+)?$'::text))
