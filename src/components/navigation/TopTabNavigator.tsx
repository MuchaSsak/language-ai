import useTheme from "@/hooks/utils/useTheme";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { Animated, Pressable, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

type TopTabNavigatorProps = PropsWithChildren & {
  className?: string;
  fontSize?: number;
  topTab: any;
};

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function TopTabNavigator({
  className,
  children,
  fontSize = 14,
  topTab,
}: TopTabNavigatorProps) {
  const { THEME, colorScheme } = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  const tabTextColor = colorScheme === "dark" ? "#7A7A7A" : THEME.foreground;

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      className={cn("flex-1 bg-background", className)}
    >
      <StatusBar style="auto" />

      <topTab.Navigator
        tabBar={({ state, descriptors, navigation, position }: any) => {
          const totalTabs = state.routes.length;
          const tabWidth = windowWidth / totalTabs;

          const createEasedOutputs = (tabIndex: number) => {
            const startX = tabIndex * tabWidth;
            return [
              startX,
              startX + tabWidth * 0.45,
              startX + tabWidth * 0.85,
              startX + tabWidth,
            ];
          };

          const inputRange = state.routes.reduce(
            (acc: number[], _: any, i: number) => {
              if (i === totalTabs - 1) return [...acc, i];
              return [...acc, i, i + 0.25, i + 0.75];
            },
            [],
          );

          const outputRange = state.routes.reduce(
            (acc: number[], _: any, i: number) => {
              if (i === totalTabs - 1) return [...acc, i * tabWidth];
              return [...acc, ...createEasedOutputs(i).slice(0, 3)];
            },
            [],
          );

          const translateX = position.interpolate({
            inputRange,
            outputRange,
            extrapolate: "clamp",
          });

          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: THEME.background,
                borderBottomWidth: 1,
                borderBottomColor: THEME.border,
                height: 42,
                marginTop: 10,
                position: "relative",
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: tabWidth,
                  height: "100%",
                  transform: [{ translateX }],
                  zIndex: 0,
                }}
              >
                <Svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 42"
                  preserveAspectRatio="none"
                >
                  <Path
                    d="M 0,42 C 24,42 12,0 33,0 L 67,0 C 88,0 76,42 100,42 Z"
                    fill={THEME.primary}
                  />
                </Svg>
              </Animated.View>

              {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                      ? options.title
                      : route.name;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate({ name: route.name, merge: true });
                  }
                };

                const renderIcon = () => {
                  if (!options.tabBarIcon) return null;

                  const iconElement = options.tabBarIcon({
                    color: tabTextColor,
                    focused: isFocused,
                  });

                  if (
                    iconElement &&
                    iconElement.props &&
                    iconElement.props.name
                  ) {
                    return (
                      <AnimatedIcon
                        name={iconElement.props.name}
                        size={20}
                        style={{
                          color: tabTextColor,
                        }}
                      />
                    );
                  }

                  return iconElement;
                };

                return (
                  <Pressable
                    key={route.key}
                    onPress={onPress}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: label.length > 9 ? 4 : 6,
                      paddingHorizontal: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    {renderIcon()}
                    <Animated.Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      style={{
                        fontFamily: "DMSans",
                        fontSize,
                        fontWeight: "600",
                        color: tabTextColor,
                        flexShrink: 1,
                      }}
                    >
                      {label}
                    </Animated.Text>
                  </Pressable>
                );
              })}
            </View>
          );
        }}
        screenOptions={{
          swipeEnabled: true,
          sceneStyle: {
            backgroundColor: THEME.background,
          },
        }}
      >
        {children}
      </topTab.Navigator>
    </SafeAreaView>
  );
}
