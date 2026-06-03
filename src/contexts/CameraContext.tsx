import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

import useCameraPermissions from "@/hooks/camera/useCameraPermissions";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  CameraCapturedPicture,
  CameraType,
  FlashMode,
  PermissionResponse,
} from "expo-camera";

/**
 * Types
 */
type CameraContextValue = {
  permission: PermissionResponse | null;
  isPermissionGranted: boolean;
  requestPermission: UseMutateFunction<
    PermissionResponse,
    Error,
    void,
    unknown
  >;
  isPendingRequestPermission: boolean;

  setFacing: Dispatch<SetStateAction<CameraType>>;
  setFlash: Dispatch<SetStateAction<FlashMode>>;
  setZoom: Dispatch<SetStateAction<number>>;

  cameraProps: {
    facing: CameraType;
    flash: FlashMode;
    zoom: number;
  };

  picture: CameraCapturedPicture | null;
  setPicture: Dispatch<SetStateAction<CameraCapturedPicture | null>>;
};

/**
 * Initialize context
 */
const CameraContext = createContext<CameraContextValue>(
  {} as CameraContextValue,
);

/**
 * Provider
 */
export default function CameraProvider({ children }: PropsWithChildren) {
  const {
    permission,
    mutate: requestPermission,
    isPending,
  } = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [zoom, setZoom] = useState(0);
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);

  return (
    <CameraContext.Provider
      value={{
        permission,
        isPermissionGranted: !!permission?.granted,
        requestPermission,
        isPendingRequestPermission: isPending,

        setFacing,
        setFlash,
        setZoom,

        cameraProps: {
          facing,
          flash,
          zoom,
        },

        picture,
        setPicture,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

/**
 * Hook
 */
export function useCamera() {
  const context = useContext(CameraContext);
  if (context === undefined)
    throw new Error("useCamera was used outside of CameraProvider!");
  return context;
}
