import useLanguage from "@/hooks/utils/useLanguage";
import getVoices from "@/services/voices/getVoices";
import { useQuery } from "@tanstack/react-query";

export default function useGetVoices() {
  const { displayLanguage, learningLanguage } = useLanguage();

  const query = useQuery({
    queryKey: ["getVoices"],
    queryFn: () =>
      getVoices({
        displayLanguageLocale: displayLanguage.locale,
        learningLanguageLocale: learningLanguage.locale,
      }),
  });

  return query;
}
