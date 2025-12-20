import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { useRideStore } from '@/presentation/stores/rideStore';
import { MapPin, Phone } from 'lucide-react-native';

export default function RideInProgressScreen() {
  const router = useRouter();
  const { activeRide, cancelRide } = useRideStore();

  if (!activeRide || !activeRide.driver) {
    return null;
  }

  const handleCancel = async () => {
    await cancelRide(activeRide.id);
    router.replace('/(passenger)/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: activeRide.pickup.latitude,
            longitude: activeRide.pickup.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={activeRide.pickup}
            title="Départ"
            pinColor="#F97316"
          />
          <Marker
            coordinate={activeRide.destination}
            title="Destination"
            pinColor="#22C55E"
          />
        </MapView>

        <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
          <Card className="mb-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-lg font-bold text-dark-900 mb-1">
                  {activeRide.driver.name}
                </Text>
                <Text className="text-dark-600 text-sm">
                  {activeRide.driver.vehicle.brand} {activeRide.driver.vehicle.model}
                </Text>
              </View>
              <Button
                title="Appeler"
                variant="outline"
                size="sm"
                icon={<Phone size={16} color="#F97316" />}
                onPress={() => {
                  Linking.openURL(`tel:${activeRide?.driver?.phone}`);
                }}
              />
            </View>
            <View className="border-t border-dark-200 pt-4">
              <View className="flex-row items-center mb-2">
                <MapPin size={16} color="#22C55E" />
                <Text className="ml-2 text-dark-700 text-sm flex-1">
                  {activeRide.destination.address}
                </Text>
              </View>
            </View>
          </Card>
          <Button
            title="Annuler la course"
            onPress={handleCancel}
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

