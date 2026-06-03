import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@rn-primitives/radio-group";
import { Platform } from "react-native";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cn("gap-3", className)} {...props} />
  );
}

function RadioGroupItem({
  className,
  indicatorDotClassName,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  indicatorDotClassName?: string;
}) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "border-primary-hover aspect-square size-4 shrink-0 items-center justify-center rounded-full border",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed",
        }),
        props.disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(
          "rounded-full bg-primary size-2/3",
          indicatorDotClassName,
        )}
      />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
