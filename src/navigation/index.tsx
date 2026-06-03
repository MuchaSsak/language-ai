import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNavigationContainerRef,
  LinkingOptions,
  NavigationContainer,
  RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, Platform } from "react-native";

import NavigationProviders from "@/components/layout/providers/NavigationProviders";
import ModalHeaderButtons from "@/components/navigation/ModalHeaderButtons";
import { useAuth } from "@/contexts/AuthContext";
import useTheme from "@/hooks/utils/useTheme";
import AccountModal from "@/navigation/modals/AccountModal";
import AchievementsModal from "@/navigation/modals/AchievementsModal";
import AnalyzedPictureModal from "@/navigation/modals/AnalyzedPictureModal";
import AudioFeedbackModal from "@/navigation/modals/AudioFeedbackModal";
import DarkModeModal from "@/navigation/modals/DarkModeModal";
import DeleteAccountModal from "@/navigation/modals/DeleteAccountModal";
import DeveloperDebugModal from "@/navigation/modals/DeveloperDebugModal";
import DisplayLanguageModal from "@/navigation/modals/DisplayLanguageModal";
import ExportDataModal from "@/navigation/modals/ExportDataModal";
import GoalsForSessionModal from "@/navigation/modals/GoalsForSessionModal";
import HapticsModal from "@/navigation/modals/HapticsModal";
import LearningLanguageModal from "@/navigation/modals/LearningLanguageModal";
import NotificationsModal from "@/navigation/modals/NotificationsModal";
import PopUpsModal from "@/navigation/modals/PopUpsModal";
import ReportIssuesModal from "@/navigation/modals/ReportIssuesModal";
import SettingsModal from "@/navigation/modals/SettingsModal";
import SignOutModal from "@/navigation/modals/SignOutModal";
import SubscriptionCancelModal from "@/navigation/modals/SubscriptionCancelModal";
import SubscriptionChangePlanModal from "@/navigation/modals/SubscriptionChangePlanModal";
import SubscriptionModal from "@/navigation/modals/SubscriptionModal";
import TakenPictureModal from "@/navigation/modals/TakenPictureModal";
import NotFound from "@/navigation/screens/NotFoundScreen";
import OnboardingScreen from "@/navigation/screens/OnboardingScreen";
import CameraTab from "@/navigation/tabs/CameraTab";
import ProfileTab from "@/navigation/tabs/ProfileTab";
import QuestsTab from "@/navigation/tabs/QuestsTab";
import { Feather } from "@expo/vector-icons";
import { useLingui } from "@lingui/react/macro";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/**
 * Base modal options
 */
function baseModalOptions(
  navigation: NavigationObject,
): NativeStackNavigationOptions {
  return {
    animation: "slide_from_bottom",
    presentation: "modal",
    sheetGrabberVisible: true,

    headerTitleStyle: {
      fontFamily: "DMSans",
      fontWeight: "600",
    },
    headerBackButtonDisplayMode: "minimal",
    headerLeft: () => (
      <ModalHeaderButtons
        navigation={navigation}
        buttons={[{ onConfirm: () => navigation.goBack(), icon: "back" }]}
      />
    ),
    headerTitleAlign: "center",
  };
}

/**
 * Base sheet options
 */
function baseSheetOptions(
  navigation: NavigationObject,
): NativeStackNavigationOptions {
  return {
    animation: "slide_from_bottom",
    presentation: "formSheet",
    headerShown: false,
    sheetAllowedDetents: "fitToContents",
    headerRight: () => (
      <ModalHeaderButtons
        navigation={navigation}
        buttons={[{ onConfirm: () => navigation.goBack(), icon: "close" }]}
      />
    ),

    sheetInitialDetentIndex: 0,
    sheetLargestUndimmedDetentIndex: 0,
    sheetGrabberVisible: false,
    sheetCornerRadius: 30,

    contentStyle: {
      backgroundColor: "transparent",
    },
  };
}

/**
 * Base screen options
 */
function baseScreenOptions(
  navigation: NavigationObject,
): NativeStackNavigationOptions {
  return {
    headerShown: false,
    gestureEnabled: false,
    headerTitleStyle: { fontFamily: "DMSans", fontWeight: "600" },
    headerTitleAlign: "center",
    headerLeft: () => (
      <ModalHeaderButtons
        navigation={navigation}
        buttons={[{ icon: "back", onConfirm: () => navigation.goBack() }]}
      />
    ),
  };
}

/**
 * Tabs Navigator
 */
