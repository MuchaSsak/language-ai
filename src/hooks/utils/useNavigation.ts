import {
  NavigationObject,
  navigationRef,
  RootStackParamList,
} from "@/navigation";
import {
  CommonActions,
  StackActions,
  useNavigation as useRNNavigation,
} from "@react-navigation/native";

/**
 * Constants
 */
export const SHEET_ALLOWED_PARENTS = {
  ImportFlashcardsOptions: ["CreateStudySet", "EditStudySet"],
  GenerateStudySet: ["CreateStudySet", "EditStudySet"],
  QuizAnswerResult: ["Quiz", "Challenge"],
} as const satisfies Partial<
  Record<keyof RootStackParamList, readonly (keyof RootStackParamList)[]>
>;

export const SHEET_NAMES = Object.keys(SHEET_ALLOWED_PARENTS);

/**
 * Functions
 */
// Sheets
export function toggleSheet<RouteName extends keyof RootStackParamList>(
  navigation: NavigationObject,
  ...args: ToggleSheetArgs<RouteName>
) {
  const routeName = args[0];
  const params = args[1];

  const state = navigation.getState();
  if (!state) return;

  const currentRoute = state.routes[state.index];

  if (currentRoute?.name === routeName) {
    if (navigation.canGoBack()) {
      navigation.dispatch(StackActions.pop(1));
    }
    return;
  }

  navigation.dispatch((state) => {
    const baseRoutes = state.routes.filter(
      (r) => !SHEET_NAMES.includes(r.name as keyof RootStackParamList),
    );

    return CommonActions.reset({
      ...state,
      index: baseRoutes.length,
      routes: [...baseRoutes, { name: routeName, params }],
    });
  });
}

export function dismissAllSheets(navigation: NavigationObject) {
  navigation.dispatch((state) => {
    if (!state) return CommonActions.reset({ index: 0, routes: [] });

    // Filter out everything defined as a "sheet"
    const baseRoutes = state.routes.filter(
      (r) => !SHEET_NAMES.includes(r.name),
    );

    return CommonActions.reset({
      ...state,
      index: baseRoutes.length - 1,
      routes: baseRoutes,
    });
  });
}

export function dismissSheet(
  navigation: NavigationObject,
  sheetName: keyof RootStackParamList,
) {
  navigation.dispatch((state) => {
    if (!state) return CommonActions.reset({ index: 0, routes: [] });

    const updatedRoutes = state.routes.filter((r) => r.name !== sheetName);

    // Change nothing if no sheet found
    if (updatedRoutes.length === state.routes.length)
      return CommonActions.reset(state);

    return CommonActions.reset({
      ...state,
      index: updatedRoutes.length - 1,
      routes: updatedRoutes,
    });
  });
}

// Navigate / Push
export function goHome(navigation: NavigationObject) {
  if (navigation.canGoBack()) {
    navigation.dispatch(StackActions.popToTop());
  } else {
    // Fallback if we're already at the root
    navigation.navigate("HomeTabs");
  }
}

// Go back
export function goBack(navigation: NavigationObject) {
  if (navigation.canGoBack()) {
    navigation.dispatch(CommonActions.goBack());
  } else {
    // Look for a parent navigator if the local stack is empty
    const parentNavigation = navigation.getParent();
    if (parentNavigation && parentNavigation.canGoBack()) {
      parentNavigation.dispatch(CommonActions.goBack());
    } else {
      goHome(navigation);
    }
  }
}

export function getRouteName() {
  if (!navigationRef.isReady()) {
    console.warn(
      "Navigation state accessed before navigationRef was ready (getRouteName).",
    );
    return null;
  }

  return navigationRef.getCurrentRoute()?.name as keyof RootStackParamList;
}

export function isRouteInStack(routeName: keyof RootStackParamList) {
  if (!navigationRef.isReady()) {
    console.warn(
      "Navigation state accessed before navigationRef was ready (isRouteInStack).",
    );
    return null;
  }

  const state = navigationRef.getRootState();
  if (!state) return false;

  const checkState = (navState: any) => {
    if (!navState || !navState.routes) return false;

    for (const route of navState.routes) {
      if (route.name === routeName) return true;
      if (route.state && checkState(route.state)) return true;
    }
    return false;
  };

  return checkState(state);
}

export function isSheetAllowedInCurrentStack(
  sheetName: keyof typeof SHEET_ALLOWED_PARENTS,
) {
  const allowedParents = SHEET_ALLOWED_PARENTS[sheetName];
  if (!allowedParents) return true;

  return allowedParents.some((parentRoute) => isRouteInStack(parentRoute));
}

/**
 * Hook
 */
type ToggleSheetArgs<RouteName extends keyof RootStackParamList> =
  RootStackParamList[RouteName] extends undefined
    ? [routeName: RouteName, params?: RootStackParamList[RouteName]]
    : [routeName: RouteName, params: RootStackParamList[RouteName]];

export type CustomNavigationObject = NavigationObject & {
  toggleSheet: <RouteName extends keyof RootStackParamList>(
    ...args: ToggleSheetArgs<RouteName>
  ) => void;
  goHome: () => void;
  dismissAllSheets: () => void;
  dismissSheet: (sheetName: keyof RootStackParamList) => void;
  getRouteName: () => keyof RootStackParamList | null;
  isRouteInStack: (routeName: keyof RootStackParamList) => boolean | null;
  isSheetAllowedInCurrentStack: (
    sheetName: keyof typeof SHEET_ALLOWED_PARENTS,
  ) => boolean;
};

export default function useNavigation(): CustomNavigationObject {
  const navigation = useRNNavigation<NavigationObject>();

  function _toggleSheet<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName],
  ) {
    toggleSheet(navigation, routeName, params as any);
  }

  function _dismissAllSheets() {
    dismissAllSheets(navigation);
  }

  function _dismissSheet(sheetName: keyof RootStackParamList) {
    dismissSheet(navigation, sheetName);
  }

  function _goHome() {
    goHome(navigation);
  }

  function _goBack() {
    goBack(navigation);
  }

  function _getRouteName() {
    return getRouteName();
  }

  function _isRouteInStack(routeName: keyof RootStackParamList) {
    return isRouteInStack(routeName);
  }

  function _isSheetAllowedInCurrentStack(
    sheetName: keyof typeof SHEET_ALLOWED_PARENTS,
  ) {
    return isSheetAllowedInCurrentStack(sheetName);
  }

  return {
    ...navigation,
    toggleSheet: _toggleSheet,
    goHome: _goHome,
    dismissAllSheets: _dismissAllSheets,
    dismissSheet: _dismissSheet,
    goBack: _goBack,
    getRouteName: _getRouteName,
    isRouteInStack: _isRouteInStack,
    isSheetAllowedInCurrentStack: _isSheetAllowedInCurrentStack,
  };
}
