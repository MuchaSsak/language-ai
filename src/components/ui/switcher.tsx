import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export type SwitcherProps = React.RefAttributes<CheckboxPrimitive.RootRef> &
  PropsWithChildren &
  Omit<CheckboxPrimitive.RootProps, "checked" | "onCheckedChange"> & {
    isChecked: boolean;
    setIsChecked: (newChecked: boolean) => void;
    type?: "checkbox" | "switch";
    switchClassName?: string;
    checkboxClassName?: string;
    checkboxIconClassName?: string;
    textClassName?: string;
    isLoading?: boolean;
    loaderClassName?: string;
  };

function Switcher({
  isChecked,
  setIsChecked,
  className,
  type = "switch",
  children,
  switchClassName,
  checkboxClassName,
  checkboxIconClassName,
  loaderClassName,
  textClassName,
  isLoading,
  disabled,
  ...props
}: SwitcherProps) {
  return (
    <Button
      isPressableScale={false}
      size="slim"
      variant="invisible"
      enabled={!disabled && !isLoading}
      onPress={() => setIsChecked(!isChecked)}
      className={cn("flex-row items-start gap-3", className)}
    >
      {isLoading ? (
        <LoadingSpinner variant="background" />
      ) : (
        <>
          {type === "checkbox" && (
            <Checkbox
              className={cn(
                "border border-primary size-6 mt-px",
                checkboxClassName,
              )}
              iconClassName={cn("size-2.5", checkboxIconClassName)}
              {...props}
              disabled={disabled || isLoading}
              checked={isChecked}
              onCheckedChange={(newChecked) => setIsChecked(newChecked)}
            />
          )}

          {type === "switch" && (
            <Switch
              className={cn("mt-1", switchClassName)}
              {...props}
              disabled={disabled || isLoading}
              checked={isChecked}
              onCheckedChange={(newChecked) => setIsChecked(newChecked)}
            />
          )}
        </>
      )}

      <Text className={cn("flex-1 font-medium text-lg", textClassName)}>
        {children}
      </Text>
    </Button>
  );
}

export default Switcher;
