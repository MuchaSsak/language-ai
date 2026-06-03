import { t } from "@lingui/core/macro";

export const SERVICES_LOGS = false;
export const HOOK_LOGS = true;

export const PACKAGE_NAME = "com.linkoglot.app";

export const CONTACT_EMAIL = "contact@gmail.com";
export const PRIVACY_POLICY_LINK =
  "https://enrollo.pl/documents/Privacy_Policy.pdf";
export const TERMS_AND_CONDITIONS_LINK =
  "https://enrollo.pl/documents/Terms_and_Conditions.pdf";
export const GDPR_INFO_LINK = "https://gdpr-info.eu/";

/**
 * Dates
 */
export const DAY_TRANSLATIONS_KEYS: Record<number, () => string> = {
  0: () => t`Sunday`,
  1: () => t`Monday`,
  2: () => t`Tuesday`,
  3: () => t`Wednesday`,
  4: () => t`Thursday`,
  5: () => t`Friday`,
  6: () => t`Saturday`,
} as const;
export const DAY_TRANSLATIONS_ARR = Object.values(DAY_TRANSLATIONS_KEYS);

/**
 * Reports
 */
export const REPORT_CATEGORIES = [
  {
    label: () => t`Technical issues`,
    value: "Technical issues",
  },
  {
    label: () => t`Suggestions`,
    value: "Suggestions",
  },
  {
    label: () => t`Inappriopriate AI content`,
    value: "Inappriopriate AI content",
  },
  {
    label: () => t`Misinformation`,
    value: "Misinformation",
  },
  {
    label: () => t`Other`,
    value: "Other",
  },
  {
    label: () => "",
    value: "Unspecified",
  },
] as const;
