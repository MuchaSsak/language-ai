import { ReportFormControl } from "@/components/report/Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { REPORT_CATEGORIES } from "@/lib/constants";
import { Trans, useLingui } from "@lingui/react/macro";
import { TriggerRef } from "@rn-primitives/select";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";

type FormCategoryProps = {
  control: ReportFormControl;
};

export default function FormCategory({ control }: FormCategoryProps) {
  const { t } = useLingui();
  const categoryTriggerRef = useRef<TriggerRef>(null);

  return (
    <View className="gap-1">
      <Text
        className="font-semibold"
        onPress={() => categoryTriggerRef.current?.open()}
      >
        <Trans>Category</Trans>
      </Text>

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select {...field}>
            <SelectTrigger
              accessibilityLabel={t`Report category`}
              ref={categoryTriggerRef}
              onPress={() => categoryTriggerRef.current?.open()}
              className="w-64"
            >
              <SelectValue placeholder={t`Select an issue category`} />
            </SelectTrigger>

            <SelectContent
              sideOffset={4}
              alignOffset={0}
              align="start"
              side="top"
              className="w-64 max-h-[30rem]"
            >
              <SelectGroup>
                <SelectLabel>
                  <Trans>Category</Trans>
                </SelectLabel>

                {REPORT_CATEGORIES.map(({ label, value }) => {
                  if (value === "Unspecified") return;

                  return (
                    <SelectItem key={value} label={label()} value={value} />
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </View>
  );
}
