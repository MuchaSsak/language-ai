import LoadingSpinner from "@/components/ui/loading-spinner";
import { Text } from "@/components/ui/text";
import WarningDialog from "@/components/ui/warning-dialog";
import useTheme from "@/hooks/utils/useTheme";
import { Theme } from "@/lib/theme";
import { NavigationObject } from "@/navigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { HeaderButton } from "@react-navigation/elements";
import { Fragment, PropsWithChildren, useState } from "react";
import { View } from "react-native";

const MODAL_HEADER_BUTTON_ICON = {
  close: (THEME: Theme) => (
    <Ionicons name="close" size={24} color={THEME.foreground} />
  ),
  back: (THEME: Theme) => (
    <Octicons name="chevron-left" size={24} color={THEME.foreground} />
  ),
} as const;

export type ModalHeaderButtonIcon = keyof typeof MODAL_HEADER_BUTTON_ICON;

type ModalHeaderButtonOptions = {
  onConfirm?: () => void;
  onCancel?: () => void;
  text?: string;
  icon?: ModalHeaderButtonIcon;
  dialogTitle?: string;
  dialogDescription?: string;
  dialogCancelButtonText?: string;
  dialogConfirmButtonText?: string;
  isLoading?: boolean;
  onLoadedSuccess?: () => void;
};

type ModalHeaderButtonsProps = PropsWithChildren & {
  navigation: NavigationObject;
  buttons: ModalHeaderButtonOptions[];
};

export default function ModalHeaderButtons({
  navigation,
  children,
  buttons,
}: ModalHeaderButtonsProps) {
  const { THEME } = useTheme();
  const [openDialog, setOpenDialog] = useState<number | null>(null);

  return (
    <View className="flex-row gap-4">
      {children}

      {buttons.map(
        (
          {
            dialogCancelButtonText,
            dialogConfirmButtonText,
            dialogDescription,
            dialogTitle,
            icon,
            text,
            isLoading,
            onLoadedSuccess,
            onConfirm,
            onCancel,
          },
          i,
        ) => (
          <Fragment key={i}>
            <HeaderButton
              onPress={() => (dialogTitle ? setOpenDialog(i) : onConfirm?.())}
            >
              {isLoading ? (
                <LoadingSpinner variant="foreground" />
              ) : (
                <>
                  {icon && MODAL_HEADER_BUTTON_ICON[icon](THEME)}
                  {text && <Text className="font-semibold">{text}</Text>}
                </>
              )}
            </HeaderButton>

            <View className="hidden">
              {dialogTitle && (
                <WarningDialog
                  key={i}
                  isOpen={openDialog === i}
                  handleClose={() => setOpenDialog(null)}
                  title={dialogTitle}
                  description={dialogDescription}
                  cancelButtonText={dialogCancelButtonText}
                  confirmButtonText={dialogConfirmButtonText}
                  onLoadedSuccess={onLoadedSuccess}
                  onConfirm={onConfirm ?? (() => navigation.goBack())}
                  onCancel={onCancel}
                />
              )}
            </View>
          </Fragment>
        ),
      )}
    </View>
  );
}
