import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import { capitalize } from "@/lib/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Trans, useLingui } from "@lingui/react/macro";
import { View } from "react-native";

type MemberSinceProps = {};

export default function AvatarInfo({}: MemberSinceProps) {
  const { THEME } = useTheme();
  const { i18n } = useLingui();
  const { profile } = useAuth();

  if (!profile)
    return (
      <View className="gap-2">
        <Skeleton className="w-48 h-5 bg-muted-foreground" />
        <Skeleton className="w-32 h-5 bg-muted-foreground" />
      </View>
    );

  const { email, is_private_email, created_at } = profile;

  return (
    <View>
      {/* Email */}
      {email && !is_private_email && (
        <View className="flex-row items-center gap-1">
          <MaterialCommunityIcons
            name="email-outline"
            size={18}
            color={THEME.mutedForeground}
          />
          <Text className="pr-8 text-sm text-muted-foreground line-clamp-1">
            {email}
          </Text>
        </View>
      )}

      {/* Member since */}
      <View className="flex-row items-center gap-1">
        <MaterialCommunityIcons
          name="cake-variant-outline"
          size={18}
          color={THEME.mutedForeground}
        />
        <Text className="pr-8 text-sm text-muted-foreground line-clamp-1">
          <Trans comment="Joined the application (at e.g. 02.04.2026)">
            Joined
          </Trans>{" "}
          {capitalize(
            i18n.date(created_at, { month: "long", year: "numeric" }),
          )}
        </Text>
      </View>
    </View>
  );
}
