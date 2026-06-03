import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import useLanguage from "@/hooks/utils/useLanguage";
import { Enums, Tables } from "@/typings/database.types";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps, ReactNode } from "react";
import { View } from "react-native";

type QuestIcon = {
  value: Enums<"QUESTS_ICONS">;
  icon: (
    color: string,
    props?: Omit<ComponentProps<typeof Ionicons>, "name" | "color">,
  ) => ReactNode;
};

export const QUESTS_ICONS: QuestIcon[] = [
  {
    value: "flash",
    icon: (color: string, ...props) => (
      <Ionicons color={color} name="flash" size={40} {...props} />
    ),
  },
  {
    value: "stopwatch",
    icon: (color: string, ...props) => (
      <Entypo color={color} name="stopwatch" size={40} {...props} />
    ),
  },
  {
    value: "game-controller",
    icon: (color: string, ...props) => (
      <Ionicons name="game-controller" size={32} color={color} {...props} />
    ),
  },
] as const;

type QuestCardProps = {
  quest: Tables<"quests_users"> & Tables<"quests_pool">;
  color: string;
};

export default function QuestCard({ quest, color }: QuestCardProps) {
  const { displayLanguage } = useLanguage();
  const { title, current_value, required_value } = quest;
  const progressPercentage = (current_value / required_value) * 100;
  const isCompleted = progressPercentage >= 100;

  const icon = (
    QUESTS_ICONS.find((i) => i.value === quest.icon) || QUESTS_ICONS[0]
  ).icon(color);

  return (
    <View className="flex-row gap-4 p-4 border-b-[3px] items-center border-background">
      <View className="items-center justify-center w-10">{icon}</View>

      <View className="justify-between flex-1 gap-2">
        <Text className="font-medium line-clamp-1">
          {title[displayLanguage.locale]}
        </Text>

        <View className="flex-row items-center gap-2">
          <Progress className="h-4" value={progressPercentage} color={color}>
            {current_value}/{required_value}
          </Progress>
          <MaterialCommunityIcons
            name="treasure-chest"
            className={isCompleted ? "opacity-100" : "opacity-50"}
            size={20}
            color={color}
          />
        </View>
      </View>
    </View>
  );
}
