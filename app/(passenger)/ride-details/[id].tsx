import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card } from '@/presentation/components/common/Card';
import { Loader } from '@/presentation/components/common/Loader';
import { RideRepository } from '@/data/repositories/RideRepository';
import { Ride } from '@/core/entities';
import { format } from 'date-fns';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react-native';

const rideRepository = new RideRepository();

export default function RideDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [ride, setRide] = useState<Ride | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRide();
  }, [params.id]);

  const loadRide = async () => {
    try {
      const rideData = await rideRepository.getRideById(params.id as string);
      setRide(rideData);
    } catch (error) {
      console.error('Erreur lors du chargement de la course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Loader text="Chargement..." />
      </SafeAreaView>
    );
  }

  if (!ride) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-dark-600 text-center">
            Course non trouvée
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-dark-900 mb-6">
            Détails de la course
          </Text>

          <Card className="mb-6">
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <MapPin size={16} color="#F97316" />
                <Text className="ml-2 text-dark-700 text-sm flex-1">
                  {ride.pickup.address || 'Point de départ'}
                </Text>
              </View>
              <View className="flex-row items-center">
                <MapPin size={16} color="#22C55E" />
                <Text className="ml-2 text-dark-700 text-sm flex-1">
                  {ride.destination.address || 'Destination'}
                </Text>
              </View>
            </View>
            <View className="border-t border-dark-200 pt-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Clock size={16} color="#6B7280" />
                  <Text className="ml-2 text-dark-600 text-sm">
                    {format(new Date(ride.createdAt), 'dd MMM yyyy, HH:mm')}
                  </Text>
                </View>
              </View>
              {ride.finalPrice && (
                <View className="flex-row items-center">
                  <DollarSign size={16} color="#22C55E" />
                  <Text className="ml-2 text-secondary-600 font-semibold">
                    {ride.finalPrice.toLocaleString()} FCFA
                  </Text>
                </View>
              )}
            </View>
          </Card>

          {ride.driver && (
            <Card className="mb-6">
              <Text className="text-lg font-semibold text-dark-900 mb-4">
                Chauffeur
              </Text>
              <Text className="text-dark-700 font-medium mb-1">
                {ride.driver.name}
              </Text>
              <View className="flex-row items-center">
                <Star size={16} color="#FBBF24" fill="#FBBF24" />
                <Text className="ml-1 text-dark-600 text-sm">
                  {ride.driver.rating.toFixed(1)} ({ride.driver.totalRides} courses)
                </Text>
              </View>
            </Card>
          )}

          {ride.rating && (
            <Card>
              <Text className="text-lg font-semibold text-dark-900 mb-2">
                Votre évaluation
              </Text>
              <View className="flex-row items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    color={star <= ride.rating! ? '#FBBF24' : '#D1D5DB'}
                    fill={star <= ride.rating! ? '#FBBF24' : 'transparent'}
                  />
                ))}
              </View>
              {ride.review && (
                <Text className="text-dark-600 text-sm">
                  {ride.review}
                </Text>
              )}
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

