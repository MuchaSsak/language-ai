import { View } from "react-native";

import Form from "@/components/report/Form";
import { NavigationRouteParams } from "@/navigation";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type ReportIssuesModalProps = NavigationRouteParams<"ReportIssues"> & {};

export default function ReportIssuesModal({ route }: ReportIssuesModalProps) {
  return (
    <KeyboardAwareScrollView contentContainerClassName="justify-between gap-4 px-4 pt-8">
      <View className="items-center">
        <Image
          source={require("@/assets/images/report-issues.png")}
          style={{ width: 225, height: 225 }}
          priority="high"
          contentFit="contain"
        />
      </View>

      <Form reportedElementsIds={route?.params} />
    </KeyboardAwareScrollView>
  );
}
