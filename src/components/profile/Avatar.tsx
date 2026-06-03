import {
  AvatarFallback,
  AvatarImage,
  Avatar as RNAvatar,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import { cn, nameToInitials } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";

type AvatarProps = {
  textClassName?: string;
  className?: string;
  size?: number;
};

export default function Avatar({
  textClassName,
  className,
  size = 128,
}: AvatarProps) {
  const { t } = useLingui();
  const { profile } = useAuth();

  if (!profile)
    return (
      <Skeleton
        className={cn("rounded-full bg-muted-foreground", className)}
        style={{ width: size, height: size }}
      />
    );

  return (
    <RNAvatar
      className={className}
      style={{ width: size, height: size }}
      alt={t`Your profile picture`}
    >
      <AvatarImage
        width={size}
        height={size}
        source={{ uri: profile.avatar_url ?? "" }}
      />
      <AvatarFallback className="bg-rose-400 dark:bg-rose-700">
        <Text className={cn("text-5xl font-bold leading-none", textClassName)}>
          {nameToInitials(profile.username ?? t`Anonymous`)}
        </Text>
      </AvatarFallback>
    </RNAvatar>
  );
}
