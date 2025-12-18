import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { useRideStore } from '@/presentation/stores/rideStore';
import { Star, Phone } from 'lucide-react-native';

export default function DriverFoundScreen() {
  const router = useRouter();
  const { activeRide } = useRideStore();

  if (!activeRide || !activeRide.driver) {
    return null;
  }

  const { driver } = activeRide;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-dark-900 mb-6 text-center">
          Chauffeur trouvé !
        </Text>

        <Card className="items-center py-6 mb-6">
          {driver.photo ? (
            <Image
              source={{ uri: driver.photo }}
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-4">
              <Text className="text-3xl font-bold text-primary-600">
                {driver.name.charAt(0)}
              </Text>
            </View>
          )}
          <Text className="text-xl font-bold text-dark-900 mb-1">
            {driver.name}
          </Text>
          <View className="flex-row items-center mb-4">
            <Star size={16} color="#FBBF24" fill="#FBBF24" />
            <Text className="ml-1 text-dark-700 font-medium">
              {driver.rating.toFixed(1)}
            </Text>
            <Text className="ml-2 text-dark-500 text-sm">
              ({driver.totalRides} courses)
            </Text>
          </View>
          <View className="w-full border-t border-dark-200 pt-4">
            <Text className="text-dark-600 text-sm mb-2">
              {driver.vehicle.brand} {driver.vehicle.model} - {driver.vehicle.color}
            </Text>
            <Text className="text-dark-500 text-xs">
              {driver.vehicle.plateNumber}
            </Text>
          </View>
        </Card>

        <Button
          title="Suivre la course"
          onPress={() => router.replace('/(passenger)/booking/ride-in-progress')}
        />
      </View>
    </SafeAreaView>
  );
}

