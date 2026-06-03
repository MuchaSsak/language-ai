import { queryClient, queryPersister } from "@/services/tanstack-query/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as ExpoDevice from "expo-device";
import { PropsWithChildren } from "react";
import { Platform } from "react-native";
import { useMMKV } from "react-native-mmkv";
import { useSyncQueriesExternal } from "react-query-external-sync";

type TanstackQueryProviderProps = PropsWithChildren & {};

export default function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  const mmkv = useMMKV();

  // Dev tools
  useSyncQueriesExternal({
    queryClient,
    socketURL: "http://localhost:42831",
    deviceName: Platform?.OS || "web",
    platform: Platform?.OS || "web",
    deviceId: Platform?.OS || "web",
    isDevice: ExpoDevice.isDevice,
    extraDeviceInfo: {
      appVersion: "1.0.0",
    },
    enableLogs: false,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
    },
    mmkvStorage: mmkv,
    asyncStorage: AsyncStorage,
    secureStorageKeys: [
      "userToken",
      "refreshToken",
      "biometricKey",
      "deviceId",
    ],
  });

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister: queryPersister }}
      client={queryClient}
      onSuccess={() => {
        // Automatically resume any paused mutations (from app kills)
        queryClient.resumePausedMutations();
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