function HomeTabs() {
  const { t } = useLingui();
  const { THEME } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="default"
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.16)",
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Camera"
        component={CameraTab}
        options={{
          title: t`Camera`,
          tabBarIcon: ({ color, size }) =>
            Platform.OS === "ios" ? (
              <Feather name="camera" size={size} color={color} />
            ) : (
              <Image
                source={require("@/assets/icons/camera.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          tabBarInactiveTintColor: THEME.mutedForeground,
          tabBarActiveTintColor: THEME.primary,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Quests"
        component={QuestsTab}
        options={{
          title: t`Quests`,
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            Platform.OS === "ios" ? (
              <Feather name="star" size={size} color={color} />
            ) : (
              <Image
                source={require("@/assets/icons/quests.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          tabBarInactiveTintColor: THEME.mutedForeground,
          tabBarActiveTintColor: THEME.primary,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          title: t`Profile`,
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            Platform.OS === "ios" ? (
              <Feather name="user" size={size} color={color} />
            ) : (
              <Image
                source={require("@/assets/icons/profile.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          tabBarInactiveTintColor: THEME.mutedForeground,
          tabBarActiveTintColor: THEME.primary,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root Stack Navigator
 */
type NavigationProps = {
  theme: ReactNavigation.Theme;
  linking: LinkingOptions<ReactNavigation.RootParamList>;
  onReady?: () => void;
};

export const navigationRef = createNavigationContainerRef();

export function Navigation({ theme, linking, onReady }: NavigationProps) {
  const { t } = useLingui();
  const { isAuthenticated, isSubscribed } = useAuth();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      linking={linking}
      onReady={onReady}
    >
      <NavigationProviders>
        <Stack.Navigator>
          {/* Protected screens */}
          {isAuthenticated && isSubscribed && (
            <>
              {/* Main Tabs */}
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
              />

              {/* Modals */}
              <Stack.Screen
                name="Settings"
                component={SettingsModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerLeft: () => (
                    <ModalHeaderButtons
                      navigation={navigation}
                      buttons={[
                        {
                          icon: "back",
                          onConfirm: () => navigation.goBack(),
                        },
                      ]}
                    />
                  ),

                  headerTitle: t`Settings`,
                })}
              />

              <Stack.Screen
                name="Achievements"
                component={AchievementsModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Achievements`,
                })}
              />

              <Stack.Screen
                name="Notifications"
                component={NotificationsModal}
                initialParams={{ hasGoBackButton: false }}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Notifications`,
                })}
              />

              <Stack.Screen
                name="Account"
                component={AccountModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Account`,
                })}
              />

              <Stack.Screen
                name="Subscription"
                component={SubscriptionModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Subscription`,
                })}
              />

              <Stack.Screen
                name="SubscriptionCancel"
                component={SubscriptionCancelModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Cancel Subscription`,
                })}
              />

              <Stack.Screen
                name="SubscriptionChangePlan"
                component={SubscriptionChangePlanModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Change Subscription`,
                })}
              />

              <Stack.Screen
                name="Haptics"
                component={HapticsModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Haptics`,
                })}
              />

              <Stack.Screen
                name="DarkMode"
                component={DarkModeModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Dark Mode`,
                })}
              />

              <Stack.Screen
                name="LearningLanguage"
                component={LearningLanguageModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Learning Language`,
                })}
              />

              <Stack.Screen
                name="PopUps"
                component={PopUpsModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Pop-ups`,
                })}
              />

              <Stack.Screen
                name="ReportIssues"
                component={ReportIssuesModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Report Issues`,
                })}
              />

              <Stack.Screen
                name="ExportData"
                component={ExportDataModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Export Data`,
                })}
              />

              <Stack.Screen
                name="AudioFeedback"
                component={AudioFeedbackModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Audio Feedback`,
                  headerLeft: () => (
                    <ModalHeaderButtons
                      buttons={[
                        {
                          onConfirm: () => navigation.goBack(),
                          dialogTitle: t`Are you sure you want to discard your changes?`,
                          dialogDescription: t`Your new audio configuration won't be saved!`,
                          dialogCancelButtonText: t`No, go back`,
                          dialogConfirmButtonText: t`Yes, discard changes`,
                          icon: "back",
                        },
                      ]}
                      navigation={navigation}
                    />
                  ),
                })}
              />

              <Stack.Screen
                name="SignOut"
                component={SignOutModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Sign Out`,
                })}
              />

              <Stack.Screen
                name="DeveloperDebug"
                component={DeveloperDebugModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Developer Debug`,
                })}
              />

              <Stack.Screen
                name="DeleteAccount"
                component={DeleteAccountModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Delete Account`,
                })}
              />

              <Stack.Screen
                name="GoalsForSession"
                component={GoalsForSessionModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Quick question!`,
                })}
              />

              <Stack.Screen
                name="TakenPicture"
                component={TakenPictureModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: Platform.select({
                    ios: t`Picture`,
                    android: "",
                  }),
                  headerTitleAlign: "left",
                })}
              />

              <Stack.Screen
                name="AnalyzedPicture"
                component={AnalyzedPictureModal}
                options={({ navigation }) => ({
                  ...baseModalOptions(navigation),
                  headerTitle: t`Analyzed Picture`,
                })}
              />
            </>
          )}

          {/* Unprotected screens */}
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={({ navigation }) => ({
              ...baseScreenOptions(navigation),
            })}
          />

          <Stack.Screen
            name="NotFound"
            component={NotFound}
            options={{
              title: t`Page Not Found | 404`,
              headerTitleStyle: { fontFamily: "DMSans", fontWeight: "600" },
            }}
          />

          <Stack.Screen
            name="DisplayLanguage"
            component={DisplayLanguageModal}
            options={({ navigation }) => ({
              ...baseModalOptions(navigation),
              headerTitle: t`Display Language`,
            })}
          />
        </Stack.Navigator>
      </NavigationProviders>
    </NavigationContainer>
  );
}

/**
 * Types
 */
export type RootStackParamList = {
  HomeTabs: undefined;
  Settings: undefined;
  GoalsForSession: undefined;
  Achievements: undefined;
  DisplayLanguage: undefined;
  Notifications: {
    hasGoBackButton?: boolean;
  };
  Account: undefined;
  Subscription: undefined;
  SubscriptionCancel: undefined;
  SubscriptionChangePlan: undefined;
  Haptics: undefined;
  DeveloperDebug: undefined;
  DarkMode: undefined;
  LearningLanguage: undefined;
  PopUps: undefined;
  ReportIssues: {
    quiz_id?: string;
    word_id?: string;
  };
  ExportData: undefined;
  AudioFeedback: undefined;
  SignOut: undefined;
  DeleteAccount: undefined;
  TakenPicture: {
    uri: string;
    width: number;
    height: number;
  };
  AnalyzedPicture: {
    pictureId: string;
  };
  Onboarding: undefined;
  NotFound: undefined;
};

export type NavigationObject = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type NavigationRouteParams<T extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, T>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
