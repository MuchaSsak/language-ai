import { formatNumber } from "@/lib/utils";
import { Trans } from "@lingui/react/macro";

type TotalTimeSpentProps = {
  seconds: number;
};

export default function TotalTimeSpent({ seconds }: TotalTimeSpentProps) {
  function getDuration(totalSeconds: number) {
    if (totalSeconds < 60)
      return { value: formatNumber(totalSeconds), unit: "second" as const };

    const minutes = Math.round(totalSeconds / 60);
    if (minutes < 60)
      return { value: formatNumber(minutes), unit: "minute" as const };

    const hours = Math.round(minutes / 60);
    return { value: formatNumber(hours), unit: "hour" as const };
  }

  const { value, unit } = getDuration(seconds);

  if (seconds === 0) return <Trans>&lt; 1s</Trans>;

  if (unit === "second") return <Trans>{value}s</Trans>;

  if (unit === "minute") {
    return value === "1" ? (
      <Trans>{value} min</Trans>
    ) : (
      <Trans>{value} mins</Trans>
    );
  }

  if (unit === "hour") return <Trans>{value}h</Trans>;
}
