# Rejara Mobile Application

> Production-grade React Native & Expo mobile foundation for **Ask Rejara** — the conversational caregiving companion.

---

## 1. Project Overview

**Rejara** is an AI-assisted caregiving platform designed to simplify, coordinate, and guide families through caregiving responsibilities.

The mobile application centers around **Ask Rejara** as its primary conversational entry point, providing seamless access to care planning, tasks, contextual guidance, and existing backend capabilities while maintaining a distraction-free, reassuring experience.

### Architectural Principles
- **Mobile-First & Cloud-Native**: Built with Expo SDK 58 and React Native 0.88 leveraging Continuous Native Generation (CNG).
- **Security-First**: Zero sensitive credentials in AsyncStorage; hardware-backed encryption via `Expo SecureStore`; environment-variable schema validation with `Zod`.
- **Declarative Route Protection (`<Stack.Protected>`)**: Implements Expo Router's native declarative route guarding. When authentication state changes, protected screens are automatically blocked, navigated away from, and purged from navigation history without flashing or imperative race conditions.
- **Strict Separation of Concerns**: Routes (`src/app/`) contain layout and presentation guards; business logic, server state (`TanStack Query`), and API clients (`Axios`) live in modular feature and service directories.
- **Calm, Accessible Design System**: Curated color palette and typography tokens tailored for reassuring family caregiving.

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Package Manager** | Bun | `1.3.x` | Ultra-fast dependency resolution & script execution |
| **Framework** | Expo SDK | `~58.0.21` | Modern managed runtime with CNG |
| **Mobile Core** | React Native | `0.88.1` | Native mobile foundation |
| **Language** | TypeScript | `~6.0.3` | Strict type checking & path aliases |
| **Navigation** | Expo Router | `~58.0.28` | File-based typed routing with declarative `<Stack.Protected>` |
| **Server State** | TanStack Query | `^5.105.0` | Caching, deduplication, background sync |
| **Client State** | Zustand | `^5.0.16` | Lightweight client authentication store |
| **HTTP Client** | Axios | `^1.21.0` | Centralized instance with token interceptors |
| **Validation** | Zod | `^4.6.7` | Runtime environment & contract validation |
| **Secure Storage** | Expo SecureStore | `~58.0.2` | Encrypted keychain / keystore token storage |
| **Code Quality** | ESLint & Prettier | `9.x` / `3.x` | Static analysis & code formatting |
| **Unit Testing** | Jest & Testing Library | `30.x` / `14.x` | Automated unit & contract testing |

---

## 3. Architecture & Directory Structure

```
rejara_mobile_app/
├── .env.example                # Template for public mobile environment variables
├── .env                        # Local development environment (git-ignored)
├── app.config.ts               # Dynamic Expo configuration (bundle IDs, schemes, plugins)
├── bun.lock                    # Bun lockfile
├── eas.json                    # EAS build profiles (development, preview, production)
├── firebase/
│   └── README.md               # Placement instructions for native Firebase config
├── __tests__/                  # Unit tests (token storage, theme, error normalization)
└── src/
    ├── app/                    # Expo Router file-based screens & layouts
    │   ├── _layout.tsx         # Root layout with <Stack.Protected>, QueryClient, and Auth
    │   ├── index.tsx           # Anchor entry hydration & conditional redirection screen
    │   ├── +not-found.tsx      # Deep link & 404 fallback screen
    │   ├── (auth)/             # Guest/Auth route group
    │   │   ├── _layout.tsx     # Auth stack navigator
    │   │   └── login.tsx       # Auth & verification placeholder
    │   └── (protected)/        # Authenticated application group
    │       ├── _layout.tsx     # Protected stack navigator
    │       └── index.tsx       # Ask Rejara conversational foundation
    ├── components/
    │   ├── ui/                 # Accessible design primitives (Text, Button, Card, Screen, LoadingSpinner)
    │   └── common/             # Shared composite components
    ├── features/               # Domain-specific feature modules
    │   ├── ask-rejara/         # Ask Rejara contracts, payloads & conversation models
    │   ├── auth/               # Auth payload types & login/register contracts
    │   └── tasks/              # Caregiving task & reminder contracts
    ├── services/
    │   ├── api/                # Centralized Axios client, interceptors & error handlers
    │   └── auth/               # Token storage service & credentials management
    ├── stores/                 # Zustand client stores (authStore)
    ├── providers/              # Root React context providers (AuthProvider, QueryProvider)
    ├── config/                 # Environment validation via Zod
    ├── constants/              # Storage keys, app identifiers, query keys
    ├── theme/                  # Design tokens: palette, typography, spacing, radius, shadows
    ├── types/                  # Shared TypeScript interfaces & types
    ├── utils/                  # Platform helpers, formatters & utilities
    └── validation/             # Reusable Zod validation schemas
```

---

## 4. Prerequisites

- **Package Manager**: **Bun** `v1.2+` (verified with Bun `v1.3.9`)
- **Node.js**: `v20.0.0` or higher (verified with Node `v24.8.0`)
- **Mobile Development (Optional for cloud EAS builds)**:
  - **iOS**: macOS with Xcode 16+ and CocoaPods for local iOS simulator builds.
  - **Android**: Android Studio with Android SDK 35 and JDK 17 for local Android emulator builds.
