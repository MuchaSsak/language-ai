import TopTabNavigator from "@/components/navigation/TopTabNavigator";
import GoalsTabPage from "@/components/quests/GoalsTabPage";
import QuestsTabPage from "@/components/quests/QuestsTabPage";
import { Ionicons } from "@expo/vector-icons";
import { useLingui } from "@lingui/react/macro";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

export default function QuestsTab() {
  const { t } = useLingui();

  return (
    <TopTabNavigator topTab={TopTab}>
      <TopTab.Screen
        name="QuestsTabPage1"
        component={QuestsTabPage}
        options={{
          title: t({
            message: `Quests`,
            context:
              "Make sure to not make this word much longer (like 9 letters MAXIMUM) or else my UI will overflow. Use alternative words if absolutely necessary",
          }),
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={18} color={color} />
          ),
        }}
      />
      <TopTab.Screen
        name="GoalsTabPage"
        component={GoalsTabPage}
        options={{
          title: t`Goals`,
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={18} color={color} />
          ),
        }}
      />
    </TopTabNavigator>
  );
}
