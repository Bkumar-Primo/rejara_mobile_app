import { colors, radius, spacing, theme, typography } from '@/theme';

describe('Design System Theme Foundation', () => {
  it('should export all essential design tokens', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.spacing).toBeDefined();
    expect(theme.radius).toBeDefined();
    expect(theme.typography).toBeDefined();
    expect(theme.shadows).toBeDefined();
  });

  it('should have primary brand color set to Rejara blue (#3A6D8C)', () => {
    expect(colors.primary).toBe('#3A6D8C');
  });

  it('should have standard spacing values', () => {
    expect(spacing.none).toBe(0);
    expect(spacing.sm).toBe(8);
    expect(spacing.base).toBe(16);
    expect(spacing.xl).toBe(24);
  });

  it('should define typographic scale with accessible line heights', () => {
    expect(typography.h1.fontSize).toBe(32);
    expect(typography.h1.lineHeight).toBe(40);
    expect(typography.body.fontSize).toBe(16);
    expect(typography.body.lineHeight).toBe(24);
  });

  it('should have standard radius tokens matching web control and card tokens', () => {
    expect(radius.control).toBe(8);
    expect(radius.card).toBe(12);
    expect(radius.full).toBe(9999);
  });
});
