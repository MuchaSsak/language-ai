import LibraryFilters, {
  LibraryFiltersCategories,
} from "@/components/library/LibraryFilters";
import LibrarySort, { LibrarySorting } from "@/components/library/LibrarySort";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Text } from "@/components/ui/text";
import useDebouncedCallback from "@/hooks/utils/useDebouncedCallback";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Trans, useLingui } from "@lingui/react/macro";
import { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

type LibrarySearchProps = {
  setSearch: Dispatch<SetStateAction<string>>;
  sorting: LibrarySorting;
  setSorting: Dispatch<SetStateAction<LibrarySorting>>;
  filters: LibraryFiltersCategories;
  setFilters: Dispatch<SetStateAction<LibraryFiltersCategories>>;
  disabled?: boolean;
};

export default function LibrarySearch({
  setSearch,
  sorting,
  setSorting,
  filters,
  setFilters,
  disabled,
}: LibrarySearchProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();
  const navigation = useNavigation();

  const [inputSearch, setInputSearch] = useState("");
  const [debouncedSetSearch, { isDebouncing }] = useDebouncedCallback(
    setSearch,
    {
      trailing: false,
      delay: 2000,
      maxWait: 2000,
    },
  );

  return (
    <View className="gap-0.5">
      <Animated.View
        key={2}
        layout={LinearTransition.springify()}
        className="pb-1.5"
      >
        <LibraryFilters filters={filters} setFilters={setFilters} />
      </Animated.View>

      <View>
        {isDebouncing && (
          <Animated.View
            key={0}
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-row items-center gap-1.5 pb-1.5"
          >
            <LoadingSpinner variant="secondary" size={14} />
            <Text className="text-sm text-muted-foreground">
              <Trans>Preparing...</Trans>
            </Text>
          </Animated.View>
        )}

        <Animated.View key={1} layout={LinearTransition.springify()}>
          <Input
            icon={() => (
              <Ionicons
                name="search-sharp"
                size={16}
                color={THEME.mutedForeground}
              />
            )}
            value={inputSearch}
            onChangeText={(newText) => {
              debouncedSetSearch(newText);
              setInputSearch(newText);
            }}
            editable={!disabled}
            placeholder={t`Search...`}
            hasClearButton
          />
        </Animated.View>
      </View>

      <Animated.View
        key={3}
        layout={LinearTransition.springify()}
        className="flex-row items-center justify-between gap-3"
      >
        <LibrarySort
          disabled={disabled}
          sorting={sorting}
          setSorting={setSorting}
          filters={filters}
        />

        <Button
          size="xs"
          className="gap-1 rounded-xs"
          variant="accent"
          onPress={() => navigation.navigate("CreateStudySet")}
        >
          <AntDesign name="plus" size={16} color={THEME.foreground} />

          <Text className="text-sm">
            <Trans>Add</Trans>
          </Text>
        </Button>
      </Animated.View>
    </View>
  );
}
