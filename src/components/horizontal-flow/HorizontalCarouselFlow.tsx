import { Slide } from "@/hooks/horizontal-flow/useHorizontalFlowSlides";
import { StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";
import { EaseView, Transition } from "react-native-ease";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type HorizontalCarouselFlowProps = {
  slides: Slide[];
  slideIndex: number;
  transition?: Partial<Transition>;
  style?: StyleProp<ViewStyle>;
};

export default function HorizontalCarouselFlow({
  slides,
  slideIndex,
  transition = { type: "spring", stiffness: 100, damping: 20 },
  style,
}: HorizontalCarouselFlowProps) {
  const { width } = useWindowDimensions();

  return (
    <EaseView
      animate={{
        translateX: -slideIndex * width,
      }}
      transition={transition as Transition}
      style={[
        { flex: 1, flexDirection: "row", paddingTop: 20, paddingBottom: 0 },
        { width: width * slides.length },
        style,
      ]}
    >
      {slides.map(({ id, Component, isScrollView = true }) => {
        if (!isScrollView)
          return (
            <View key={id} style={{ width }}>
              <Component />
            </View>
          );

        return (
          <KeyboardAwareScrollView
            key={id}
            contentContainerClassName="flex-grow"
            bounces={false}
            style={{ width }}
          >
            <Component />
          </KeyboardAwareScrollView>
        );
      })}
    </EaseView>
  );
}
