import { X } from "lucide-react-native";
import { ComponentType, RefAttributes, useRef } from "react";
import {
  Platform,
  Pressable,
  TextInput,
  type TextInputProps,
} from "react-native";

import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface InputProps extends TextInputProps {
  icon?: React.ReactNode | ComponentType<{ size?: number; color?: string }>;
  onClear?: () => void;
  hasClearButton?: boolean;
}

function Input({
  className,
  icon: Icon,
  value,
  onChangeText,
  onClear,
  hasClearButton,
  ...props
}: InputProps & RefAttributes<TextInput>) {
  const { THEME } = useTheme();
  const inputRef = useRef<TextInput>(null);

  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "function") {
      return <Icon size={20} color={THEME.mutedForeground} />;
    }
    return Icon;
  };

  const handleClear = () => {
    if (onChangeText) {
      onChangeText("");
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className={cn(
        "border-border opacity-100 bg-input flex h-12 w-full min-w-0 flex-row items-center rounded-md border px-3 gap-2",
        props.editable === false &&
          cn("opacity-50 select-none pointer-events-none"),
        Platform.select({
          web: "focus-within:border-primary focus-within:ring-primary/50 focus-within:ring-[3px] outline-none transition-[color,box-shadow]",
        }),
        className,
      )}
    >
      {renderIcon()}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        cursorColor={THEME.primary}
        selectionColor={THEME.primary}
        className={cn(
          "font-sans text-foreground flex-1 h-full text-base leading-5",
          Platform.select({
            web: cn(
              "selection:bg-primary placeholder:text-muted-foreground focus-visible:outline-none md:text-sm",
              "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
            ),
            native: "py-1",
          }),
        )}
        placeholderTextColor={THEME.mutedForeground}
        selectionHandleColor={THEME.primary}
        {...props}
      />
      {value && hasClearButton ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Pressable hitSlop={8} onPress={handleClear}>
            <X size={18} color={THEME.mutedForeground} />
          </Pressable>
        </Animated.View>
      ) : null}
    </Pressable>
  );
}

export { Input };
