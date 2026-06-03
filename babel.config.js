module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          "react-compiler": {
            compilationMode: "all",
            panicThreshold: "all_errors",
            sources: (filename) => {
              return filename.includes("src/");
            },
          },
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      "macros",
      "@lingui/babel-plugin-lingui-macro",
      "@babel/plugin-proposal-export-namespace-from",
      // Always keep reanimated at the very end of the plugins array
      "react-native-reanimated/plugin",
    ],
  };
};
