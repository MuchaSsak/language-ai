import { View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from "react-hook-form";

import FormCategory from "@/components/report/FormCategory";
import FormDescription from "@/components/report/FormDescription";
import FormSubmit from "@/components/report/FormSubmit";
import { reportFormSchema } from "@/lib/zodSchemas";
import { NavigationRouteParams } from "@/navigation";
import { z } from "zod";

/**
 * Types
 */
type ReportFormStructure = z.infer<typeof reportFormSchema>;

export type ReportFormControl = Control<
  ReportFormStructure,
  unknown,
  ReportFormStructure
>;
export type ReportFormErrors = FieldErrors<ReportFormStructure>;
export type ReportFormHandleSubmit = UseFormHandleSubmit<
  ReportFormStructure,
  ReportFormStructure
>;

type FormProps = {
  reportedElementsIds?: NavigationRouteParams<"ReportIssues">["route"]["params"];
};

export default function Form({ reportedElementsIds }: FormProps) {
  // Hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      category: undefined,
      description: "",
    },
  });

  return (
    <View className="justify-between flex-1 gap-16">
      <View className="gap-5">
        <FormCategory control={control} />
        <FormDescription control={control} errors={errors} />
      </View>

      <FormSubmit
        handleSubmit={handleSubmit}
        reportedElementsIds={reportedElementsIds}
      />
    </View>
  );
}
