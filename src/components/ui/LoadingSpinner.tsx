import { ActivityIndicator, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, spacing } from '@/theme';
import { Text } from './Text';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  label?: string;
  style?: ViewStyle;
}

export function LoadingSpinner({
  size = 'large',
  color = colors.primary,
  label,
  style,
}: LoadingSpinnerProps) {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={label || 'Loading'}
    >
      <ActivityIndicator size={size} color={color} />
      {label ? (
        <Text variant="bodySmall" color={colors.textSecondary} style={styles.label}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.base,
  },
  label: {
    marginTop: spacing.sm,
  },
});
