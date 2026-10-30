export const STORAGE_KEYS = {
  AUTH_ACCESS_TOKEN: 'rejara.auth.access_token',
  AUTH_REFRESH_TOKEN: 'rejara.auth.refresh_token',
  AUTH_USER: 'rejara.auth.user',
  THEME_MODE: 'rejara.ui.theme_mode',
} as const;

export const APP_CONFIG = {
  APP_NAME: 'Rejara',
  SLUG: 'rejara_mobile_app',
  SCHEME: 'rejara',
  API_TIMEOUT_MS: 15000,
  MAX_RETRIES: 2,
} as const;

export const QUERY_KEYS = {
  AUTH_SESSION: ['auth', 'session'],
  USER_PROFILE: ['user', 'profile'],
  ASK_REJARA_CONVERSATION: ['ask-rejara', 'conversation'],
  TASKS: ['tasks', 'list'],
} as const;

export const DEEP_LINKS = {
  SCHEME: 'rejara',
  AUTH_CALLBACK: 'rejara://auth/callback',
  ASK_REJARA: 'rejara://ask-rejara',
  TASKS: 'rejara://tasks',
} as const;
