import { colors, palette } from './colors';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { fontSize, fontWeight, lineHeight, typography } from './typography';

export const theme = {
  colors,
  palette,
  typography,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  radius,
  shadows,
} as const;

export type Theme = typeof theme;

export { colors, fontSize, fontWeight, lineHeight, palette, radius, shadows, spacing, typography };
