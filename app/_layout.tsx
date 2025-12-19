import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
import { useAuthStore } from '@/presentation/stores/authStore';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { checkAuth } = useAuthStore();
  const [fontsLoaded] = useFonts({
    Kalam: require('@expo-google-fonts/kalam/700Bold/Kalam_700Bold.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
    'Outfit-SemiBold': require('@expo-google-fonts/outfit/600SemiBold/Outfit_600SemiBold.ttf'),
    'Poppins-Medium': require('@expo-google-fonts/poppins/500Medium/Poppins_500Medium.ttf'),
    'Poppins-Bold': require('@expo-google-fonts/poppins/700Bold/Poppins_700Bold.ttf'),
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(passenger)" />
        <Stack.Screen name="(driver)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}

