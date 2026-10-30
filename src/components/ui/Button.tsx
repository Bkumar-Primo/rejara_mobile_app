import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  onPress,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const sizeStyle: ViewStyle = {
    paddingVertical: size === 'sm' ? spacing.xs : size === 'lg' ? spacing.base : spacing.sm + 2,
    paddingHorizontal: size === 'sm' ? spacing.sm : size === 'lg' ? spacing.xl : spacing.base,
  };

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isDisabled ? colors.primaryLight : colors.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: isDisabled ? colors.accentLight : colors.accent,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDisabled ? colors.border : colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
    }
  };

  const getTextColor = (): string => {
    if (isDisabled && variant !== 'primary') return colors.textMuted;
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.textInverse;
      case 'outline':
      case 'ghost':
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      activeOpacity={0.75}
      disabled={isDisabled}
      onPress={onPress}
      style={[styles.base, sizeStyle, getContainerStyle(), style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text
          variant="button"
          color={getTextColor()}
          style={size === 'sm' ? styles.smallText : undefined}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44, // Accessible touch target minimum
  },
  smallText: {
    fontSize: 14,
    lineHeight: 18,
  },
});
