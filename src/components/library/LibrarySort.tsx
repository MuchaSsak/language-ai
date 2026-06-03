import { LibraryFiltersCategories } from "@/components/library/LibraryFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { t } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { TriggerRef } from "@rn-primitives/select";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react-native";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { View } from "react-native";

export type LibrarySortMethod = "alphabetically" | "time-created" | "mastery";
export type LibrarySortOrder = "ascending" | "descending";
export type LibrarySorting = {
  method: LibrarySortMethod;
  order: LibrarySortOrder;
};

export const DEFAULT_LIBRARY_SORTING: LibrarySorting = {
  method: "time-created",
  order: "descending",
};

type LibrarySortLabel = {
  label: () => string;
  icon: (THEME: Theme, isActive?: boolean) => ReactNode;
  method: LibrarySortMethod;
  order: LibrarySortOrder;
  allowedFilters?: LibraryFiltersCategories;
};

const LIBRARY_SORT_LABELS: LibrarySortLabel[] = [
  {
    label: () => t`Title A to Z`,
    icon: (THEME: Theme, isActive) => (
      <AntDesign
        name="sort-descending"
        size={20}
        color={isActive ? THEME.primary : THEME.foreground}
      />
    ),
    order: "descending",
    method: "alphabetically",
  },
  {
    label: () => t`Title Z to A`,
    icon: (THEME: Theme, isActive) => (
      <AntDesign
        name="sort-ascending"
        size={20}
        color={isActive ? THEME.primary : THEME.foreground}
      />
    ),
    order: "ascending",
    method: "alphabetically",
  },
  {
    label: () => t`Latest`,
    icon: (THEME: Theme, isActive) => (
      <CalendarArrowUp
        size={20}
        strokeWidth={1.5}
        color={isActive ? THEME.primary : THEME.foreground}
      />
    ),
    order: "descending",
    method: "time-created",
  },
  {
    label: () => t`Oldest`,
    icon: (THEME: Theme, isActive) => (
      <CalendarArrowDown
        size={20}
        strokeWidth={1.5}
        color={isActive ? THEME.primary : THEME.foreground}
      />
    ),
    order: "ascending",
    method: "time-created",
  },
  {
    label: () => t`Closest to mastery`,
    icon: (THEME: Theme, isActive) => (
      <Octicons
        name="star"
        size={19}
        color={isActive ? THEME.primary : THEME.foreground}
      />
    ),
    order: "descending",
    method: "mastery",
    allowedFilters: ["study-sets"],
  },
  {
    label: () => t`Furthest away to mastery`,
    icon: (THEME: Theme, isActive) => (
      <MaterialCommunityIcons
        name="progress-close"
        size={20}
        color={isActive ? THEME.primary : THEME.foreground}
      />
    ),
    order: "ascending",
    method: "mastery",
    allowedFilters: ["study-sets"],
  },
];

type LibrarySortProps = {
  sorting: LibrarySorting;
  setSorting: Dispatch<SetStateAction<LibrarySorting>>;
  filters: LibraryFiltersCategories;
  disabled?: boolean;
};

export default function LibrarySort({
  setSorting,
  sorting: { order, method },
  filters,
  disabled,
}: LibrarySortProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();
  const categoryTriggerRef = useRef<TriggerRef>(null);

  const foundLabel = LIBRARY_SORT_LABELS.find((l) => l.method === method);
  if (!foundLabel) return;
  const { label } = foundLabel;
  const currentValue = `${method}:${order}`;

  return (
    <Select
      value={{
        value: currentValue,
        label: label(),
      }}
      onValueChange={(newValue) => {
        if (!newValue?.value) return;

        const newMethod = newValue.value.split(":")[0] as LibrarySortMethod;
        const newOrder = newValue.value.split(":")[1] as LibrarySortOrder;

        setSorting({ method: newMethod, order: newOrder });
      }}
    >
      <SelectTrigger
        accessibilityLabel={t`Sort library search`}
        ref={categoryTriggerRef}
        onPress={() => categoryTriggerRef.current?.open()}
        className="p-0 bg-transparent border-0"
        hasIcon={false}
        disabled={disabled}
      >
        <Button
          size="xs"
          enabled={!disabled}
          className="gap-1 rounded-xs"
          variant="accent"
          onPress={() => categoryTriggerRef.current?.open()}
        >
          <Text className="text-sm">
            <Trans>Sort by</Trans>
          </Text>

          <Entypo name="chevron-down" size={16} color={THEME.foreground} />
        </Button>
      </SelectTrigger>

      <SelectContent
        alignOffset={0}
        sideOffset={4}
        side="bottom"
        align="end"
        className="w-64 px-2 py-1"
      >
        <SelectGroup>
          {LIBRARY_SORT_LABELS.map(
            ({ label, icon, method: labelMethod, order, allowedFilters }) => {
              const value = `${labelMethod}:${order}`;
              const isActive = value === currentValue;

              if (
                allowedFilters &&
                filters.some((f) => !allowedFilters.includes(f))
              ) {
                if (labelMethod === method) setSorting(DEFAULT_LIBRARY_SORTING);
                return;
              }

              return (
                <View key={value} className="flex-row items-center">
                  <SelectItem
                    label={label()}
                    value={value}
                    textClassName={cn("text-sm", isActive && "text-primary")}
                    indicatorClassName="text-primary"
                  >
                    {icon(THEME, isActive)}
                  </SelectItem>
                </View>
              );
            },
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
