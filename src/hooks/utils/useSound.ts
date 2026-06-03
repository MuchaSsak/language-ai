import { useAudioPlayer } from "expo-audio";
import { useCallback } from "react";

/**
 * Modern SFX hook for Expo SDK 55
 * @param asset The required sound file, e.g., require('./assets/sound.mp3')
 */
export default function useSound(asset: any) {
  //   useAudioPlayer automatically handles loading and clean-up
  const player = useAudioPlayer(asset);

  const playSound = useCallback(() => {
    if (!player) return;
    try {
      // For SFX: Reset to start so it can be spammed/replayed immediately
      if (player.playing) {
        player.pause();
      }
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  }, [player]);

  return { playSound };
}
