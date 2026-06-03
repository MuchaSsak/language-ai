import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useCamera } from "@/contexts/CameraContext";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { View } from "react-native";

type RequestPermissionProps = {};

export default function RequestPermission({}: RequestPermissionProps) {
  const { requestPermission, isPendingRequestPermission } = useCamera();

  return (
    <View className="items-center justify-center flex-1 gap-12 pb-32">
      <Image
        source={require("@/assets/images/camera-permissions.png")}
        style={{ width: 250, height: 250 }}
        priority="high"
        contentFit="contain"
      />

      <View className="gap-2">
        <Text className="text-2xl font-semibold text-center">
          <Trans>We need your permission!</Trans>
        </Text>
        <Text className="px-8 text-center text-muted-foreground">
          <Trans>Please allow camera access in order to take pictures</Trans>
        </Text>
      </View>

      <Button
        onPress={() => requestPermission()}
        isLoading={isPendingRequestPermission}
        className="w-56 px-0"
      >
        <Text>
          <Trans>Enable camera</Trans>
        </Text>
      </Button>
    </View>
  );
}
