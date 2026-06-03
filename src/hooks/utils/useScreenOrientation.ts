import { useQuery } from "@tanstack/react-query";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

export default function useScreenOrientation(
  handleOnChange?: (e: ScreenOrientation.OrientationChangeEvent) => void,
) {
  const query = useQuery({
    queryKey: ["getOrientationAsync"],
    queryFn: () => ScreenOrientation.getOrientationAsync(),
  });

  // Subscribe to changes
  //   TODO:
  useEffect(() => {
    //  const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
    //    console.log(e);
    //    handleOnChange?.(e);
    //  });
    //  return () => {
    //    subscription.remove();
    //  };
  }, [handleOnChange]);

  return query;
}
