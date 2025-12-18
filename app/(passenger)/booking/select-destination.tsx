import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from '@/presentation/components/common/Button';
import { Card } from '@/presentation/components/common/Card';
import { Input } from '@/presentation/components/common/Input';
import { Search, MapPin } from 'lucide-react-native';

export default function SelectDestinationScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState<{ latitude: number; longitude: number; address: string } | null>(null);

  const handleConfirm = () => {
    if (destination) {
      router.push({
        pathname: '/(passenger)/booking/confirm-ride',
        params: {
          destinationLat: destination.latitude.toString(),
          destinationLng: destination.longitude.toString(),
          destinationAddress: destination.address,
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 14.7167,
            longitude: -16.4667,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={(e) => {
            setDestination({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              address: 'Destination sélectionnée',
            });
          }}
        >
          {destination && (
            <Marker
              coordinate={destination}
              title="Destination"
              pinColor="#22C55E"
            />
          )}
        </MapView>

        <View className="absolute top-0 left-0 right-0 px-4 pt-2">
          <Card>
            <Input
              placeholder="Rechercher une destination"
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Search size={20} color="#6B7280" />}
            />
          </Card>
        </View>

        {destination && (
          <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <Card className="mb-4">
              <View className="flex-row items-center mb-2">
                <MapPin size={20} color="#22C55E" />
                <Text className="ml-2 text-dark-700 font-medium flex-1">
                  {destination.address}
                </Text>
              </View>
            </Card>
            <Button
              title="Confirmer la destination"
              onPress={handleConfirm}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

