import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const NEXT_LOADING_MESSAGE_TEXT_TRANSITION_TIME = 3_000;
const LOADING_MESSAGE_TEXT_FADE_TIME = 300;

type LoadingTextProps = {
  messages: string[];
  textClassName?: string;
};

export default function LoadingText({
  messages,
  textClassName,
}: LoadingTextProps) {
  const textOpacity = useSharedValue(1);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length <= 1) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const intervalId = setInterval(() => {
      // 1. Start fading the text out smoothly
      textOpacity.value = withTiming(0, {
        duration: LOADING_MESSAGE_TEXT_FADE_TIME,
      });

      // 2. Wait for the fade-out to finish, swap the text, then fade it back in
      timeoutId = setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        textOpacity.value = withTiming(1, {
          duration: LOADING_MESSAGE_TEXT_FADE_TIME,
        });
      }, LOADING_MESSAGE_TEXT_FADE_TIME);
    }, NEXT_LOADING_MESSAGE_TEXT_TRANSITION_TIME);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [messages, textOpacity]);

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <Animated.View style={textStyle}>
      <Text className={cn("text-lg font-medium", textClassName)}>
        {messages[messageIndex]}
      </Text>
    </Animated.View>
  );
}
