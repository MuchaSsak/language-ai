import { toast } from "@/components/layout/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import useSignOut from "@/hooks/auth/useSignOut";
import useSecretPress from "@/hooks/utils/useSecretPress";
import useTheme from "@/hooks/utils/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { MoonStar, Sun } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useMMKV } from "react-native-mmkv";
import Animated, {
  FadeInLeft,
  FadeInUp,
  FadeOutLeft,
  FadeOutUp,
} from "react-native-reanimated";

type CongratulationsTopButtonsProps = {};

export default function CongratulationsTopButtons({}: CongratulationsTopButtonsProps) {
  const { t } = useLingui();
  const { THEME, colorScheme, handleChangeTheme } = useTheme();

  const { handleSecretPress, isSuccess, reset: resetSecret } = useSecretPress();
  const mmkv = useMMKV();
  const { mutate: signOut, isPending } = useSignOut();

  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify()}
      exiting={FadeOutUp.duration(250)}
      className="flex-row items-center justify-between flex-1 gap-16"
    >
      <Pressable
        className="flex-grow rounded-full h-11"
        onPress={handleSecretPress}
      />

      <View className="flex-row items-center gap-3">
        {/* Secret refresh */}
        {isSuccess && (
          <Animated.View
            entering={FadeInLeft.duration(300).springify()}
            exiting={FadeOutLeft.duration(250)}
            className="flex-row items-center gap-3"
          >
            <Button
              accessibilityLabel={t`Clear all settings`}
              size="icon"
              variant="accent"
              isLoading={isPending}
              onPress={() =>
                signOut({
                  onSuccess: () => {
                    mmkv.clearAll();
                    toast({
                      type: "info",
                      text1: t`Cleared all settings and signed out!`,
                    });
                    resetSecret();
                  },
                  isSilent: true,
                })
              }
            >
              <Feather name="refresh-cw" size={18} color={THEME.foreground} />
            </Button>
          </Animated.View>
        )}

        {/* Change theme */}
        <Button
          accessibilityLabel={t`Toggle theme`}
          size="icon"
          variant="accent"
          onPress={() =>
            handleChangeTheme(colorScheme === "light" ? "dark" : "light")
          }
        >
          {colorScheme === "light" ? (
            <MoonStar size={20} color={THEME.foreground} />
          ) : (
            <Sun size={20} color={THEME.foreground} />
          )}
        </Button>
      </View>
    </Animated.View>
  );
}
