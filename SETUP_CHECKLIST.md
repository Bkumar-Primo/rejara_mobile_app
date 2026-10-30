# Rejara Mobile — Setup & Readiness Checklist

This document tracks the technical state of the Rejara mobile foundation (SCRUM-2256).

---

## 1. Completed Setup Tasks

- [x] **Repository & Tooling Audit**: Initialized clean git repository, verified Node v24, **Bun v1.3.9** with `bun.lock`, Expo SDK 58, React Native 0.88.
- [x] **Strict TypeScript Setup**: Configured `tsconfig.json` with strict type checking, path alias `@/*` -> `./src/*`, Node & Jest types.
- [x] **Expo Dynamic Configuration**: Created `app.config.ts` with bundle identifier handling (`com.rejara.app` / `com.rejara.app.dev`), scheme (`rejara://`), CNG plugin configuration, and conditional native Firebase injection.
- [x] **Build Profiles (`eas.json`)**: Configured `development` (simulator/apk), `preview` (staging internal distribution), and `production` (aab/ipa) profiles.
- [x] **Expo Router & Declarative Navigation Architecture (`<Stack.Protected>`)**:
  - Implemented modern Expo Router `<Stack.Protected guard={condition}>` in `src/app/_layout.tsx`.
  - Guaranteed automatic route interception and navigation history purging upon auth state changes.
  - Root layout with `SafeAreaProvider`, `QueryProvider`, and `AuthProvider`.
  - Anchor hydration & redirect router in `src/app/index.tsx`.
  - Guest/Auth group: `src/app/(auth)/_layout.tsx` guarded by `<Stack.Protected guard={!isAuthenticated}>`.
  - Protected group: `src/app/(protected)/_layout.tsx` guarded by `<Stack.Protected guard={isAuthenticated}>`.
  - Fallback 404 handler: `src/app/+not-found.tsx`.
- [x] **Security & Storage Infrastructure**:
  - Secure hardware-backed storage abstraction with `Expo SecureStore` (`src/services/auth/tokenStorage.ts`).
  - Zero storage of auth tokens in plain AsyncStorage.
- [x] **Centralized API Layer**:
  - Centralized Axios client (`src/services/api/client.ts`) with timeout, authorization header injection, 401 callback routing, and cancellable request helper.
  - Standardized error normalizer (`src/services/api/errors.ts`) mapping Axios and network errors into typed `ApiError` structures.
- [x] **State Management**:
  - TanStack Query client configured with production caching and reconnect strategies (`src/providers/QueryProvider.tsx`).
  - Zustand auth store with session hydration, reactive login, and automatic logout routing (`src/stores/authStore.ts`).
- [x] **Design System Foundation**:
  - Color palette with calm caregiving tones (Rejara navy `#1E3A5F`, sage/teal accents `#0D9488`, soothing neutrals).
  - Typography scale with accessible font sizes and line heights (`src/theme/typography.ts`).
  - Spacing, radius, and elevation tokens (`src/theme/spacing.ts`, `src/theme/radius.ts`, `src/theme/shadows.ts`).
  - Accessible UI primitives: `Text`, `Button`, `Card`, `Screen`, `LoadingSpinner`.
- [x] **Code Quality & Verification**:
  - ESLint 9 configured via `eslint-config-expo`. Verified 0 errors and 0 warnings.
  - Prettier formatting configured and verified across all files.
  - 12 unit tests passing in Jest (`__tests__/`).
  - `bunx expo-doctor` passed with 20/20 checks clean.
  - Metro static bundle export (`bunx expo export`) verified across iOS, Android, and Web.

---

## 2. Pending Manual Configurations

The following configurations require external accounts or console access and cannot be automated without credentials:

| Task | Platform / Provider | Prerequisite / Action Required |
| :--- | :--- | :--- |
| **EAS Project Linking** | Expo Application Services | Run `npx eas-cli init` with authorized Expo account to populate `EAS_PROJECT_ID`. |
| **Apple Developer Account** | Apple | Provision App ID `com.rejara.app` with Associated Domains and Sign In with Apple (if needed). |
| **Google Cloud Console OAuth** | Google Cloud | Create Android OAuth client ID with signing SHA-1 fingerprint and iOS OAuth client ID with Bundle ID `com.rejara.app`. |
| **Firebase Project Registration** | Firebase Console | Register iOS & Android apps to generate `GoogleService-Info.plist` and `google-services.json`. |
| **Universal Links Verification** | Rejara Web Domain | Place `apple-app-site-association` (iOS) and `assetlinks.json` (Android) at `https://rejara.com/.well-known/`. |

---

## 3. Required External Account Access

1. **Expo Developer Account**: Access to the team organization on [expo.dev](https://expo.dev) for EAS builds and over-the-air updates.
2. **Apple Developer Program**: Team membership for iOS provisioning profiles, certificates, and TestFlight submissions.
3. **Google Play Console**: Developer account for Play Store internal testing and production release.
4. **Firebase Console / Google Cloud Platform**: Admin or Editor permissions for Rejara project to configure OAuth clients and Firebase services.

---

## 4. Required Credentials and Configuration Files

- `firebase/google-services.json` (Android Firebase configuration)
- `firebase/GoogleService-Info.plist` (iOS Firebase configuration)
- Android keystore credentials (or let EAS manage them automatically)
- Apple distribution certificates (or let EAS manage them automatically)

---

## 5. Known Blockers

- **Zero blockers for local development**: The application runs immediately in the iOS Simulator and Android Emulator or Expo Go.
- **Zero blockers for compilation**: TypeScript compilation, linting, unit tests, and Metro bundle export are passing with 100% success.
- **Pending external IDs for production OAuth**: Actual Google Sign-In and native Firebase features are gated by console registration.

---

## 6. Recommended Next Implementation Phase

Following review and sign-off on this technical foundation, the recommended sequence for Phase 2 is:

1. **Authentication UI & Integration**:
   - Implement production email/password login and registration screens.
   - Integrate backend `/auth/login` and `/auth/register` endpoints.
   - Wire native Google Sign-In using the OAuth client IDs.
2. **Ask Rejara Conversational Core**:
   - Build conversational streaming UI for Ask Rejara.
   - Implement message history, retry mechanism, and action pill navigation.
3. **Tasks & Caregiving Context**:
   - Implement tasks hook with TanStack Query.
   - Enable quick action deep linking from conversational suggestions.

