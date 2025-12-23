import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="select-destination" />
      <Stack.Screen name="confirm-ride" />
      <Stack.Screen name="payment-method" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}

