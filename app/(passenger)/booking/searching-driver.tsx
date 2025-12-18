import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Loader } from '@/presentation/components/common/Loader';
import { useRideStore } from '@/presentation/stores/rideStore';

export default function SearchingDriverScreen() {
  const router = useRouter();
  const { activeRide } = useRideStore();

  useEffect(() => {
    // Simuler la recherche d'un chauffeur
    const timer = setTimeout(() => {
      if (activeRide) {
        router.replace('/(passenger)/booking/driver-found');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeRide]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Loader size="large" text="Recherche d'un chauffeur..." />
        <Text className="text-dark-600 text-center mt-6 text-base">
          Nous recherchons un chauffeur disponible près de vous
        </Text>
      </View>
    </SafeAreaView>
  );
}

