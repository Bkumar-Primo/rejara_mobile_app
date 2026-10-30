/**
 * Rejara Official Design System Palette
 * Synchronized from rejara-frontend (src/App.css & tailwind.config.js)
 */
export const palette = {
  // Brand blue scale (theme) — light → dark
  // 1 #D3E7F3 · 2 #7FAFC7 · 3 #3A6D8C · 4 #24475A · 5 #1B2B36
  blue100: '#D3E7F3',
  blue200: '#7FAFC7',
  blue300: '#3A6D8C', // Rejara Primary Blue
  blue400: '#24475A', // Rejara Primary Active
  blue500: '#1B2B36', // Rejara Primary Text / Deep Slate

  // Hover & Active States
  primaryHover: '#2F5A73',
  primaryActive: '#24475A',

  // Surfaces & Backgrounds
  background: '#F4F8FA', // Calm app canvas background
  backgroundLight: '#D3E7F3', // Header / Tint background
  surface: '#FFFFFF',
  surfaceMuted: '#EAF4FA',

  // Borders
  border: '#BFDCEA',
  borderStrong: '#7FAFC7',

  // Ink / Text
  textPrimary: '#1B2B36',
  textSecondary: '#4F6B7A',
  textMuted: '#8AA5B3',
  textPlaceholder: '#4F6B7A',
  textOnPrimary: '#FFFFFF',

  // Button tokens
  buttonDisabledBg: '#E4EEF3',
  buttonDisabledText: '#A9BFC9',

  // Semantic Status
  success: '#3B8F63',
  successBg: '#E3F3E8',
  warning: '#B5750E',
  warningBg: '#FDF1DE',
  danger: '#B0392C',
  dangerBg: '#FBE7E5',

  // Focus ring
  focusRing: 'rgba(58, 109, 140, 0.35)',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const colors = {
  primary: palette.blue300,
  primaryLight: palette.blue100,
  primaryHover: palette.primaryHover,
  primaryActive: palette.primaryActive,

  accent: palette.blue200,
  accentLight: palette.surfaceMuted,

  background: palette.background,
  surface: palette.surface,
  surfaceSubtle: palette.surfaceMuted,

  textPrimary: palette.textPrimary,
  textSecondary: palette.textSecondary,
  textMuted: palette.textMuted,
  textInverse: palette.textOnPrimary,

  border: palette.border,
  borderFocus: palette.borderStrong,

  success: palette.success,
  successBackground: palette.successBg,
  warning: palette.warning,
  warningBackground: palette.warningBg,
  error: palette.danger,
  errorBackground: palette.dangerBg,
} as const;
