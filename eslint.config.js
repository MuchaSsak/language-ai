// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactCompiler = require("eslint-plugin-react-compiler");
const pluginLingui = require("eslint-plugin-lingui");

module.exports = defineConfig([
  {
    ignores: [
      "dist/**",
      "android/**",
      "node_modules/**",
      "build/**",
      ".expo/**",
    ],
  },
  expoConfig,
  reactCompiler.configs.recommended,
  pluginLingui.configs["flat/recommended"],
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
  },
  {
    plugins: {},

    rules: {
      "no-empty-pattern": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
]);
