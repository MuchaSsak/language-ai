import { cn } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

function Skeleton({ className, ...props }: React.ComponentProps<typeof View>) {
  const { width: viewportWidth } = useWindowDimensions();
  const translateX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [translateX]);

  const moveTrigger = translateX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-viewportWidth, viewportWidth],
  });

  return (
    <View
      className={cn(
        "animate-skeleton rounded-md overflow-hidden relative",
        className,
      )}
      {...props}
    >
      {/* Shimmer */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX: moveTrigger }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0.25)",
            "rgba(255, 255, 255, 0)",
            "transparent",
          ]}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 1, y: 0.9 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

export { Skeleton };
