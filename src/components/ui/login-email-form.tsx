import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useSignInViaPassword from "@/hooks/auth/useSignInViaPassword";
import useConsent from "@/hooks/utils/useConsent";
import { Trans, useLingui } from "@lingui/react/macro";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View } from "react-native";

type LoginEmailFormProps = {
  setIsOpenConsentDialog: Dispatch<SetStateAction<boolean>>;
  setOnConfirmConsent: Dispatch<SetStateAction<() => void>>;
  onSuccess?: () => void;
};

export default function LoginEmailForm({
  setIsOpenConsentDialog,
  setOnConfirmConsent,
  onSuccess,
}: LoginEmailFormProps) {
  const { t } = useLingui();
  const { hasConsentedRequired } = useConsent();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signInViaPassword, isPending } = useSignInViaPassword();

  // TODO: remove this testing garbage
  useEffect(() => {
    setEmail("a@aa.aa");
    setPassword("a");
    if (email === "a@aa.aa" && password === "a") {
      if (!hasConsentedRequired) {
        setIsOpenConsentDialog(true);
        setOnConfirmConsent(
          () => () => signInViaPassword({ email, password, onSuccess }),
        );
        return;
      } else signInViaPassword({ email, password, onSuccess });
    }
  }, [email, password]);

  return (
    <View className="gap-3 pt-4">
      <Text className="italic text-muted-foreground">
        <Trans>Secret password sign-in for testers</Trans>
      </Text>

      <Input
        placeholder={t`Email`}
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Input
        placeholder={t`Password`}
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        textContentType="password"
        secureTextEntry
      />

      <Button
        onPress={() => {
          if (!hasConsentedRequired) {
            setIsOpenConsentDialog(true);
            setOnConfirmConsent(
              () => () => signInViaPassword({ email, password, onSuccess }),
            );
            return;
          } else signInViaPassword({ email, password, onSuccess });
        }}
        enabled={email.trim().length > 0 && password.trim().length > 0}
        isLoading={isPending}
      >
        <Text>
          <Trans>Sign in</Trans>
        </Text>
      </Button>
    </View>
  );
}
