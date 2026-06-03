module.exports = {
  name: "Linkoglot",
  slug: "linkoglot",
  version: "1.0.0",
  orientation: "portrait",
  description: "Real Studying with AI",
  platforms: ["ios", "android"],
  icon: "./src/assets/icons/adaptive-icon.png",
  scheme: "com.linkoglot.app",
  userInterfaceStyle: "automatic",
  buildCacheProvider: "eas",
  ios: {
    supportsTablet: true,
    usesAppleSignIn: true,
    bundleIdentifier: "com.linkoglot.app",
    requireFullScreen: true,

    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [
            "com.googleusercontent.apps.666295664235-a5kd607tfjo6uii0q1d83r716lhoiu5c",
          ],
        },
      ],
    },
    //  associatedDomains: ["applinks:linkoglot.pl"],
    //  entitlements: {
    //    "com.apple.developer.associated-domains": ["applinks:linkoglot.pl"],
    //  },
  },
  android: {
    package: "com.linkoglot.app",
    adaptiveIcon: {
      backgroundColor: "#ffffff",
      foregroundImage: "./src/assets/icons/adaptive-icon.png",
    },
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            // host: "linkoglot.pl",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
    predictiveBackGestureEnabled: false,
    googleServicesFile: "./google-services.json",
  },
  plugins: [
    "expo-sharing",
    "@react-native-google-signin/google-signin",
    "expo-apple-authentication",
    "expo-localization",
    "expo-background-task",
    [
      "expo-speech-recognition",
      {
        microphonePermission: "Allow $(PRODUCT_NAME) to use the microphone.",
        speechRecognitionPermission:
          "Allow $(PRODUCT_NAME) to use speech recognition.",
        androidSpeechServicePackages: [
          "com.google.android.googlequicksearchbox",
        ],
      },
    ],
    "expo-asset",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        recordAudioAndroid: false,
        barcodeScannerEnabled: false,
      },
    ],
    [
      "expo-audio",
      {
        microphonePermission: false,
        recordAudioAndroid: false,
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./src/assets/icons/adaptive-icon.png",
        color: "#ffffff",
        defaultChannel: "default",
        //   sounds: ["./src/assets/sounds/notification.mp3"],
        enableBackgroundRemoteNotifications: false,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/icons/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#ffffff",
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./src/assets/fonts/DMSans-Regular-Italic.ttf",
          "./src/assets/fonts/DMSans-Regular.ttf",
          "./src/assets/fonts/DMSans-Medium.ttf",
          "./src/assets/fonts/DMSans-SemiBold.ttf",
          "./src/assets/fonts/DMSans-Bold.ttf",
          "./src/assets/fonts/DMSans-Black.ttf",
        ],
        android: {
          fonts: [
            {
              fontFamily: "DMSans",
              fontDefinitions: [
                {
                  path: "./src/assets/fonts/DMSans-Regular-Italic.ttf",
                  weight: 400,
                  style: "italic",
                },
                {
                  path: "./src/assets/fonts/DMSans-Regular.ttf",
                  weight: 400,
                },
                {
                  path: "./src/assets/fonts/DMSans-Medium.ttf",
                  weight: 500,
                },
                {
                  path: "./src/assets/fonts/DMSans-SemiBold.ttf",
                  weight: 600,
                },
                {
                  path: "./src/assets/fonts/DMSans-Bold.ttf",
                  weight: 700,
                },
                {
                  path: "./src/assets/fonts/DMSans-Black.ttf",
                  weight: 900,
                },
              ],
            },
          ],
        },
        ios: {
          fonts: [
            "./src/assets/fonts/DMSans-Regular-Italic.ttf",
            "./src/assets/fonts/DMSans-Regular.ttf",
            "./src/assets/fonts/DMSans-Medium.ttf",
            "./src/assets/fonts/DMSans-SemiBold.ttf",
            "./src/assets/fonts/DMSans-Bold.ttf",
            "./src/assets/fonts/DMSans-Black.ttf",
          ],
        },
      },
    ],
    "expo-web-browser",
    [
      "expo-notification-service-extension-plugin",
      {
        mode: "development",
        iosNSEFilePath: "./targets/NotificationService.m",
      },
    ],
    "expo-image",
    [
      "expo-screen-orientation",
      {
        initialOrientation: "DEFAULT",
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "16.4",
        },
        android: {
          enableMinifyInReleaseBuilds: false,
          extraProguardRules: [
            // KeepAwakeManager
            "-keep class expo.modules.core.** { *; }",
            "-keep interface expo.modules.core.** { *; }",
            "-keep class expo.modules.av.** { *; }",
            "-keep public interface expo.modules.core.interfaces.services.KeepAwakeManager",
            "-keep class expo.modules.keepawake.** { *; }",
            "-dontwarn expo.modules.core.interfaces.services.KeepAwakeManager",

            // Expo AV
            "-keep class expo.modules.av.** { *; }",

            // ===== Linkoglot
            "-keep class com.linkoglot.app.** { *; }",

            // ===== React Native Core =====
            "-keep class com.facebook.react.** { *; }",
            "-keep class com.facebook.hermes.** { *; }",
            "-keep class com.facebook.jni.** { *; }",

            // ===== Nitro Modules =====
            "-keep class com.margelo.nitro.** { *; }",

            // MMKV
            "-keep class com.mrousavy.mmkv.** { *; }",

            // ===== Shopify Skia =====
            "-keep class com.shopify.reactnative.skia.** { *; }",

            // ===== Google Sign-In =====
            "-keep class com.google.android.gms.auth.** { *; }",
            "-keep class com.google.android.gms.common.** { *; }",

            // ===== Add 'Signature' to attributes =====
            // This is often needed by libraries that use reflection (like Supabase or Zod)
            "-keepattributes Signature",

            // ===== Reanimated =====
            "-keep class com.swmansion.reanimated.** { *; }",
            "-keep class com.facebook.react.turbomodule.** { *; }",

            // ===== Gesture Handler =====
            "-keep class com.swmansion.gesturehandler.** { *; }",

            // ===== Async Storage =====
            "-keep class com.reactnativecommunity.asyncstorage.** { *; }",

            // ===== Keep crash reporting working =====
            "-keepattributes SourceFile,LineNumberTable",
            "-renamesourcefileattribute SourceFile",

            // ===== Keep annotations =====
            "-keepattributes *Annotation*",

            // ===== Suppress common warnings =====
            "-dontwarn com.facebook.react.**",
            "-dontwarn okhttp3.**",
            "-dontwarn okio.**",
          ].join("\n"),
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: false,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "a473818d-004d-44a4-b068-255a79a57290",
    },
  },
  owner: "linkoglot",
};
