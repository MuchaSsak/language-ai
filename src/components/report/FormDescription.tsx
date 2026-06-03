import { ReportFormControl, ReportFormErrors } from "@/components/report/Form";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import useTheme from "@/hooks/utils/useTheme";
import { MAX_REPORT_DESCRIPTION_LENGTH } from "@/lib/zodSchemas";
import { Trans, useLingui } from "@lingui/react/macro";
import { TriangleAlert } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { View } from "react-native";

type FormDescriptionProps = {
  control: ReportFormControl;
  errors: ReportFormErrors;
};

export default function FormDescription({
  control,
  errors,
}: FormDescriptionProps) {
  const { THEME } = useTheme();
  const { t } = useLingui();

  return (
    <View className="gap-1">
      <Text className="font-semibold">
        <Trans>Description</Trans>
      </Text>

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            placeholder={t`I am experiencing...`}
            accessibilityLabel={t`Report description`}
            className="h-32"
            maxLength={MAX_REPORT_DESCRIPTION_LENGTH}
            {...field}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {errors.description && (
        <View className="flex-row items-center gap-1.5 pt-2">
          <TriangleAlert size={16} color={THEME.destructive} />
          <Text variant="small" className="text-destructive">
            {errors.description.message}
          </Text>
        </View>
      )}
    </View>
  );
}
