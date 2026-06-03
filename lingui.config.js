import { defineConfig } from "@lingui/cli";

import {
  DEFAULT_LANGUAGE,
  SOURCE_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "./src/lib/locales";

export default defineConfig({
  sourceLocale: SOURCE_LANGUAGE,
  locales: [...SUPPORTED_LANGUAGES],
  fallbackLocales: {
    default: DEFAULT_LANGUAGE,
  },
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
