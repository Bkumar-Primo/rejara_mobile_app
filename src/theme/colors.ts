export const palette = {
  // Brand & Caregiving Primaries (Calm Navy / Slate)
  primary50: '#F0F5FA',
  primary100: '#E1EBF5',
  primary200: '#C3D7EB',
  primary300: '#95BCE0',
  primary400: '#5F9CD0',
  primary500: '#3A7EBF',
  primary600: '#2B64A3',
  primary700: '#1E3A5F', // Primary Rejara Trust Blue
  primary800: '#1A3353',
  primary900: '#152A44',

  // Secondary & Accents (Warm Sage / Teal — Calm & Caring)
  accent50: '#F0FDFA',
  accent100: '#CCFBF1',
  accent500: '#14B8A6',
  accent600: '#0D9488',
  accent700: '#0F766E',

  // Neutrals / Grays
  neutral50: '#F8FAFC',
  neutral100: '#F1F5F9',
  neutral200: '#E2E8F0',
  neutral300: '#CBD5E1',
  neutral400: '#94A3B8',
  neutral500: '#64748B',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1E293B',
  neutral900: '#0F172A',

  // Semantics
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const colors = {
  primary: palette.primary700,
  primaryLight: palette.primary100,
  accent: palette.accent600,
  accentLight: palette.accent100,

  background: palette.neutral50,
  surface: palette.white,
  surfaceSubtle: palette.neutral100,

  textPrimary: palette.neutral900,
  textSecondary: palette.neutral600,
  textMuted: palette.neutral400,
  textInverse: palette.white,

  border: palette.neutral200,
  borderFocus: palette.primary500,

  success: palette.success,
  successBackground: palette.successLight,
  warning: palette.warning,
  warningBackground: palette.warningLight,
  error: palette.error,
  errorBackground: palette.errorLight,
  info: palette.info,
  infoBackground: palette.infoLight,
} as const;
