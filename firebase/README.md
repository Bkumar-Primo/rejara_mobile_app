# Firebase Native Configuration Placeholder

This directory is reserved for native Firebase configuration files required for iOS and Android builds.

## Expected Files

- **Android**: `firebase/google-services.json`
- **iOS**: `firebase/GoogleService-Info.plist`

## Security Warning

- Never commit production Firebase service account private keys or secrets here.
- `google-services.json` and `GoogleService-Info.plist` contain client IDs and API keys. While designed to be bundled in the native binary, keep production credentials restricted via Google Cloud Console (e.g. restrict API keys by iOS bundle ID `com.rejara.app` and Android package name + SHA-1).

## Dynamic Attachment

`app.config.ts` automatically detects if these files exist in `firebase/`:
- If present, Expo mounts `android.googleServicesFile` and `ios.googleServicesFile`.
- If not present yet, the build gracefully proceeds without native Firebase crashes during early foundation stages.

