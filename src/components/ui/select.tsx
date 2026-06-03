import { Icon } from "@/components/ui/icon";
import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@rn-primitives/select";
import {
  Check,
  ChevronDown,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react-native";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

function SelectValue({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value> & {
  className?: string;
}) {
  const { value } = SelectPrimitive.useRootContext();
  return (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        "text-foreground font-sans line-clamp-1 flex flex-row items-center gap-2 text-base",
        !value && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  ref,
  className,
  children,
  size = "default",
  hasIcon = true,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  children?: React.ReactNode;
  size?: "default" | "sm";
  hasIcon?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "border-border bg-input font-sans flex h-11 flex-row items-center justify-between gap-2 rounded-md border px-3 py-2",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive w-fit whitespace-nowrap text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
        }),
        size === "sm" && "h-8 py-2 sm:py-1.5",
        className,
      )}
      {...props}
    >
      <>{children}</>
      {hasIcon && (
        <Icon
          as={ChevronDown}
          aria-hidden={true}
          className="text-muted-foreground size-4"
        />
      )}
    </SelectPrimitive.Trigger>
  );
}

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function SelectContent({
  className,
  children,
  position = "popper",
  portalHost,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  className?: string;
  portalHost?: string;
}) {
  const insets = useSelectInsets();

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay
          style={Platform.select({ native: StyleSheet.absoluteFill })}
        >
          <TextClassContext.Provider value="text-popover-foreground font-sans">
            <NativeOnlyAnimatedView
              className="z-50"
              entering={FadeIn}
              exiting={FadeOut}
            >
              <SelectPrimitive.Content
                className={cn(
                  "bg-popover border-border relative z-50 min-w-[8rem] rounded-md border shadow-md shadow-black/5",
                  Platform.select({
                    web: cn(
                      "animate-in fade-in-0 zoom-in-95 origin-(--radix-select-content-transform-origin) max-h-52 overflow-y-auto overflow-x-hidden",
                      props.side === "bottom" && "slide-in-from-top-2",
                      props.side === "top" && "slide-in-from-bottom-2",
                    ),
                    native: "p-1",
                  }),
                  position === "popper" &&
                    Platform.select({
                      web: cn(
                        props.side === "bottom" && "translate-y-1",
                        props.side === "top" && "-translate-y-1",
                      ),
                    }),
                  className,
                )}
                position={position}
                insets={insets}
                {...props}
              >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                  className={cn(
                    "p-1",
                    position === "popper" &&
                      cn(
                        "w-full",
                        Platform.select({
                          web: "h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]",
                        }),
                      ),
                  )}
                >
                  {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
              </SelectPrimitive.Content>
            </NativeOnlyAnimatedView>
          </TextClassContext.Provider>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "text-muted-foreground font-sans px-2 py-2 text-xs sm:py-1.5",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  indicatorClassName,
  textClassName,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  children?: React.ReactNode;
  textClassName?: string;
  indicatorClassName?: string;
}) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "active:bg-secondary-hover group relative flex w-full flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-8 sm:py-1.5",
        Platform.select({
          web: "focus:bg-accent focus:text-foreground cursor-default outline-none data-[disabled]:pointer-events-none",
        }),
        props.disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <View className="flex-row items-center gap-2">{children}</View>

      <SelectPrimitive.ItemText
        className={cn("font-sans text-base text-foreground", textClassName)}
      />

      <View className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon
            as={Check}
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              indicatorClassName,
            )}
          />
        </SelectPrimitive.ItemIndicator>
      </View>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        "bg-border -mx-1 my-1 h-px",
        Platform.select({ web: "pointer-events-none" }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  if (Platform.OS !== "web") {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <Icon as={ChevronUpIcon} className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  if (Platform.OS !== "web") {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <Icon as={ChevronDownIcon} className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

function useSelectInsets() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom + 32,
    left: 24,
    right: 24,
  };

  return contentInsets;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  useSelectInsets,
  type Option,
};
