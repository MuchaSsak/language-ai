import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

import AppleLogo from "@/components/icons/AppleLogo";
import GoogleLogo from "@/components/icons/GoogleLogo";
import { Button, ButtonProps } from "@/components/ui/button";
import LoginEmailForm from "@/components/ui/login-email-form";
import { Text } from "@/components/ui/text";
import useSignInViaApple from "@/hooks/auth/useSignInViaApple";
import useSignInViaGoogle from "@/hooks/auth/useSignInViaGoogle";
import useConsent from "@/hooks/utils/useConsent";
import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";

import ConsentDialog from "@/components/ui/consent-dialog";
import { useAuth } from "@/contexts/AuthContext";
import useSignOut from "@/hooks/auth/useSignOut";
import useGetLatestDocuments from "@/hooks/documents/useGetLatestDocuments";
import { Octicons } from "@expo/vector-icons";
import { useState } from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

export const PROVIDERS_ICONS = {
  google: GoogleLogo,
  apple: AppleLogo,
} as const;

type LoginConnectionsProps = ButtonProps & {
  containerClassName?: string;
  onSuccess?: () => void;
  hasEmailForm?: boolean;
  hasSignOut?: boolean;
};

function LoginConnections({
  containerClassName,
  onSuccess,
  hasEmailForm,
  hasSignOut,
  ...props
}: LoginConnectionsProps) {
  const { THEME } = useTheme();
  const { isAuthenticated, profile } = useAuth();
  const { hasConsentedRequired } = useConsent();

  const {} = useGetLatestDocuments();
  const [isOpenConsentDialog, setIsOpenConsentDialog] = useState(false);
  const [onConfirmConsent, setOnConfirmConsent] = useState<() => void>(
    () => {},
  );
  const { mutate: signInViaGoogle, isPending: isPendingSignInViaGoogle } =
    useSignInViaGoogle();
  const { mutate: signInViaApple, isPending: isPendingSignInViaApple } =
    useSignInViaApple();
  const { mutate: signOut, isPending: isPendingSignOut } = useSignOut();

  const isPending =
    isPendingSignInViaGoogle || isPendingSignInViaApple || isPendingSignOut;

  return (
    <View className={cn("flex-col gap-4", containerClassName)}>
      <ConsentDialog
        isOpen={isOpenConsentDialog}
        setIsOpen={setIsOpenConsentDialog}
        handleOnConfirm={onConfirmConsent}
      />

      <Animated.View
        className="gap-3"
        layout={LinearTransition.springify()}
        entering={FadeInDown.delay(100).springify()}
        exiting={FadeOutDown}
      >
        {/* Google */}
        <Button
          key="oauth_google"
          variant="accent"
          size="lg"
          onPress={() => {
            if (!hasConsentedRequired) {
              setIsOpenConsentDialog(true);
              setOnConfirmConsent(() => signInViaGoogle);
              return;
            } else signInViaGoogle({ onSuccess });
          }}
          isLoading={isPendingSignInViaGoogle}
          enabled={!isPending}
          {...props}
        >
          {<PROVIDERS_ICONS.google className="size-5" size={20} />}
          <Text>
            <Trans>Sign in via Google</Trans>
          </Text>
        </Button>

        {/* Apple */}
        <Button
          key="oauth_apple"
          variant="foreground"
          size="lg"
          onPress={() => {
            if (!hasConsentedRequired) {
              setIsOpenConsentDialog(true);
              setOnConfirmConsent(() => signInViaApple);
              return;
            } else signInViaApple({ onSuccess });
          }}
          isLoading={isPendingSignInViaApple}
          enabled={!isPending}
          {...props}
        >
          {
            <PROVIDERS_ICONS.apple
              className="size-6"
              size={24}
              color={THEME.background}
            />
          }
          <Text>
            <Trans>Sign in via Apple</Trans>
          </Text>
        </Button>

        {isAuthenticated && profile && (
          <Animated.View
            className="pt-1.5"
            layout={LinearTransition.springify()}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text className="text-xs text-center text-destructive-foreground line-clamp-1">
              <Trans>Signed in</Trans>{" "}
              <Text className="text-xs font-semibold text-center text-destructive-foreground line-clamp-1">
                ({profile.email})
              </Text>
            </Text>
          </Animated.View>
        )}

        {/* Sign out */}
        {hasSignOut && isAuthenticated && (
          <Animated.View
            layout={LinearTransition.springify()}
            entering={FadeInDown.delay(100).springify()}
            exiting={FadeOutDown}
          >
            <Button
              key="oauth_signout"
              variant="destructive-accent"
              onPress={() => signOut({})}
              isLoading={isPendingSignOut}
              enabled={!isPending}
              {...props}
            >
              <Octicons name="sign-out" size={20} color={THEME.foreground} />
              <Text className="text-sm">
                <Trans>Sign out</Trans>
              </Text>
            </Button>
          </Animated.View>
        )}

        {hasEmailForm && (
          <LoginEmailForm
            setOnConfirmConsent={setOnConfirmConsent}
            setIsOpenConsentDialog={setIsOpenConsentDialog}
            onSuccess={onSuccess}
          />
        )}
      </Animated.View>
    </View>
  );
}

export default LoginConnections;
