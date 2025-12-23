import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Driver } from '@/core/entities/Driver';
import { Send, AlertCircle } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const DESIGN_WIDTH = 375;

interface RideInProgressViewProps {
  driver: Driver;
  vehicleIcon: any;
  estimatedArrivalTime: string;
  destinationAddress: string;
  onShareTrip: () => void;
  onEmergencyCall: () => void;
  onCompleteRide: () => void;
}

export const RideInProgressView: React.FC<RideInProgressViewProps> = ({
  driver,
  vehicleIcon,
  estimatedArrivalTime,
  destinationAddress,
  onShareTrip,
  onEmergencyCall,
  onCompleteRide,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.arrivalText, { fontSize: 16 * scale, marginBottom: 20 * scale }]}>
        Temps d'arrivée estimé: <Text style={styles.arrivalTimeBold}>{estimatedArrivalTime}</Text>
      </Text>
      
      <View style={[styles.vehicleCard, { marginBottom: 20 * scale, padding: 15 * scale, borderRadius: 12 * scale }]}>
        <Image source={vehicleIcon} style={[styles.vehicleIcon, { width: 60 * scale, height: 35 * scale }]} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.plateNumber, { fontSize: 16 * scale }]}>{driver.vehicle.plateNumber}</Text>
          <Text style={[styles.vehicleModel, { fontSize: 12 * scale }]}>
            {driver.vehicle.model} • {driver.vehicle.color}
          </Text>
        </View>
      </View>

      <View style={[styles.routeInfo, { marginTop: 20 * scale, marginBottom: 20 * scale }]}>
        <View style={styles.routePoint}>
          <Svg width={20 * scale} height={20 * scale} viewBox="0 0 20 20">
            <Circle cx="10" cy="10" r="8" fill="#9333EA" />
          </Svg>
          <Text style={[styles.routePointText, { fontSize: 14 * scale, marginLeft: 12 * scale }]}>Départ: Rue zgm</Text>
        </View>
        <View style={styles.routePoint}>
          <Svg width={20 * scale} height={20 * scale} viewBox="0 0 20 20">
            <Path
              d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z"
              stroke="#10B981"
              strokeWidth="1.5"
              fill="none"
            />
            <Path d="M10 10V15" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
            <Path
              d="M13.2059 13.3333C14.5784 15.0941 15.0642 15.975 14.5059 16.6717C14.4725 16.7361 14.434 16.798 14.3892 16.8574C13.51 17.5 11.6983 17.5 8.07483 17.5H6.92517C3.30167 17.5 1.49 17.5 0.610833 16.8574C0.565833 16.7988 0.527333 16.7368 0.494167 16.6717C-0.0641667 15.975 0.421667 15.0941 1.79417 13.3333"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
          <Text style={[styles.routePointText, { fontSize: 14 * scale, marginLeft: 12 * scale }]}>Arrivé: {destinationAddress}</Text>
        </View>
      </View>

      <View style={[styles.actions, { marginTop: 30 * scale, marginBottom: 30 * scale }]}>
        <TouchableOpacity
          style={[styles.actionButton, { width: 80 * scale, height: 80 * scale, borderRadius: 40 * scale }]}
          onPress={onShareTrip}
          activeOpacity={0.8}
        >
          <Send size={32 * scale} color="#10B981" />
          <Text style={[styles.actionButtonText, { fontSize: 12 * scale, marginTop: 5 * scale, textAlign: 'center' }]}>
            Envoyer le trajet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { width: 80 * scale, height: 80 * scale, borderRadius: 40 * scale, borderColor: '#DC2626' }]}
          onPress={onEmergencyCall}
          activeOpacity={0.8}
        >
          <AlertCircle size={32 * scale} color="#DC2626" />
          <Text style={[styles.actionButtonText, { fontSize: 12 * scale, marginTop: 5 * scale, textAlign: 'center', color: '#DC2626' }]}>
            Appel d'urgence
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.completeButton, { backgroundColor: '#10B981', marginTop: 20 * scale, width: 335 * scale, height: 50 * scale, borderRadius: 17 * scale }]}
        onPress={onCompleteRide}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { fontSize: 15 * scale }]}>Arrivé à destination</Text>
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
  routeInfo: {
    paddingTop: 20,
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  routePointText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
  },
  completeButton: {
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

