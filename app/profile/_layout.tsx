import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Profile' }} />
      <Stack.Screen name="dynamic/[id]" options={{ title: 'User Details' }} />
      <Stack.Screen name="dynamic/[...slug]" options={{ title: 'User Slug Details' }} />
    </Stack>
  );
}
