import { z } from 'zod';

const envSchema = z.object({
  apiUrl: z.string().url().default('https://api.rejara.com/v1'),
  appEnv: z.enum(['development', 'staging', 'production']).default('development'),
  googleWebClientId: z.string().optional(),
  googleIosClientId: z.string().optional(),
  googleAndroidClientId: z.string().optional(),
  firebaseApiKey: z.string().optional(),
  firebaseAuthDomain: z.string().optional(),
  firebaseProjectId: z.string().optional(),
  firebaseStorageBucket: z.string().optional(),
  firebaseMessagingSenderId: z.string().optional(),
  firebaseAppId: z.string().optional(),
});

const rawEnv = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  appEnv: process.env.EXPO_PUBLIC_APP_ENV,
  googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const parsedEnv = envSchema.safeParse(rawEnv);

if (!parsedEnv.success) {
  // Warn with validation issues without crashing in non-production,
  // but provide clear diagnostic logging.
  console.warn(
    'Environment configuration warnings:',
    JSON.stringify(parsedEnv.error.format(), null, 2)
  );
}

export const env = parsedEnv.success
  ? parsedEnv.data
  : envSchema.parse({
      apiUrl: 'https://api.rejara.com/v1',
      appEnv: 'development',
    });

export type Env = z.infer<typeof envSchema>;
