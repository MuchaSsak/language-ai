import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useTheme from "@/hooks/utils/useTheme";
import { MAX_USERNAME_LENGTH } from "@/lib/zodSchemas";
import {
  AccountFormControl,
  AccountFormErrors,
} from "@/navigation/modals/AccountModal";
import { Trans, useLingui } from "@lingui/react/macro";
import { TriangleAlert } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { View } from "react-native";

type AccountFormNameProps = {
  control: AccountFormControl;
  errors: AccountFormErrors;
  isLoading?: boolean;
};

export default function AccountFormName({
  control,
  errors,
  isLoading,
}: AccountFormNameProps) {
  const { THEME } = useTheme();
  const { t } = useLingui();

  return (
    <View className="gap-1.5 w-5/6">
      <Text className="font-semibold">
        <Trans>Name</Trans>
      </Text>

      <Controller
        control={control}
        disabled={isLoading}
        name="username"
        render={({ field }) => (
          <Input
            placeholder={t`e.g. Matthew`}
            accessibilityLabel={t`Your username`}
            maxLength={MAX_USERNAME_LENGTH}
            {...field}
            editable={isLoading}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {errors.username && (
        <View className="flex-row items-center gap-1.5 pt-2">
          <TriangleAlert size={16} color={THEME.destructive} />
          <Text variant="small" className="text-destructive">
            {errors.username.message}
          </Text>
        </View>
      )}
    </View>
  );
}
