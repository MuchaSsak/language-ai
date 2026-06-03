import { PressablesConfigProps } from "pressto";

export const presstoConfigDefault: PressablesConfigProps<"spring"> = {
  config: {},
  animationConfig: {
    mass: 0.9,
  },
};

export const presstoConfigIcon: PressablesConfigProps<"spring"> = {
  config: { minScale: 0.9, activeOpacity: 0.7 },
  animationConfig: { mass: 0.9 },
};
