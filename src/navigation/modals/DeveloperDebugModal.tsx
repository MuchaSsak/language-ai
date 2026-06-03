import { toast } from "@/components/layout/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useConfetti } from "@/contexts/ConfettiContext";
import useNavigation from "@/hooks/utils/useNavigation";
import useTheme from "@/hooks/utils/useTheme";
import { hookLogsArr, servicesLogsArr } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { useMMKV } from "react-native-mmkv";
import { SafeAreaView } from "react-native-safe-area-context";

type DeveloperDebugModalProps = {};

export default function DeveloperDebugModal({}: DeveloperDebugModalProps) {
  const navigation = useNavigation();
  const mmkv = useMMKV();
  const confetti = useConfetti();
  const { THEME } = useTheme();

  const [studySetId, setStudySetId] = useState(
    "f50b92ab-b2f4-4c02-8c6d-440fb79caf75",
  );
  const [quizId, setQuizId] = useState("");

  return (
    <SafeAreaView className="px-6">
      <ScrollView contentContainerClassName="gap-6">
        {/* Inputs */}
        <View className="gap-3">
          <View className="gap-1">
            <Text>studySetId</Text>
            <Input
              placeholder="f50b92ab-b2f4-4c02-8c6d-..."
              value={studySetId}
              onChangeText={(newText) => setStudySetId(newText)}
            />
          </View>

          <View className="gap-1">
            <Text>quizId</Text>
            <Input
              placeholder="f50b92ab-b2f4-4c02-8c6d-..."
              value={quizId}
              onChangeText={(newText) => setQuizId(newText)}
            />
          </View>
        </View>

        {/* Toasts */}
        <View className="gap-2">
          <Text className="text-xl font-bold">Toasts</Text>

          <Button onPress={() => confetti.restart()}>
            <Text>Show confetti</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "quest",
                props: {
                  cycle: "daily",
                  xp_gain: 500,
                  icon_element: () => (
                    <Ionicons
                      name="game-controller"
                      size={64}
                      color={THEME.pink[200]}
                    />
                  ),
                  iconContainerClassName: "px-4",
                },
                text1: "Daily quest completed!",
                text2: `You've just finished "Spend 10 minutes learning"`,
              })
            }
          >
            <Text>Quest daily spend time</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "quest",
                props: {
                  cycle: "weekly",
                  xp_gain: 500,
                  icon_element: () => (
                    <Ionicons
                      name="game-controller"
                      size={64}
                      color={THEME.purple[200]}
                    />
                  ),
                  iconContainerClassName: "px-4",
                },
                text1: "Daily quest completed!",
                text2: `You've just finished "Spend 10 minutes learning"`,
              })
            }
          >
            <Text>Quest weekly spend time</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "day-streak",
                props: {
                  icon_asset: require("@/assets/gifs/fire.gif"),
                  icon_style: { width: 64, height: 80 },
                },
                text1: "77 day streak and counting! Keep it up!",
              })
            }
          >
            <Text>Toast day streak</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "achievement",
                text1: `Congratulations! You've just earned the achievement!`,
                props: {
                  xp_gain: 300,
                  rarity: "Bronze",
                  icon_url:
                    "https://npoyhglzsjzgxysahfnn.supabase.co/storage/v1/object/public/achievements/enable-text-to-speech.png",
                },
              })
            }
          >
            <Text>Toast achievement Bronze</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "achievement",
                text1: `Congratulations! You've just earned the achievement!`,
                props: {
                  xp_gain: 300,
                  rarity: "Silver",
                  icon_url:
                    "https://npoyhglzsjzgxysahfnn.supabase.co/storage/v1/object/public/achievements/quiz-speedrun.png",
                },
              })
            }
          >
            <Text>Toast achievement Silver</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "achievement",
                text1: `Congratulations! You've just earned the achievement!`,
                props: {
                  xp_gain: 300,
                  rarity: "Gold",
                  icon_url:
                    "https://npoyhglzsjzgxysahfnn.supabase.co/storage/v1/object/public/achievements/perfect-accuracy.png",
                },
              })
            }
          >
            <Text>Toast achievement Gold</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "achievement",
                text1: `Congratulations! You've just earned the achievement!`,
                props: {
                  xp_gain: 300,
                  rarity: "Platinum",
                  icon_url:
                    "https://npoyhglzsjzgxysahfnn.supabase.co/storage/v1/object/public/achievements/complete-linkoglot-onboarding.png",
                },
              })
            }
          >
            <Text>Toast achievement Platinum</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "error",
                text1:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
              })
            }
          >
            <Text>Toast error</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "success",
                text1:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
              })
            }
          >
            <Text>Toast success</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "warning",
                text1:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
              })
            }
          >
            <Text>Toast warning</Text>
          </Button>
          <Button
            onPress={() =>
              toast({
                type: "info",
                text1:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
              })
            }
          >
            <Text>Toast info</Text>
          </Button>
        </View>

        {/* State */}
        <View className="gap-2">
          <Text className="text-xl font-bold">State</Text>

          <Button
            onPress={() => {
              mmkv.clearAll();
            }}
          >
            <Text>Clear MMKV</Text>
          </Button>
        </View>

        {/* Services logs */}
        <View className="gap-2">
          <Text className="text-xl font-bold">⚙️ Services logs</Text>

          {servicesLogsArr.map(({ data, name, timestamp }, i) => (
            <View key={i}>
              <Text className="font-medium">
                {name} {timestamp}
              </Text>
              <Text className="whitespace-pre">
                {JSON.stringify(data, null, 2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Hook logs */}
        <View className="gap-2">
          <Text className="text-xl font-bold">🪝 Hook logs</Text>

          {hookLogsArr.map(({ data, name, timestamp }, i) => (
            <View key={i}>
              <Text className="font-medium">
                {name} {timestamp}
              </Text>
              <Text className="whitespace-pre">
                {JSON.stringify(data, null, 2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Just don't ask. I don't even want to explain anymore... */}
        <View className="w-32 h-32 bg-red-500" />
        <View className="w-32 h-32 bg-blue-500" />
        <View className="w-32 h-32 bg-green-500" />
      </ScrollView>
    </SafeAreaView>
  );
}
