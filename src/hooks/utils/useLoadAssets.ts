import { useEffect, useState } from "react";

import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";

export default function useLoadAssets() {
  const [isReadyEssentials, setIsReadyEssentials] = useState(false);

  useEffect(() => {
    // Essentials
    (async () => {
      try {
        await Promise.all([Asset.loadAsync([...NavigationAssets])]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsReadyEssentials(true);
      }
    })();

    // Secondary (load in background, don't prolong splash screen)
    (async () => {
      try {
        // Images
        await Asset.loadAsync(require("@/assets/gifs/fire.gif"));
        await Asset.loadAsync(require("@/assets/gifs/generating-ai.gif"));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return isReadyEssentials;
}
