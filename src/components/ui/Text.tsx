import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { colors, typography } from '@/theme';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
}

export function Text({
  variant = 'body',
  color = colors.textPrimary,
  align = 'left',
  style,
  children,
  ...props
}: TextProps) {
  const variantStyle = typography[variant];

  return (
    <RNText style={[variantStyle, { color, textAlign: align }, style]} {...props}>
      {children}
    </RNText>
  );
}
