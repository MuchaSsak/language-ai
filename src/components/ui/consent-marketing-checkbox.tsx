import { Trans, useLingui } from "@lingui/react/macro";

import Switcher, { SwitcherProps } from "@/components/ui/switcher";
import useConsent from "@/hooks/utils/useConsent";
import { LatestDocuments } from "@/services/documents/getLatestDocuments";

type ConsentMarketingCheckboxProps = Omit<
  SwitcherProps,
  "isChecked" | "setIsChecked"
> & {
  latestDocuments: LatestDocuments;
  isChecked?: boolean;
  setIsChecked?: (newChecked: boolean) => void;
  isSilent?: boolean;
};

function ConsentMarketingCheckbox({
  latestDocuments,
  isChecked,
  setIsChecked,
  isSilent,
  children,
  ...props
}: ConsentMarketingCheckboxProps) {
  const { t } = useLingui();
  const { hasConsentedMarketing, handleToggleConsentMarketing, isSyncing } =
    useConsent();

  return (
    <Switcher
      accessibilityLabel={t`Consent to optional marketing checkbox`}
      type="checkbox"
      textClassName="text-base"
      {...props}
      isLoading={isSyncing}
      isChecked={isChecked ?? hasConsentedMarketing}
      setIsChecked={
        setIsChecked ??
        (() =>
          handleToggleConsentMarketing(
            !hasConsentedMarketing,
            latestDocuments,
            isSilent,
          ))
      }
    >
      {children ?? (
        <Trans>
          Remind me to stay on track with my goals and enable push
          notifications.
        </Trans>
      )}
    </Switcher>
  );
}

export default ConsentMarketingCheckbox;
