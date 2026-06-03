const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
let config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  isExpoRouter: false,
});

config.transformer.routerRoot = null;

config = withNativeWind(config, {
  input: "./src/globals.css",
  inlineRem: 16,
});

/**
 * Lingui
 */
config.transformer.babelTransformerPath =
  require.resolve("@lingui/metro-transformer/expo");
config.resolver.sourceExts.push("po", "pot");

module.exports = config;
