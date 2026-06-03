import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useTheme from "@/hooks/utils/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLingui } from "@lingui/react/macro";
import { PropsWithChildren } from "react";

type QuestionTooltipProps = PropsWithChildren & {};

export default function QuestionTooltip({ children }: QuestionTooltipProps) {
  const { t } = useLingui();
  const { THEME } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="invisible"
          accessibilityLabel={t`Open AI prompt tooltip`}
          size="icon"
          className="size-6"
          hitSlop={24}
        >
          <AntDesign
            name="question-circle"
            size={18}
            color={THEME.mutedForeground}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" sideOffset={10}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
