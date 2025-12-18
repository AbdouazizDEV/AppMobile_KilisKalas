import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { useRideStore } from '@/presentation/stores/rideStore';
import { useAuthStore } from '@/presentation/stores/authStore';
import { MapPin, Clock, DollarSign, Car } from 'lucide-react-native';

export default function ConfirmRideScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuthStore();
  const { requestRide, isLoading } = useRideStore();
  const [selectedVehicle, setSelectedVehicle] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('cash');

  const destination = {
    latitude: parseFloat(params.destinationLat as string),
    longitude: parseFloat(params.destinationLng as string),
    address: params.destinationAddress as string,
  };

  const estimatedPrice = 5000;
  const estimatedDuration = 15;

  const handleConfirm = async () => {
    if (!user) return;

    try {
      await requestRide({
        passengerId: user.id,
        pickup: {
          latitude: 14.7167,
          longitude: -16.4667,
          address: 'Position actuelle',
        },
        destination,
        vehicleType: selectedVehicle,
        paymentMethod: selectedPayment,
      });
      router.push('/(passenger)/booking/searching-driver');
    } catch (error) {
      // Erreur gérée par le store
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-dark-900 mb-6">
            Confirmer la course
          </Text>

          {/* Destination Info */}
          <Card className="mb-6">
            <View className="flex-row items-start mb-4">
              <MapPin size={20} color="#22C55E" />
              <View className="ml-3 flex-1">
                <Text className="text-dark-700 font-medium mb-1">
                  {destination.address}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Clock size={16} color="#6B7280" />
                <Text className="ml-2 text-dark-600 text-sm">
                  {estimatedDuration} min
                </Text>
              </View>
              <View className="flex-row items-center">
                <DollarSign size={16} color="#22C55E" />
                <Text className="ml-2 text-secondary-600 font-semibold">
                  {estimatedPrice.toLocaleString()} FCFA
                </Text>
              </View>
            </View>
          </Card>

          {/* Vehicle Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-dark-900 mb-4">
              Type de véhicule
            </Text>
            <View className="flex-row flex-wrap">
              {['standard', 'premium', 'xl', 'motorcycle'].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedVehicle(type)}
                  className={`mr-2 mb-2 px-4 py-3 rounded-xl border-2 ${
                    selectedVehicle === type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-dark-200 bg-white'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Car size={20} color={selectedVehicle === type ? '#F97316' : '#6B7280'} />
                    <Text className={`ml-2 font-medium ${
                      selectedVehicle === type ? 'text-primary-600' : 'text-dark-600'
                    }`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment Method */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-dark-900 mb-4">
              Méthode de paiement
            </Text>
            {['cash', 'orange_money', 'wave'].map((method) => (
              <TouchableOpacity
                key={method}
                onPress={() => setSelectedPayment(method)}
                className="mb-2"
              >
                <Card className={selectedPayment === method ? 'border-2 border-primary-500' : ''}>
                  <Text className="text-dark-700 font-medium">
                    {method === 'cash' ? 'Espèces' : method === 'orange_money' ? 'Orange Money' : 'Wave'}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="Confirmer et commander"
            onPress={handleConfirm}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

