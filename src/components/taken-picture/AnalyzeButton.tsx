import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useCamera } from "@/contexts/CameraContext";
import useAnalyzePicture from "@/hooks/pictures/useAnalyzePicture";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type AnalyzeButtonProps = {};

export default function AnalyzeButton({}: AnalyzeButtonProps) {
  const { picture } = useCamera();
  const { mutate: analyzePicture, isPending } = useAnalyzePicture();

  if (!picture) return;

  return (
    <View className="absolute z-10 -translate-x-1/2 left-1/2 bottom-24">
      <Button
        className="w-64"
        isLoading={isPending}
        onPress={() => analyzePicture({ pictureUri: picture.uri })}
        size="xl"
      >
        <Text>
          <Trans>Analyze</Trans>
        </Text>
      </Button>
    </View>
  );
}
