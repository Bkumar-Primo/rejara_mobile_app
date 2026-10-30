import { z } from 'zod';

const envSchema = z.object({
  apiUrl: z.string().url().default('https://api.rejara.com'),
  authUrl: z.string().url().default('https://api.rejara.com'),
  guidanceUrl: z.string().url().default('https://guidance.rejara.com'),
  tasksUrl: z.string().url().default('https://api.rejara.com'),
  aiUrl: z.string().url().default('https://ai.rejara.com'),
  stochasticUrl: z.string().url().default('https://stochastic.rejara.com'),
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

const defaultBase = process.env.EXPO_PUBLIC_API_URL || 'https://api.rejara.com';

const rawEnv = {
  apiUrl: defaultBase,
  authUrl: process.env.EXPO_PUBLIC_AUTH_URL || defaultBase,
  guidanceUrl: process.env.EXPO_PUBLIC_GUIDANCE_URL || defaultBase,
  tasksUrl: process.env.EXPO_PUBLIC_INVITE_URL || defaultBase,
  aiUrl: process.env.EXPO_PUBLIC_AI_URL || defaultBase,
  stochasticUrl: process.env.EXPO_PUBLIC_STOCHASTIC_URL || defaultBase,
  appEnv: process.env.EXPO_PUBLIC_APP_ENV || 'development',
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
  console.warn(
    'Environment configuration warnings:',
    JSON.stringify(parsedEnv.error.format(), null, 2)
  );
}

export const env = parsedEnv.success
  ? parsedEnv.data
  : envSchema.parse({
      apiUrl: 'https://api.rejara.com',
      authUrl: 'https://api.rejara.com',
      guidanceUrl: 'https://api.rejara.com',
      tasksUrl: 'https://api.rejara.com',
      aiUrl: 'https://api.rejara.com',
      stochasticUrl: 'https://api.rejara.com',
      appEnv: 'development',
    });

export type Env = z.infer<typeof envSchema>;
