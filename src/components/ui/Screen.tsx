import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

export interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
  edges?: Edge[];
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark' | 'auto';
}

export function Screen({
  scrollable = false,
  edges = ['top', 'left', 'right'],
  style,
  contentContainerStyle,
  backgroundColor = colors.background,
  statusBarStyle = 'dark',
  children,
}: ScreenProps) {
  const containerStyle = [styles.container, { backgroundColor }, style];

  return (
    <SafeAreaView edges={edges} style={containerStyle}>
      <StatusBar style={statusBarStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.innerContent, contentContainerStyle]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.base,
  },
  innerContent: {
    flex: 1,
    padding: spacing.base,
  },
});
