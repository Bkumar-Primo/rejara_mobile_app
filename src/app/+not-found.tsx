import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Screen, Text } from '@/components/ui';
import { colors, spacing } from '@/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <Screen style={styles.container}>
        <View style={styles.content}>
          <Text variant="h1" color={colors.primary} align="center">
            404
          </Text>
          <Text variant="h3" align="center" style={styles.title}>
            Screen Not Found
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.description}
          >
            The screen you are trying to access does not exist or has been moved.
          </Text>

          <Link href="/" asChild>
            <Button title="Return to Rejara Home" variant="primary" style={styles.button} />
          </Link>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: 400,
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 200,
  },
});
