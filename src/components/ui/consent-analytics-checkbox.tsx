import { Trans, useLingui } from "@lingui/react/macro";

import Switcher, { SwitcherProps } from "@/components/ui/switcher";
import useConsent from "@/hooks/utils/useConsent";
import { LatestDocuments } from "@/services/documents/getLatestDocuments";

type ConsentAnalyticsCheckboxProps = Omit<
  SwitcherProps,
  "isChecked" | "setIsChecked"
> & {
  latestDocuments: LatestDocuments;
  isChecked?: boolean;
  setIsChecked?: (newChecked: boolean) => void;
  isSilent?: boolean;
};

function ConsentAnalyticsCheckbox({
  latestDocuments,
  isChecked,
  setIsChecked,
  isSilent,
  children,
  ...props
}: ConsentAnalyticsCheckboxProps) {
  const { t } = useLingui();
  const { hasConsentedAnalytics, handleToggleConsentAnalytics, isSyncing } =
    useConsent();

  return (
    <Switcher
      accessibilityLabel={t`Consent to optional analytics checkbox`}
      type="checkbox"
      textClassName="text-base"
      {...props}
      isLoading={isSyncing}
      isChecked={isChecked ?? hasConsentedAnalytics}
      setIsChecked={
        setIsChecked ??
        (() =>
          handleToggleConsentAnalytics(
            !hasConsentedAnalytics,
            latestDocuments,
            isSilent,
          ))
      }
    >
      {children ?? (
        <Trans>
          Improve the application by automatically sharing crash reports and
          usage performance.
        </Trans>
      )}
    </Switcher>
  );
}

export default ConsentAnalyticsCheckbox;
