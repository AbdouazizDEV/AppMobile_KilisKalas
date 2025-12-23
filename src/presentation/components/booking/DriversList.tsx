import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Driver } from '@/core/entities/Driver';
import { Star } from 'lucide-react-native';

const DESIGN_WIDTH = 375;

interface DriversListProps {
  drivers: Driver[];
  selectedDriver: Driver | null;
  onSelectDriver: (driver: Driver) => void;
  onConfirmDriver?: () => void;
}

export const DriversList: React.FC<DriversListProps> = ({
  drivers,
  selectedDriver,
  onSelectDriver,
  onConfirmDriver,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.title, { fontSize: 18 * scale, marginBottom: 15 * scale }]}>
        Chauffeurs disponibles
      </Text>
      {drivers.length === 0 ? (
        <Text style={[styles.noDriversText, { fontSize: 14 * scale }]}>
          Aucun chauffeur disponible pour le moment
        </Text>
      ) : (
        <>
          {drivers.map((driver) => (
            <TouchableOpacity
              key={driver.id}
              style={[
                styles.driverCard,
                {
                  borderColor: selectedDriver?.id === driver.id ? '#10B981' : '#E5E7EB',
                  backgroundColor: selectedDriver?.id === driver.id ? '#F0FDF4' : '#FFFFFF',
                  marginBottom: 10 * scale,
                  padding: 15 * scale,
                  borderRadius: 12 * scale,
                },
              ]}
              onPress={() => onSelectDriver(driver)}
              activeOpacity={0.8}
            >
              {driver.photo ? (
                <Image
                  source={{ uri: driver.photo }}
                  style={[styles.photo, { width: 60 * scale, height: 60 * scale, borderRadius: 30 * scale }]}
                />
              ) : (
                <View
                  style={[
                    styles.photoPlaceholder,
                    { width: 60 * scale, height: 60 * scale, borderRadius: 30 * scale },
                  ]}
                >
                  <Text style={[styles.photoText, { fontSize: 24 * scale }]}>{driver.name.charAt(0)}</Text>
                </View>
              )}
              <View style={styles.info}>
                <Text style={[styles.name, { fontSize: 16 * scale }]}>{driver.name}</Text>
                <View style={styles.rating}>
                  <Star size={14 * scale} color="#FBBF24" fill="#FBBF24" />
                  <Text style={[styles.ratingText, { fontSize: 14 * scale }]}>{driver.rating.toFixed(1)}</Text>
                  <Text style={[styles.ridesText, { fontSize: 12 * scale }]}>• {driver.totalRides} courses</Text>
                </View>
                <Text style={[styles.vehicleInfo, { fontSize: 12 * scale }]}>
                  {driver.vehicle.brand} {driver.vehicle.model} • {driver.vehicle.plateNumber}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
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
  noDriversText: {
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  driverCard: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    marginRight: 15,
  },
  photoPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  photoText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#666666',
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#000000',
    marginLeft: 5,
  },
  ridesText: {
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginLeft: 5,
  },
  vehicleInfo: {
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  confirmButton: {
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

