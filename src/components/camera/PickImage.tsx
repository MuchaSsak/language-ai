import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/utils/useTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type PickImageProps = {};

export default function PickImage({}: PickImageProps) {
  const { THEME } = useTheme();

  return (
    <Button size="icon" variant="invisible">
      <MaterialCommunityIcons
        name="image-multiple-outline"
        size={24}
        color={THEME.white}
      />
    </Button>
  );
}
