import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="select-destination" />
      <Stack.Screen name="confirm-ride" />
      <Stack.Screen name="searching-driver" />
      <Stack.Screen name="driver-found" />
      <Stack.Screen name="ride-in-progress" />
      <Stack.Screen name="ride-completed" />
    </Stack>
  );
}

