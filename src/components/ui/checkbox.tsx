import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Platform } from "react-native";

const DEFAULT_HIT_SLOP = 24;

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: CheckboxPrimitive.RootProps &
  React.RefAttributes<CheckboxPrimitive.RootRef> & {
    checkedClassName?: string;
    indicatorClassName?: string;
    iconClassName?: string;
  }) {
  const { THEME } = useTheme();

  return (
    <CheckboxPrimitive.Root
      className={cn(
        "border-input size-4 shrink-0 rounded-[4px] border shadow-sm shadow-black/5",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive peer cursor-default outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed",
          native: "overflow-hidden",
        }),
        props.checked && cn("border-primary", checkedClassName),
        props.disabled && "opacity-50",
        className,
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "bg-primary h-full w-full items-center justify-center",
          indicatorClassName,
        )}
      >
        <Feather name="check" size={12} color={THEME.primaryForeground} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
