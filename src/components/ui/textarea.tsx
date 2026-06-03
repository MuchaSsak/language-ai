import { Platform, TextInput, type TextInputProps } from "react-native";

import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  multiline = true,
  numberOfLines = Platform.select({ web: 2, native: 8 }), // On web, numberOfLines also determines initial height. On native, it determines the maximum height.
  placeholderClassName,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  const { THEME } = useTheme();

  return (
    <TextInput
      className={cn(
        "text-foreground font-sans border-border flex min-h-16 w-full flex-row rounded-md border bg-input resize-none px-4 py-3 text-base",
        Platform.select({
          web: "placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive field-sizing-content outline-none transition-[color,box-shadow] resize-none disabled:cursor-not-allowed",
        }),
        props.editable === false && "opacity-50",
        className,
      )}
      placeholderClassName={cn(
        "text-muted-foreground text-sm",
        placeholderClassName,
      )}
      multiline={multiline}
      numberOfLines={numberOfLines}
      cursorColor={THEME.primary}
      selectionColor={THEME.primary}
      placeholderTextColor={THEME.mutedForeground}
      selectionHandleColor={THEME.primary}
      textAlignVertical="top"
      {...props}
    />
  );
}

export { Textarea };
