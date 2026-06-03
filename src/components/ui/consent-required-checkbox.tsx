import { Trans, useLingui } from "@lingui/react/macro";

import Switcher, { SwitcherProps } from "@/components/ui/switcher";
import { Text } from "@/components/ui/text";
import useConsent from "@/hooks/utils/useConsent";
import { TERMS_AND_CONDITIONS_LINK } from "@/lib/constants";
import { openURL } from "@/lib/utils";
import { LatestDocuments } from "@/services/documents/getLatestDocuments";
import { Dispatch, SetStateAction } from "react";

type ConsentRequiredCheckboxProps = Omit<
  SwitcherProps,
  "isChecked" | "setIsChecked"
> & {
  latestDocuments: LatestDocuments;
  isChecked?: boolean;
  setIsChecked?: Dispatch<SetStateAction<boolean>>;
};

function ConsentRequiredCheckbox({
  latestDocuments,
  isChecked,
  setIsChecked,
  ...props
}: ConsentRequiredCheckboxProps) {
  const { t } = useLingui();
  const { hasConsentedRequired, handleToggleConsentRequired, isSyncing } =
    useConsent();

  return (
    <Switcher
      accessibilityLabel={t`Consent to required checkbox`}
      type="checkbox"
      textClassName="text-base"
      {...props}
      isLoading={isSyncing}
      isChecked={isChecked ?? hasConsentedRequired}
      setIsChecked={
        setIsChecked ??
        (() =>
          handleToggleConsentRequired(!hasConsentedRequired, latestDocuments))
      }
    >
      <Trans>
        I agree to the{" "}
        <Text
          onPress={() => openURL(TERMS_AND_CONDITIONS_LINK)}
          className="text-sm font-bold text-primary android:tracking-tight hover:underline focus-visible:underline"
        >
          Terms and Conditions
        </Text>{" "}
        and{" "}
        <Text
          onPress={() => openURL(TERMS_AND_CONDITIONS_LINK)}
          className="text-sm font-bold text-primary android:tracking-tight hover:underline focus-visible:underline"
        >
          Privacy Policy
        </Text>
        {"."}
      </Trans>
    </Switcher>
  );
}

export default ConsentRequiredCheckbox;
