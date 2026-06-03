const fs = require("fs");
const path = require("path");

// Expo/Metro dev builds can request generic @Nx PNG assets from
// @react-navigation/elements, while the package only ships Android-specific
// variants such as `search-icon@3x.android.png`. Create the generic aliases so
// Metro can serve them reliably on Android.
const assetDirs = [
  path.join(
    // eslint-disable-next-line no-undef
    __dirname,
    "..",
    "node_modules",
    "@react-navigation",
    "elements",
    "lib",
    "module",
    "assets",
  ),
  path.join(
    // eslint-disable-next-line no-undef
    __dirname,
    "..",
    "node_modules",
    "@react-navigation",
    "elements",
    "src",
    "assets",
  ),
];

const iconNames = ["back-icon", "search-icon"];
const densities = [1, 2, 3, 4];

let copied = 0;

for (const assetDir of assetDirs) {
  if (!fs.existsSync(assetDir)) {
    continue;
  }

  for (const iconName of iconNames) {
    for (const density of densities) {
      const genericAsset = path.join(assetDir, `${iconName}@${density}x.png`);
      const androidAsset = path.join(
        assetDir,
        `${iconName}@${density}x.android.png`,
      );

      if (!fs.existsSync(genericAsset) && fs.existsSync(androidAsset)) {
        fs.copyFileSync(androidAsset, genericAsset);
        copied += 1;
      }
    }
  }
}

if (copied > 0) {
  console.log(
    `[postinstall] Created ${copied} React Navigation asset aliases for Metro.`,
  );
}
