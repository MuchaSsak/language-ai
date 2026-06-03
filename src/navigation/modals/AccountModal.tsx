import AccountFormName from "@/components/settings/AccountFormName";
import AccountOptionalConsent from "@/components/settings/AccountOptionalConsent";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useNavigation from "@/hooks/utils/useNavigation";

import { accountSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { z } from "zod";

/**
 * Types
 */
type AccountFormStructure = z.infer<typeof accountSchema>;

export type AccountFormControl = Control<
  AccountFormStructure,
  unknown,
  AccountFormStructure
>;
export type AccountFormErrors = FieldErrors<AccountFormStructure>;
export type AccountFormHandleSubmit = UseFormHandleSubmit<
  AccountFormStructure,
  AccountFormStructure
>;

type AccountModalProps = {};

export default function AccountModal({}: AccountModalProps) {
  const { profile } = useAuth();
  const navigation = useNavigation();

  // Hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: profile?.username || "",
    },
  });

  // Submit form
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  function onSubmit() {
    const username = getValues("username");
    if (!username?.trim()) return navigation.goBack();

    updateProfile({
      newProfile: {
        username: username.trim(),
      },
      isSuccessToast: true,
      isErrorToast: true,
      onSuccess: () => {
        navigation.goBack();
      },
    });
  }

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow justify-between px-4 pt-8 gap-6"
      bounces={false}
    >
      <View className="gap-8">
        <View className="items-center gap-2">
          <Image
            source={require("@/assets/images/account.png")}
            style={{ width: 225, height: 225 }}
            priority="high"
            contentFit="contain"
          />
        </View>

        <AccountFormName
          control={control}
          errors={errors}
          isLoading={isPending || true}
        />
        <AccountOptionalConsent />
      </View>

      <Button
        onPress={handleSubmit(onSubmit) as unknown as () => void}
        isLoading={isPending}
      >
        <Text>
          <Trans>Save and go back!</Trans>
        </Text>
      </Button>
    </KeyboardAwareScrollView>
  );
}
