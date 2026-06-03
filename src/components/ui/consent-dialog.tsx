import { Trans } from "@lingui/react/macro";
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ConsentAnalyticsCheckbox from "@/components/ui/consent-analytics-checkbox";
import ConsentMarketingCheckbox from "@/components/ui/consent-marketing-checkbox";
import ConsentRequiredCheckbox from "@/components/ui/consent-required-checkbox";
import { Text } from "@/components/ui/text";
import useGetLatestDocuments from "@/hooks/documents/useGetLatestDocuments";
import useConsent from "@/hooks/utils/useConsent";
import { GDPR_INFO_LINK } from "@/lib/constants";
import { openURL } from "@/lib/utils";

type ConsentDialogProps = {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  isOutdated?: boolean;
  handleOnConfirm?: () => void;
  hasCancelButton?: boolean;
};

function ConsentDialog({
  isOpen,
  setIsOpen,
  isOutdated,
  handleOnConfirm,
  hasCancelButton = true,
}: ConsentDialogProps) {
  const {
    handleToggleConsentAnalytics,
    handleToggleConsentMarketing,
    handleToggleConsentRequired,
  } = useConsent();
  const { data: latestDocuments } = useGetLatestDocuments();
  const [isCheckedRequired, setIsCheckedRequired] = useState(false);
  const [isCheckedMarketing, setIsCheckedMarketing] = useState(false);
  const [isCheckedAnalytics, setIsCheckedAnalytics] = useState(false);

  useEffect(() => {
    if (isOpen) Keyboard.dismiss();
    if (!latestDocuments && isOpen) setIsOpen(false);
  }, [isOpen, latestDocuments, setIsOpen]);

  if (!latestDocuments) return null;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(newOpen) => {
        setIsCheckedRequired(false);
        setIsCheckedMarketing(false);
        setIsCheckedAnalytics(false);
        setIsOpen(newOpen);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isOutdated ? (
              <Trans>We&apos;ve updated our documents!</Trans>
            ) : (
              <Trans>We need your consent!</Trans>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isOutdated ? (
              <Trans>
                You need to re-consent to our conditions. Read more about{" "}
              </Trans>
            ) : (
              <Trans>
                You need to agree to our conditions. Read more about{" "}
              </Trans>
            )}
            <Text
              onPress={() => openURL(GDPR_INFO_LINK)}
              className="text-sm font-semibold text-muted-foreground hover:underline focus-visible:underline"
            >
              <Trans>
                General Data Protection Regulation (GDPR) here.{"\n"}
              </Trans>
            </Text>
            <Trans>
              We are fully transparent about our data usage and general
              functionality, so to view the documents, simply click on the
              orange links below.
            </Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <View className="gap-3 py-2">
          <ConsentMarketingCheckbox
            className="gap-2"
            checkboxClassName="size-4"
            textClassName="text-sm"
            isChecked={isCheckedMarketing}
            setIsChecked={setIsCheckedMarketing}
            latestDocuments={latestDocuments}
          />
          <ConsentAnalyticsCheckbox
            className="gap-2"
            checkboxClassName="size-4"
            textClassName="text-sm"
            isChecked={isCheckedAnalytics}
            setIsChecked={setIsCheckedAnalytics}
            latestDocuments={latestDocuments}
          />
          <ConsentRequiredCheckbox
            className="gap-2"
            checkboxClassName="size-4"
            textClassName="text-sm"
            isChecked={isCheckedRequired}
            setIsChecked={setIsCheckedRequired}
            latestDocuments={latestDocuments}
          />
        </View>

        <View className="gap-3">
          <Button
            tabIndex={isCheckedRequired ? 0 : -1}
            onPress={() => {
              handleToggleConsentRequired(isCheckedRequired, latestDocuments);
              handleToggleConsentMarketing(
                isCheckedMarketing,
                latestDocuments,
                true,
              );
              handleToggleConsentAnalytics(
                isCheckedAnalytics,
                latestDocuments,
                true,
              );

              handleOnConfirm?.();
              setIsOpen(false);
            }}
            enabled={isCheckedRequired}
            size="sm"
          >
            <Text className="text-sm font-semibold">
              <Trans>Confirm and continue</Trans>
            </Text>
          </Button>

          {hasCancelButton && (
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                setIsOpen(false);
              }}
            >
              <Text className="text-sm font-semibold">
                <Trans>Cancel</Trans>
              </Text>
            </Button>
          )}
        </View>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConsentDialog;