- **EAS CLI**: `bunx eas-cli@latest` for running cloud builds.

---

## 5. Installation & Setup

1. **Clone the repository and enter the directory**:
   ```bash
   cd rejara_mobile_app
   ```

2. **Install project dependencies using Bun**:
   ```bash
   bun install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Verify Environment Setup**:
   ```bash
   bun run typecheck
   bun run test
   bun run lint
   ```

---

## 6. Development Commands

| Command | Action |
| :--- | :--- |
| `bun start` | Starts the Expo development server / Metro bundler |
| `bun run ios` | Starts the app in the iOS Simulator |
| `bun run android` | Starts the app in the Android Emulator |
| `bun run web` | Starts the app in the local Web browser |
| `bun run typecheck` | Validates TypeScript types across the codebase (`tsc --noEmit`) |
| `bun run lint` | Runs Expo ESLint checks |
| `bun run lint:fix` | Automatically fixes auto-fixable ESLint issues |
| `bun run format` | Formats code with Prettier |
| `bun run format:check` | Verifies code conforms to Prettier formatting |
| `bun run test` | Runs Jest unit tests |
| `bunx expo-doctor` | Validates dependency compatibility and Expo configuration health |
| `bunx expo install <pkg>` | Installs SDK-compatible packages with Bun |

---

## 7. Environment Configuration

All client-facing environment variables must be prefixed with `EXPO_PUBLIC_` so Metro can expose them safely at compile time.

```bash
# Backend API Base URL
EXPO_PUBLIC_API_URL=https://api.rejara.com/v1

# Environment Name: development | staging | production
EXPO_PUBLIC_APP_ENV=development

# Google OAuth Public Client IDs
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=

# Firebase Client Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

> **Security Rule**: Never store API secrets, database passwords, or service-account keys in mobile client environment files.

---

## 8. Expo & EAS Setup

This repository uses **EAS Build** with Continuous Native Generation (CNG). The native `ios/` and `android/` folders are generated on the fly during the build process, preventing native drift.

### Build Profiles (`eas.json`)
- **`development`**: Generates internal debug build with the Expo Development Client enabled (iOS Simulator & Android APK).
- **`preview`**: Generates standalone internal distribution build (staging environment, Android APK & iOS Ad-Hoc).
- **`production`**: Production app bundle (`.aab` for Google Play and `.ipa` for Apple App Store).

### Linking to EAS
1. Log in to your Expo account:
   ```bash
   npx eas-cli@latest login
   ```
2. Initialize or link the EAS project:
   ```bash
   npx eas-cli@latest init --id <project-id>
   ```

---

## 9. Firebase Setup Instructions

When ready to link Firebase to the native mobile app:

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select or create the **Rejara** project.
3. Register the **iOS Application**:
   - iOS Bundle ID: `com.rejara.app` (or `com.rejara.app.dev` for dev builds).
   - Download `GoogleService-Info.plist` and place it in the `firebase/` directory:
     ```
     firebase/GoogleService-Info.plist
     ```
4. Register the **Android Application**:
   - Android Package Name: `com.rejara.app` (or `com.rejara.app.dev` for dev builds).
   - Add your debug and production SHA-1 fingerprint.
   - Download `google-services.json` and place it in the `firebase/` directory:
     ```
     firebase/google-services.json
     ```
5. `app.config.ts` will automatically detect these files in `firebase/` and inject the native config plugins without breaking builds when absent.

---

## 10. Google OAuth Setup for iOS and Android

### iOS
1. In the Google Cloud Console / Firebase Console, generate an **iOS OAuth Client ID**:
   - Set the Bundle ID to `com.rejara.app` (or `com.rejara.app.dev`).
2. Add the iOS Client ID to `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` in `.env`.
3. iOS URL schemes for callback will be handled by reverse client ID or `rejara://`.

### Android
1. In the Google Cloud Console, generate an **Android OAuth Client ID**:
   - Package Name: `com.rejara.app` (or `com.rejara.app.dev`).
   - Obtain the SHA-1 signing certificate fingerprint:
     - For EAS development builds, run: `npx eas-cli@latest credentials`
     - For local debug keystore: `keytool -list -v -keystore ~/.android/debug.keystore`
2. Add the Android Client ID to `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` in `.env`.

---

## 11. Deep Linking Foundation

The app supports custom URL schemes and universal linking:
- **Custom Scheme**: `rejara://`
- **Auth Callback**: `rejara://auth/callback`
- **Ask Rejara Direct Link**: `rejara://ask-rejara`
- **Universal Links**: Associated domain configured for `rejara.com` (iOS Universal Links & Android App Links via intent filters).

---

## 12. Android & iOS Build Instructions

### Running Local Development Builds
```bash
# Start local Metro bundler
npm start

# Run on iOS Simulator (macOS with Xcode)
npm run ios

# Run on Android Emulator (Android Studio installed)
npm run android
```

### Running Cloud EAS Builds
```bash
# Build Android APK for testing
npx eas-cli@latest build --platform android --profile development

# Build iOS Simulator build for testing
npx eas-cli@latest build --platform ios --profile development

# Production Build
npx eas-cli@latest build --platform all --profile production
```

