import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/presentation/components/common/Card';
import { Loader } from '@/presentation/components/common/Loader';
import { useRideStore } from '@/presentation/stores/rideStore';
import { useAuthStore } from '@/presentation/stores/authStore';
import { format } from 'date-fns';
import { MapPin, Clock, DollarSign } from 'lucide-react-native';

export default function ActivityScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { rideHistory, isLoading, getRideHistory } = useRideStore();

  useEffect(() => {
    if (user) {
      getRideHistory(user.id);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-secondary-600 bg-secondary-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'in_progress':
        return 'text-primary-600 bg-primary-50';
      default:
        return 'text-dark-600 bg-dark-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      case 'in_progress':
        return 'En cours';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Loader text="Chargement de l'historique..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-dark-900 mb-4">
          Mes courses
        </Text>
      </View>

      <FlatList
        data={rideHistory}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 pb-4"
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Text className="text-dark-500 text-base">
              Aucune course pour le moment
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(passenger)/ride-details/${item.id}`)}
          >
            <Card className="mb-4">
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <MapPin size={16} color="#6B7280" />
                    <Text className="ml-2 text-dark-700 text-sm flex-1">
                      {item.pickup.address || 'Point de départ'}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MapPin size={16} color="#22C55E" />
                    <Text className="ml-2 text-dark-700 text-sm flex-1">
                      {item.destination.address || 'Destination'}
                    </Text>
                  </View>
                </View>
                <View className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  <Text className="text-xs font-medium">
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Clock size={14} color="#6B7280" />
                  <Text className="ml-1 text-dark-600 text-xs">
                    {format(new Date(item.createdAt), 'dd MMM yyyy, HH:mm')}
                  </Text>
                </View>
                {item.finalPrice && (
                  <View className="flex-row items-center">
                    <DollarSign size={14} color="#22C55E" />
                    <Text className="ml-1 text-secondary-600 font-semibold">
                      {item.finalPrice.toLocaleString()} FCFA
                    </Text>
                  </View>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

