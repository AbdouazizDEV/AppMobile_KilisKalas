import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { useRideStore } from '@/presentation/stores/rideStore';
import { Star, DollarSign, Clock } from 'lucide-react-native';

export default function RideCompletedScreen() {
  const router = useRouter();
  const { activeRide, rateRide } = useRideStore();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeRide) {
    return null;
  }

  const handleSubmitRating = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      await rateRide(activeRide.id, rating);
      router.replace('/(passenger)/(tabs)/home');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-dark-900 mb-6 text-center">
            Course terminée !
          </Text>

          <Card className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <DollarSign size={24} color="#22C55E" />
                <Text className="ml-2 text-2xl font-bold text-secondary-600">
                  {activeRide.finalPrice?.toLocaleString() || activeRide.estimatedPrice.toLocaleString()} FCFA
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#6B7280" />
              <Text className="ml-2 text-dark-600 text-sm">
                Durée: {activeRide.actualDuration || activeRide.estimatedDuration} min
              </Text>
            </View>
          </Card>

          <Card className="mb-6">
            <Text className="text-lg font-semibold text-dark-900 mb-4">
              Évaluez votre course
            </Text>
            <View className="flex-row justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  title=""
                  variant="ghost"
                  onPress={() => setRating(star)}
                  icon={
                    <Star
                      size={32}
                      color={star <= rating ? '#FBBF24' : '#D1D5DB'}
                      fill={star <= rating ? '#FBBF24' : 'transparent'}
                    />
                  }
                />
              ))}
            </View>
            <Button
              title="Soumettre l'évaluation"
              onPress={handleSubmitRating}
              loading={isSubmitting}
              disabled={rating === 0}
            />
          </Card>

          <Button
            title="Retour à l'accueil"
            onPress={() => router.replace('/(passenger)/(tabs)/home')}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

