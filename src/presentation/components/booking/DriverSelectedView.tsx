import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Driver } from '@/core/entities/Driver';
import { Star, Phone, MessageCircle } from 'lucide-react-native';

const DESIGN_WIDTH = 375;

interface DriverSelectedViewProps {
  driver: Driver;
  vehicleIcon: any;
  arrivalTime?: string;
  onChat: () => void;
  onCall: () => void;
  onStartRide?: () => void;
  onCancel: () => void;
}

export const DriverSelectedView: React.FC<DriverSelectedViewProps> = ({
  driver,
  vehicleIcon,
  arrivalTime = '20 minutes',
  onChat,
  onCall,
  onStartRide,
  onCancel,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.arrivalText, { fontSize: 16 * scale, marginBottom: 15 * scale }]}>
        Votre chauffeur arrive dans <Text style={styles.arrivalTimeBold}>{arrivalTime}</Text>
      </Text>
      
      <View style={[styles.vehicleCard, { marginBottom: 15 * scale, padding: 12 * scale, borderRadius: 12 * scale }]}>
        <Image source={vehicleIcon} style={[styles.vehicleIcon, { width: 60 * scale, height: 35 * scale }]} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.plateNumber, { fontSize: 16 * scale }]}>{driver.vehicle.plateNumber}</Text>
          <Text style={[styles.vehicleModel, { fontSize: 12 * scale }]}>
            {driver.vehicle.model} • {driver.vehicle.color}
          </Text>
        </View>
      </View>

      <View style={[styles.driverCard, { borderColor: '#10B981', backgroundColor: '#F0FDF4', marginBottom: 15 * scale, padding: 12 * scale, borderRadius: 12 * scale }]}>
        {driver.photo ? (
          <Image
            source={{ uri: driver.photo }}
            style={[styles.photo, { width: 60 * scale, height: 60 * scale, borderRadius: 30 * scale }]}
          />
        ) : (
          <View style={[styles.photoPlaceholder, { width: 60 * scale, height: 60 * scale, borderRadius: 30 * scale }]}>
            <Text style={[styles.photoText, { fontSize: 24 * scale }]}>{driver.name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={[styles.name, { fontSize: 16 * scale }]}>{driver.name}</Text>
          <View style={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14 * scale}
                color={i < Math.floor(driver.rating) ? '#10B981' : '#E5E7EB'}
                fill={i < Math.floor(driver.rating) ? '#10B981' : 'transparent'}
              />
            ))}
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { width: 50 * scale, height: 50 * scale, borderRadius: 25 * scale, marginRight: 10 * scale }]}
            onPress={onChat}
            activeOpacity={0.8}
          >
            <MessageCircle size={24 * scale} color="#10B981" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { width: 50 * scale, height: 50 * scale, borderRadius: 25 * scale }]}
            onPress={onCall}
            activeOpacity={0.8}
          >
            <Phone size={24 * scale} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>

      {onStartRide && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#10B981', marginTop: 10 * scale, marginBottom: 15 * scale, width: 335 * scale, height: 50 * scale, borderRadius: 17 * scale }]}
          onPress={onStartRide}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { fontSize: 15 * scale }]}>Démarrer la course</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#DC2626', width: 335 * scale, height: 50 * scale, borderRadius: 17 * scale, marginBottom: 1 * scale }]}
        onPress={onCancel}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { fontSize: 15 * scale }]}>Annuler la commande</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  arrivalText: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
    textAlign: 'center',
  },
  arrivalTimeBold: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
  },
  vehicleCard: {
    backgroundColor: '#D8E8E2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    marginRight: 15,
  },
  plateNumber: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  vehicleModel: {
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
    color: '#666666',
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
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

