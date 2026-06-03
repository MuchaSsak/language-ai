import { serviceLog } from "@/lib/utils";
import { supabase } from "@/services/supabase/client";
import { Tables } from "@/typings/database.types";

export type GetAnalyzedPictureServiceProps = {
  pictureId: string;
};

export default async function getAnalyzedPicture({
  pictureId,
}: GetAnalyzedPictureServiceProps) {
  try {
    const { data, error } = await supabase
      .from("pictures")
      .select("*")
      .eq("id", pictureId)
      .maybeSingle();

    if (error) throw error;

    serviceLog("getAnalyzedPicture", data);
    return data as Tables<"pictures">;
  } catch (err) {
    console.error(err);
    return null;
  }
}
