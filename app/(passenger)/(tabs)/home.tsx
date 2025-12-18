import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from '@/presentation/components/common/Button';
import { Card } from '@/presentation/components/common/Card';
import { useRideStore } from '@/presentation/stores/rideStore';
import { useAuthStore } from '@/presentation/stores/authStore';
import { Search, MapPin, Car } from 'lucide-react-native';
import * as Location from 'expo-location';

const DEFAULT_REGION = {
  latitude: 14.7167, // Bambey, Sénégal
  longitude: -16.4667,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { activeRide } = useRideStore();
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission de localisation refusée');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.error('Erreur de localisation:', error);
    }
  };

  const handleSearchDestination = () => {
    router.push('/(passenger)/booking/select-destination');
  };

  const handleRequestRide = () => {
    if (destination) {
      router.push('/(passenger)/booking/confirm-ride');
    } else {
      handleSearchDestination();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          region={location}
          showsUserLocation
          showsMyLocationButton
        >
          {destination && (
            <Marker
              coordinate={destination}
              title="Destination"
              pinColor="#22C55E"
            />
          )}
        </MapView>

        {/* Header */}
        <View className="absolute top-0 left-0 right-0 px-4 pt-2">
          <Card className="mb-2">
            <View className="flex-row items-center">
              <View className="flex-1">
                <Text className="text-xs text-dark-500 mb-1">Où allez-vous ?</Text>
                <TouchableOpacity
                  onPress={handleSearchDestination}
                  className="flex-row items-center"
                >
                  <Search size={20} color="#6B7280" />
                  <Text className="ml-2 text-dark-700 text-base">
                    {destination ? 'Destination sélectionnée' : 'Rechercher une destination'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>

        {/* Bottom Sheet */}
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg">
          <View className="px-6 pt-4 pb-6">
            {activeRide ? (
              <View>
                <Text className="text-lg font-bold text-dark-900 mb-2">
                  Course en cours
                </Text>
                <Button
                  title="Voir les détails"
                  onPress={() => router.push(`/(passenger)/ride-details/${activeRide.id}`)}
                />
              </View>
            ) : (
              <View>
                <View className="flex-row justify-between mb-4">
                  <TouchableOpacity className="items-center flex-1">
                    <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-2">
                      <Car size={24} color="#F97316" />
                    </View>
                    <Text className="text-xs text-dark-600">Standard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="items-center flex-1">
                    <View className="w-12 h-12 bg-dark-100 rounded-full items-center justify-center mb-2">
                      <Car size={24} color="#6B7280" />
                    </View>
                    <Text className="text-xs text-dark-600">Premium</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="items-center flex-1">
                    <View className="w-12 h-12 bg-dark-100 rounded-full items-center justify-center mb-2">
                      <Car size={24} color="#6B7280" />
                    </View>
                    <Text className="text-xs text-dark-600">XL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="items-center flex-1">
                    <View className="w-12 h-12 bg-dark-100 rounded-full items-center justify-center mb-2">
                      <Car size={24} color="#6B7280" />
                    </View>
                    <Text className="text-xs text-dark-600">Moto</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  title={destination ? "Commander une course" : "Où allez-vous ?"}
                  onPress={handleRequestRide}
                  icon={<MapPin size={20} color="white" />}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

