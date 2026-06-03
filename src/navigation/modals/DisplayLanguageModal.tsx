import LanguagePicker from "@/components/settings/LanguagePicker";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useLanguage from "@/hooks/utils/useLanguage";
import useNavigation from "@/hooks/utils/useNavigation";
import { Trans } from "@lingui/react/macro";

import { ScrollView, View } from "react-native";

type DisplayLanguageModalProps = {};

export default function DisplayLanguageModal({}: DisplayLanguageModalProps) {
  const { displayLanguage, handleChangeDisplayLanguage } = useLanguage();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerClassName="relative flex-1 pt-4">
      <LanguagePicker
        className="px-4"
        value={displayLanguage.locale}
        onValueChange={(newLanguage) =>
          handleChangeDisplayLanguage(newLanguage)
        }
      />

      <View className="px-6 pb-16">
        <Button onPress={() => navigation.goBack()}>
          <Text>
            <Trans>Save!</Trans>
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
