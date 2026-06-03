import { t } from "@lingui/core/macro";

import { CONTACT_EMAIL } from "@/lib/constants";
import { supabase } from "@/services/supabase/client";
import { Constants, Tables } from "@/typings/database.types";

export type LatestDocuments = {
  privacyPolicy: Tables<"documents">;
  termsAndConditions: Tables<"documents">;
};

export default async function getLatestDocuments() {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("is_latest", true)
      .limit(Constants.public.Enums.DOCUMENT_TYPE.length);

    if (error) throw error;

    const privacyPolicy = data?.find(
      (doc) => doc.document === "Privacy Policy",
    );
    const termsAndConditions = data?.find(
      (doc) => doc.document === "Terms and Conditions",
    );
    if (!privacyPolicy || !termsAndConditions)
      throw new Error(
        `${t`Uh oh, something went wrong while trying to retrieve the latest legal documents.`} ${t`Please contact us immediately at ${CONTACT_EMAIL}`}`,
      );

    return {
      privacyPolicy,
      termsAndConditions,
    } as LatestDocuments;
  } catch (err) {
    console.error(err);
    return null;
  }
}
