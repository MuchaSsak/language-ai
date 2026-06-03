# Setup Firebase Notifications Step-by-Step

Follow these steps to configure Firebase push notifications for your Expo/React Native project.

---

## 1. Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project for your app.
3. Navigate to **Project Settings → Service Accounts**.
4. Generate a **private key** (JSON file).

> If you want to add the private key to your project folder, make sure it is **gitignored**. It is **not recommended** to commit it.

---

## 2. Configure EAS Credentials

Follow the instructions in the [Expo documentation for FCM credentials](https://docs.expo.dev/push-notifications/fcm-credentials/).

---

## 3. Update Project-Level `build.gradle`

In `android/build.gradle`, add the Google Services plugin at the top-level `plugins` block:

```gradle
plugins {
    // Add the dependency for the Google services Gradle plugin
    id("com.google.gms.google-services") version "4.4.4" apply false
}
```

> This ensures the plugin is available but not applied globally.

---

## 4. Update App-Level `build.gradle`

In `android/app/build.gradle`, add Firebase dependencies:

```gradle
dependencies {
    implementation(platform("com.google.firebase:firebase-bom:34.8.0"))
}
```

Then, in the top-level `plugins` block of the same file, make sure to apply the plugins:

```gradle
plugins {
    id("com.android.application")

    // Add the Google services Gradle plugin
    id("com.google.gms.google-services")

    // ... other plugins
}
```

---

## 5. Add Firebase Configuration File

1. Download `google-services.json` from Firebase console.
2. Place it in the **root of your project** (it does **not** need to be gitignored).
