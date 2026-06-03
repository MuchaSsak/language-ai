import { Button, ButtonProps } from "@/components/ui/button";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type RadioButtonProps = PropsWithChildren &
  ButtonProps & {
    index: number;
    buttonsLength: number;
    value: string;
    activeValue?: string;
    nextValue: string;
    textClassName?: string;
    indicatorClassName?: string;
    indicatorDotClassName?: string;
    activeClassName?: string;
    hasIndicator?: boolean;
  };

export default function RadioButton({
  index,
  buttonsLength,
  activeValue,
  nextValue,
  value,
  className,
  textClassName,
  indicatorClassName,
  indicatorDotClassName,
  hasIndicator = true,
  activeClassName = "bg-primary/20 border-primary",
  variant = "invisible",
  size = "slim",
  children,
  ...props
}: RadioButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "flex flex-row items-center justify-between rounded-sm border border-b gap-3 py-4 px-2",
        index === buttonsLength - 1
          ? "border-transparent"
          : "border-b-muted border-r-0 border-l-0 border-t-0",
        nextValue === activeValue ? "border-transparent" : "",
        className,
        activeValue === value
          ? "bg-primary/20 border-primary border-t border-b border-l border-r"
          : "",
        activeValue === value ? activeClassName : "",
      )}
      key={value}
      {...props}
    >
      {hasIndicator ? (
        <>
          <Text className={cn("text-xl flex-1 font-semibold", textClassName)}>
            {children}
          </Text>

          <RadioGroupItem
            indicatorDotClassName={indicatorDotClassName}
            className={cn("size-6", indicatorClassName)}
            value={value}
          />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
