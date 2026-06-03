# Setup Google OAuth Step-by-Step

Follow these steps to configure Google OAuth for your Expo/React Native Android app.

---

## 1. Clean and Prepare the Project

```bash
# Remove old build artifacts
rm -rf node_modules android .expo

# Clear Yarn cache and install dependencies
yarn cache clean
yarn

# Prebuild Expo project cleanly
npx expo prebuild --clean
```

---

## 2. Configure Google Cloud

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **new project** and name it according to your `app.config.js` (e.g., `com.anonymous.enrollo`).

   > Must match the `package` in `./android/app/src/main/AndroidManifest.xml`.

3. (Optional) Add branding info like logo, Terms of Service, and links.

---

## 3. Create Android OAuth Client

1. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**.
2. Choose **Android** as the platform.
3. Make sure **Keytool** is installed and added to your `PATH`:

```cmd
set PATH=%PATH%;C:\Program Files (x86)\KeyStore Explorer\jre\bin
```

4. Generate SHA-1 fingerprint:

```bash
keytool -keystore ./android/app/debug.keystore -list -v
```

5. Copy the SHA-1 fingerprint and paste it in Google Cloud Console.
6. Copy the generated **Android Client ID**.

---

## 4. Add Client ID to Strings

Edit `./android/app/src/main/res/values/strings.xml` and add:

```xml
<string name="server_client_id">
  <YOUR_GOOGLE_CLOUD_CONSOLE_CLIENT_ID>.apps.googleusercontent.com
</string>
```

> Replace the ID above with your generated Android Client ID.

---

## 5. Ensure Repositories in `build.gradle`

In `./android/build.gradle` (Project level), confirm you have:

```gradle
google()
mavenCentral()
```

---

## 6. Add Dependencies in App-Level `build.gradle`

```gradle
implementation("androidx.credentials:credentials:1.6.0-rc01")
implementation("androidx.credentials:credentials-play-services-auth:1.6.0-rc01")
implementation("com.google.android.libraries.identity.googleid:<LATEST VERSION>")
```

> Replace `<LATEST VERSION>` with the latest version from [Google Maven](https://maven.google.com/web/index.html?q=com.google.android.libraries.identity.googleid#com.google.android.libraries.identity.googleid).

---

## 7. Setup Google Sign-In in Your App

1. Code your Google Sign-In button and style it.
2. Configure scopes
3. Create a **web client ID** in Google Cloud and copy it.
4. Paste it into the GoogleSignIn button configuration.
5. Add it to Supabase client ID (Google Auth provider) and provide the web client secret.

---

## 8. Android Emulator / Local Setup

1. If running the app in **Android Studio emulator**, create a `local.properties` file in `android/`:

```properties
sdk.dir=C:\\Users\\Mucha\\AppData\\Local\\Android\\sdk
```

> Points to your local Android SDK.
