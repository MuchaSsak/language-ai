import { CONTACT_EMAIL } from "@/lib/constants";
import { serviceLog } from "@/lib/utils";
import saveFile from "@/services/operating-system/saveFile";
import { supabase } from "@/services/supabase/client";
import { t } from "@lingui/core/macro";

export default async function profileExportData() {
  const { data: data, error } = await supabase.rpc("profiles_export_data");

  if (error) throw error;
  if (!data)
    throw new Error(
      `${t`Uh oh, something went wrong whilst trying to export your data.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
    );

  const jsonString = JSON.stringify(data, null, 2);
  const savedFile = await saveFile({ textContents: jsonString });

  serviceLog("profileExportData", savedFile);
  return savedFile;
}
