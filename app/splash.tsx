import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function SplashScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Kalam: require('@expo-google-fonts/kalam/700Bold/Kalam_700Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.replace('/onboarding');
      }, 2000); // 2 secondes

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>KilisKalas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B981', // Teal-green background comme dans la maquette
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700', // font-weight: 700
    fontStyle: 'normal', // font-style: Bold (géré par fontWeight en React Native)
    fontSize: 48.75, // font-size: 48.75px
    lineHeight: 48.75, // line-height: 100% (48.75 = 100% de fontSize)
    letterSpacing: 0, // letter-spacing: 0%
    color: '#000000',
    textAlign: 'center',
  },
});

