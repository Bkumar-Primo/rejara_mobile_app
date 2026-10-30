import type { ConfigContext, ExpoConfig } from 'expo/config';
import fs from 'fs';
import path from 'path';

export default ({ config }: ConfigContext): ExpoConfig => {
  const isDev = process.env.EXPO_PUBLIC_APP_ENV === 'development';
  const bundleId = isDev ? 'com.rejara.app.dev' : 'com.rejara.app';
  const appName = isDev ? 'Rejara (Dev)' : 'Rejara';

  // Check for native Firebase configuration files
  const googleServicesJsonPath = path.resolve(__dirname, 'firebase/google-services.json');
  const googleServiceInfoPlist = path.resolve(__dirname, 'firebase/GoogleService-Info.plist');

  const hasAndroidGoogleServices = fs.existsSync(googleServicesJsonPath);
  const hasIosGoogleServices = fs.existsSync(googleServiceInfoPlist);

  return {
    ...config,
    name: appName,
    slug: 'rejara-mobile-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    scheme: 'rejara',
    ios: {
      supportsTablet: false,
      bundleIdentifier: bundleId,
      ...(hasIosGoogleServices
        ? { googleServicesFile: './firebase/GoogleService-Info.plist' }
        : {}),
      infoPlist: {
        CFBundleAllowMixedLocalizations: true,
        UIBackgroundModes: ['fetch'],
      },
      associatedDomains: ['applinks:rejara.com', 'applinks:*.rejara.com'],
    },
    android: {
      package: bundleId,
      ...(hasAndroidGoogleServices
        ? { googleServicesFile: './firebase/google-services.json' }
        : {}),
      adaptiveIcon: {
        backgroundColor: '#1E3A5F',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
      permissions: ['INTERNET', 'ACCESS_NETWORK_STATE'],
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: 'rejara.com',
              pathPrefix: '/open',
            },
            {
              scheme: 'rejara',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-router',
      [
        'expo-secure-store',
        {
          faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID for biometric authentication.',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            minSdkVersion: 24,
            compileSdkVersion: 35,
            targetSdkVersion: 35,
          },
          ios: {
            deploymentTarget: '16.4',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || 'PENDING_EAS_LINKING',
      },
    },
  };
};
