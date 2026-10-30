import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '@/theme';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  style?: ViewStyle;
}

export function Card({ variant = 'elevated', style, children, ...props }: CardProps) {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          ...shadows.sm,
        };
      case 'outlined':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          ...shadows.none,
        };
      case 'flat':
        return {
          backgroundColor: colors.surfaceSubtle,
          borderWidth: 0,
          ...shadows.none,
        };
    }
  };

  return (
    <View style={[styles.card, getVariantStyle(), style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.base,
  },
});
