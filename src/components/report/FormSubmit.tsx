import { ReportFormHandleSubmit } from "@/components/report/Form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useCreateReport from "@/hooks/reports/useCreateReport";
import useNavigation from "@/hooks/utils/useNavigation";
import { reportFormSchema } from "@/lib/zodSchemas";
import { NavigationRouteParams } from "@/navigation";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";
import { z } from "zod";

type FormSubmitProps = {
  handleSubmit: ReportFormHandleSubmit;
  reportedElementsIds?: NavigationRouteParams<"ReportIssues">["route"]["params"];
};

export default function FormSubmit({
  handleSubmit,
  reportedElementsIds,
}: FormSubmitProps) {
  const navigation = useNavigation();

  // Submit form
  const { mutate: createReport, isPending } = useCreateReport();
  function onSubmit({
    category,
    description,
  }: z.output<typeof reportFormSchema>) {
    createReport({
      newReport: {
        category: category?.value || "Unspecified",
        description,
        ...reportedElementsIds,
      },
    });
  }

  return (
    <View className="gap-3">
      <Button
        enabled={!isPending}
        variant="accent"
        onPress={() => navigation.goBack()}
      >
        <Text>
          <Trans>Go back</Trans>
        </Text>
      </Button>

      <Button
        isLoading={isPending}
        onPress={handleSubmit(onSubmit) as unknown as () => void}
      >
        <Text>
          <Trans>Help us improve!</Trans>
        </Text>
      </Button>
    </View>
  );
}
