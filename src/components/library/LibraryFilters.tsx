import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Enums } from "@/typings/database-generated.types";
import { t } from "@lingui/core/macro";
import { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";

export type LibraryFiltersCategories =
  Enums<"LIBRARY_SEARCH_FILTER_CATEGORY">[];

export const DEFAULT_LIBRARY_FILTERS: LibraryFiltersCategories = ["study-sets"];

type LibraryFilterLabel = {
  value: Enums<"LIBRARY_SEARCH_FILTER_CATEGORY">;
  label: () => string;
};

const LIBRARY_FILTERS_LABELS: LibraryFilterLabel[] = [
  {
    value: "study-sets",
    label: () => t`Study sets`,
  },
  {
    value: "quizes",
    label: () => t`Quizes`,
  },
  {
    value: "challenges",
    label: () => t`Challenges`,
  },
];

type LibraryFiltersProps = {
  filters: LibraryFiltersCategories;
  setFilters: Dispatch<SetStateAction<LibraryFiltersCategories>>;
};

export default function LibraryFilters({
  filters,
  setFilters,
}: LibraryFiltersProps) {
  return (
    <ScrollView
      contentContainerClassName="flex-row items-center gap-3"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      bounces={false}
    >
      {LIBRARY_FILTERS_LABELS.map(({ label, value }) => {
        const isActive = filters.includes(value);

        return (
          <Button
            key={value}
            variant={isActive ? undefined : "accent"}
            size="xs"
            onPress={() => {
              if (filters.length === 1 && filters.includes(value)) return;

              if (isActive)
                setFilters((prev) => prev.filter((f) => f !== value));
              else setFilters((prev) => [...prev, value]);
            }}
          >
            <Text className="text-sm">{label()}</Text>
          </Button>
        );
      })}
    </ScrollView>
  );
}
