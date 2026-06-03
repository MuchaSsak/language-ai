import SettingsLinksSection from "@/components/settings/SettingsLinksSection";
import useStoreReview from "@/hooks/operating-system/useStoreReview";
import useNavigation from "@/hooks/utils/useNavigation";
import useSecretPress from "@/hooks/utils/useSecretPress";
import useTheme from "@/hooks/utils/useTheme";
import {
  CONTACT_EMAIL,
  PRIVACY_POLICY_LINK,
  TERMS_AND_CONDITIONS_LINK,
} from "@/lib/constants";
import { openURL } from "@/lib/utils";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trans, useLingui } from "@lingui/react/macro";

import {
  BadgeDollarSign,
  Braces,
  FileText,
  Globe,
  HatGlasses,
  LogOut,
  Megaphone,
  MessageCircle,
  MoonStar,
  Shredder,
  Star,
  Vibrate,
} from "lucide-react-native";
import { ScrollView } from "react-native";

export default function SettingsModal() {
  const { t } = useLingui();
  const navigation = useNavigation();
  const { THEME } = useTheme();

  const { handleSecretPress, isSuccess } = useSecretPress();
  const { mutate: storeReview, isPending: isPendingStoreReview } =
    useStoreReview();

  return (
    <ScrollView contentContainerClassName="gap-6 p-6 pb-16 bg-background">
      {/* General */}
      <SettingsLinksSection
        onPressText={handleSecretPress}
        links={[
          {
            icon: (
              <FontAwesome5 name="user" size={18} color={THEME.foreground} />
            ),
            label: t`Account`,
            onPress: () => navigation.navigate("Account"),
            className: "ml-px",
          },
          {
            icon: <Globe size={18} color={THEME.foreground} />,
            label: t({
              message: `Display Language`,
              comment: "The application's display language",
            }),
            onPress: () => navigation.navigate("DisplayLanguage"),
          },
          {
            icon: <BadgeDollarSign size={18} color={THEME.foreground} />,
            label: t`Subscription`,
            onPress: () => navigation.navigate("Subscription"),
          },
          {
            icon: <HatGlasses size={18} color={THEME.foreground} />,
            label: t`Privacy Policy`,
            onPress: () => openURL(PRIVACY_POLICY_LINK),
          },
          {
            icon: <FileText size={18} color={THEME.foreground} />,
            label: t`Terms & Conditions`,
            onPress: () => openURL(TERMS_AND_CONDITIONS_LINK),
          },
        ]}
      >
        <Trans>General</Trans>
      </SettingsLinksSection>

      {/* Preferences */}
      <SettingsLinksSection
        links={[
          {
            icon: <Fontisto name="bell" size={18} color={THEME.foreground} />,
            label: t`Notifications`,
            onPress: () =>
              navigation.navigate("Notifications", { hasGoBackButton: true }),
          },
          {
            icon: (
              <FontAwesome5
                name="headphones-alt"
                size={18}
                color={THEME.foreground}
              />
            ),
            label: t`Audio`,
            onPress: () => navigation.navigate("AudioFeedback"),
          },
          {
            icon: <Vibrate size={18} color={THEME.foreground} />,
            label: t`Haptics`,
            onPress: () => navigation.navigate("Haptics"),
          },
          {
            icon: <MoonStar size={18} color={THEME.foreground} />,
            label: t`Dark Mode`,
            onPress: () => navigation.navigate("DarkMode"),
          },
          {
            icon: (
              <Ionicons
                name="language-sharp"
                size={18}
                color={THEME.foreground}
              />
            ),
            label: t({
              message: `Learning Language`,
              comment:
                "The language which the user selected in the application's preferences settings as the target language for learning from flashcards",
            }),
            onPress: () => navigation.navigate("LearningLanguage"),
          },
          {
            icon: <Entypo name="popup" size={18} color={THEME.foreground} />,
            label: t`Pop-ups`,
            onPress: () => navigation.navigate("PopUps"),
          },
        ]}
      >
        <Trans>Preferences</Trans>
      </SettingsLinksSection>

      {/* Support */}
      <SettingsLinksSection
        links={[
          {
            icon: <MessageCircle size={18} color={THEME.foreground} />,
            label: t`Contact Us`,
            onPress: () =>
              openURL(
                `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t`Contact Request`)}`,
              ),
          },
          {
            icon: <Star size={18} color={THEME.foreground} />,
            label: t`Review`,
            onPress: () => storeReview(),
            isLoading: isPendingStoreReview,
          },
          {
            icon: <Megaphone size={18} color={THEME.foreground} />,
            label: t`Report Issues`,
            onPress: () => navigation.navigate("ReportIssues", {}),
          },
          {
            icon: <Braces size={18} color={THEME.foreground} />,
            label: t`Export Data`,
            onPress: () => navigation.navigate("ExportData"),
          },
          {
            icon: <Entypo name="tools" size={18} color={THEME.foreground} />,
            label: t`Developer Debug`,
            onPress: () => navigation.navigate("DeveloperDebug"),
            isHidden: !isSuccess,
          },
          {
            icon: <LogOut size={18} color={THEME.destructive} />,
            label: t`Sign Out`,
            onPress: () => navigation.navigate("SignOut"),
            isDestructive: true,
          },
          {
            icon: <Shredder size={18} color={THEME.destructive} />,
            label: t`Delete Account`,
            onPress: () => navigation.navigate("DeleteAccount"),
            isDestructive: true,
          },
        ]}
      >
        <Trans>Support</Trans>
      </SettingsLinksSection>
    </ScrollView>
  );
}
