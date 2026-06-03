import { Trans } from "@lingui/react/macro";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";

type WarningDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onLoadedSuccess?: () => void;
};

export default function WarningDialog({
  isOpen,
  handleClose,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
  isLoading,
  onLoadedSuccess,
  onCancel,
}: WarningDialogProps) {
  const [isPending, setIsPending] = useState(isLoading);
  const [hasPressedConfirm, setHasPressedConfirm] = useState(false);

  useEffect(() => {
    if (isLoading === undefined) setIsPending(false);
    else setIsPending(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!isPending && hasPressedConfirm) {
      onLoadedSuccess?.();
      setHasPressedConfirm(false);
      handleClose();
    }
  }, [isPending, hasPressedConfirm, handleClose, onLoadedSuccess]);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-6">{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter className="gap-3">
          <Button
            variant="accent"
            size="sm"
            onPress={() => {
              handleClose();
              onCancel?.();
            }}
          >
            <Text className="text-sm font-semibold">
              {cancelButtonText ?? <Trans>No, cancel</Trans>}
            </Text>
          </Button>

          <Button
            variant="destructive"
            isLoading={isLoading}
            onPress={() => {
              onConfirm();
              setIsPending(true);
              setHasPressedConfirm(true);
            }}
            size="sm"
          >
            <Text className="text-sm font-semibold">
              {confirmButtonText ?? <Trans>Yes, continue</Trans>}
            </Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
