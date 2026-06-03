import { supabase } from "@/services/supabase/client";
import { TablesInsert } from "@/typings/database.types";

export type CreateReportServiceProps = {
  newReport: TablesInsert<"reports">;
};

export default async function createReport({
  newReport,
}: CreateReportServiceProps) {
  const { error } = await supabase.from("reports").insert(newReport);

  if (error) throw error;
}
