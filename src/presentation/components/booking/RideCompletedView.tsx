import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Driver } from '@/core/entities/Driver';
import { Star } from 'lucide-react-native';

const DESIGN_WIDTH = 375;

interface RideCompletedViewProps {
  driver: Driver;
  rating: number;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  onViewDetails: () => void;
}

export const RideCompletedView: React.FC<RideCompletedViewProps> = ({
  driver,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  onSubmit,
  onViewDetails,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const rideReference = `gowowndvd#${Math.floor(Math.random() * 10000000)}`;
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.title, { fontSize: 20 * scale, textAlign: 'center', marginBottom: 20 * scale }]}>
        Vous êtes arrivés à destination
      </Text>
      
      <View style={{ alignItems: 'center', marginBottom: 20 * scale }}>
        {driver.photo ? (
          <Image
            source={{ uri: driver.photo }}
            style={[styles.photo, { width: 100 * scale, height: 100 * scale, borderRadius: 50 * scale }]}
          />
        ) : (
          <View
            style={[
              styles.photoPlaceholder,
              { width: 100 * scale, height: 100 * scale, borderRadius: 50 * scale, backgroundColor: '#10B981' },
            ]}
          >
            <Text style={[styles.photoText, { fontSize: 40 * scale, color: '#FFFFFF' }]}>
              {driver.name.charAt(0)}
            </Text>
          </View>
        )}
        <Text style={[styles.name, { fontSize: 16 * scale, marginTop: 15 * scale }]}>{driver.name}</Text>
        <Text style={[styles.vehicleInfo, { fontSize: 12 * scale, marginTop: 5 * scale }]}>
          {driver.vehicle.plateNumber} | {driver.vehicle.model} {driver.vehicle.color}
        </Text>
      </View>

      <View style={[styles.rideInfo, { marginBottom: 20 * scale }]}>
        <View style={[styles.rideInfoRow, { justifyContent: 'space-between' }]}>
          <Text style={[styles.rideInfoLabel, { fontSize: 14 * scale }]}>Course terminé</Text>
          <Text style={[styles.rideInfoValue, { fontSize: 12 * scale }]}>{rideReference}</Text>
        </View>
        <View style={[styles.rideInfoRow, { justifyContent: 'space-between' }]}>
          <Text style={[styles.rideInfoLabel, { fontSize: 14 * scale }]}>Date</Text>
          <Text style={[styles.rideInfoValue, { fontSize: 12 * scale }]}>{dateStr}</Text>
        </View>
      </View>

      <View style={[styles.ratingSection, { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 20 * scale, marginBottom: 20 * scale }]}>
        <Text style={[styles.ratingTitle, { fontSize: 16 * scale, marginBottom: 15 * scale }]}>Notez la course</Text>
        <View style={[styles.starsContainer, { marginBottom: 20 * scale }]}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => onRatingChange(star)}
              activeOpacity={0.8}
              style={{ marginHorizontal: 5 * scale }}
            >
              <Star
                size={32 * scale}
                color={star <= rating ? '#10B981' : '#E5E7EB'}
                fill={star <= rating ? '#10B981' : 'transparent'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[
            styles.commentInput,
            {
              fontSize: 14 * scale,
              padding: 15 * scale,
              borderRadius: 12 * scale,
              minHeight: 100 * scale,
              marginBottom: 20 * scale,
            },
          ]}
          placeholder="Laissez un commentaire (optionnel)"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={onCommentChange}
          textAlignVertical="top"
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 10 * scale, marginBottom: 20 * scale }}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#10B981',
              height: 50 * scale,
              borderRadius: 17 * scale,
            },
          ]}
          onPress={onViewDetails}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonTextSecondary, { fontSize: 15 * scale, color: '#10B981' }]}>Voir détails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { flex: 1, backgroundColor: '#10B981', height: 50 * scale, borderRadius: 17 * scale }]}
          onPress={onSubmit}
          activeOpacity={0.8}
          disabled={rating === 0}
        >
          <Text style={[styles.buttonText, { fontSize: 15 * scale }]}>Terminer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
  },
  photo: {
    marginRight: 15,
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  photoText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
  },
  vehicleInfo: {
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
    color: '#666666',
  },
  rideInfo: {
    paddingTop: 20,
  },
  rideInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rideInfoLabel: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
  },
  rideInfoValue: {
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  ratingSection: {
    paddingTop: 20,
  },
  ratingTitle: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontFamily: 'Inter-Regular',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonTextSecondary: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
  },
});

