import { Text } from "@/components/ui/text";
import { Tables } from "@/typings/database.types";
import { useLingui } from "@lingui/react/macro";

type ProfileRankProps = { xp: Tables<"profiles">["xp"] };

export default function ProfileRank({ xp }: ProfileRankProps) {
  const { t } = useLingui();

  const RANKS_LABELS = [
    {
      minXP: 0,
      label: t`Novice`,
    },
    {
      minXP: 5000,
      label: t`Apprentice`,
    },
    {
      minXP: 20_000,
      label: t`Practitioner`,
    },
    {
      minXP: 40_000,
      label: t`Professional`,
    },
    {
      minXP: 100_000,
      label: t`Expert`,
    },
    {
      minXP: 500_000,
      label: t`Master`,
    },
  ];

  const { label } = [...RANKS_LABELS].reverse().find((r) => xp >= r.minXP)!;

  return <Text className="text-muted-foreground">{label}</Text>;
}
