import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { BackButton } from '@/presentation/components/common/BackButton';
import Svg, { Path, Circle } from 'react-native-svg';

const DESIGN_WIDTH = 375;

interface VehicleOption {
  id: string;
  name: string;
  price: string;
  icon: any;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'motorcycle',
    name: 'Moto kilis kalas',
    price: '2 000 FCFA',
    icon: require('../../../assets/images/Motorcycle.png'),
  },
  {
    id: 'car',
    name: 'Auto kilis kalas',
    price: '2 000 FCFA',
    icon: require('../../../assets/images/Vehicle.png'),
  },
  {
    id: 'delivery',
    name: 'Livraison',
    price: '2 000 FCFA',
    icon: require('../../../assets/images/noto_package.png'),
  },
];

export default function ConfirmRideScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('motorcycle');
  const [paymentMethod, setPaymentMethod] = useState<string>(
    (params.selectedMethod as string) || 'cash'
  );

  useEffect(() => {
    if (params.selectedMethod) {
      setPaymentMethod(params.selectedMethod as string);
    }
  }, [params.selectedMethod]);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const origin = {
    latitude: parseFloat((params.originLat as string) || '14.7167'),
    longitude: parseFloat((params.originLng as string) || '-16.4667'),
  };

  const destination = {
    latitude: parseFloat(params.destinationLat as string),
    longitude: parseFloat(params.destinationLng as string),
    address: params.destinationAddress as string,
  };

  const handleCommand = () => {
    router.push({
      pathname: '/(passenger)/booking/searching-driver',
      params: {
        originLat: origin.latitude.toString(),
        originLng: origin.longitude.toString(),
        destinationLat: destination.latitude.toString(),
        destinationLng: destination.longitude.toString(),
        vehicleType: selectedVehicle,
        paymentMethod,
      },
    });
  };

  const handlePaymentMethodClick = () => {
    router.push({
      pathname: '/(passenger)/booking/payment-method',
      params: {
        selectedMethod: paymentMethod,
        originLat: origin.latitude.toString(),
        originLng: origin.longitude.toString(),
        destinationLat: destination.latitude.toString(),
        destinationLng: destination.longitude.toString(),
        destinationAddress: destination.address,
        vehicleType: selectedVehicle,
      },
    });
  };

  // Coordonnées pour la ligne pointillée (itinéraire)
  const routeCoordinates = [
    origin,
    {
      latitude: (origin.latitude + destination.latitude) / 2,
      longitude: (origin.longitude + destination.longitude) / 2,
    },
    destination,
  ];

  const getPaymentIcon = () => {
    // Les SVG seront chargés via des composants
    return paymentMethod;
  };

  const dynamicStyles = StyleSheet.create({
    mapContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - 390 * scale,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    backButton: {
      position: 'absolute',
      top: 20 * scale,
      left: 20 * scale,
      zIndex: 10,
    },
    centerButton: {
      position: 'absolute',
      bottom: 20 * scale,
      right: 20 * scale,
      width: 50 * scale,
      height: 50 * scale,
      borderRadius: 25 * scale,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 10,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: 390 * scale,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 60 * scale,
      borderTopRightRadius: 60 * scale,
      paddingTop: 20 * scale,
    },
    routeInfo: {
      paddingHorizontal: 20 * scale,
      paddingTop: 20 * scale,
      marginBottom: 20 * scale,
    },
    routePoint: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10 * scale,
    },
    routePointText: {
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      color: '#000000',
      marginLeft: 12 * scale,
      flex: 1,
    },
    vehicleContainer: {
      width: SCREEN_WIDTH,
      height: 118 * scale,
      paddingHorizontal: 20 * scale,
      paddingTop: 5 * scale,
      paddingBottom: 5 * scale,
      gap: 10 * scale,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    vehicleItem: {
      width: 105 * scale,
      height: 118 * scale,
      backgroundColor: '#D8E8E2',
      borderRadius: 10 * scale,
      borderWidth: 1,
      paddingTop: 5 * scale,
      paddingBottom: 5 * scale,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    vehicleItemSelected: {
      borderColor: '#10B981',
      backgroundColor: '#F0FDF4',
    },
    vehicleIcon: {
      width: 69 * scale,
      height: 43 * scale,
      resizeMode: 'contain',
    },
    vehiclePrice: {
      fontSize: 12 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      color: '#000000',
      marginBottom: 5 * scale,
    },
    vehicleName: {
      fontSize: 10 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      color: '#000000',
      textAlign: 'center',
      paddingHorizontal: 5 * scale,
    },
    commandContainer: {
      position: 'absolute',
      top: 289 * scale,
      left: 20 * scale,
      width: 335 * scale,
      height: 50 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10 * scale,
    },
    paymentIndicator: {
      width: 50 * scale,
      height: 50 * scale,
      borderRadius: 25 * scale,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentIcon: {
      width: 30 * scale,
      height: 30 * scale,
    },
    commandButton: {
      flex: 1,
      height: 50 * scale,
      backgroundColor: '#10B981',
      borderRadius: 100 * scale,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10 * scale,
    },
    commandButtonText: {
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 15 * scale,
      lineHeight: 20.8 * scale,
      letterSpacing: 0,
      color: '#FFFFFF',
    },
    penguinIcon: {
      width: 24 * scale,
      height: 24 * scale,
      borderRadius: 12 * scale,
      backgroundColor: '#0078FA',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Carte */}
        <View style={dynamicStyles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={dynamicStyles.map}
            initialRegion={{
              latitude: (origin.latitude + destination.latitude) / 2,
              longitude: (origin.longitude + destination.longitude) / 2,
              latitudeDelta: Math.max(Math.abs(origin.latitude - destination.latitude) * 2.5, 0.05),
              longitudeDelta: Math.max(Math.abs(origin.longitude - destination.longitude) * 2.5, 0.05),
            }}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {/* Marqueur origine */}
            <Marker
              coordinate={origin}
              pinColor="#9333EA"
            />
            {/* Marqueur destination */}
            <Marker
              coordinate={destination}
              pinColor="#10B981"
            />
            {/* Ligne pointillée pour l'itinéraire */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#9333EA"
              strokeWidth={3}
              lineDashPattern={[5, 5]}
            />
          </MapView>

          {/* Bouton retour */}
          <View style={dynamicStyles.backButton}>
            <BackButton
              top={0}
              left={0}
              size={50}
              arrowRotation={0}
              arrowSize={20}
            />
          </View>

          {/* Bouton centrer la carte */}
          <TouchableOpacity
            style={dynamicStyles.centerButton}
            onPress={() => {
              // TODO: Centrer la carte sur l'itinéraire
            }}
            activeOpacity={0.8}
          >
            <Svg width={24 * scale} height={24 * scale} viewBox="0 0 24 24">
              <Circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2" fill="none" />
              <Circle cx="12" cy="12" r="3" fill="#000000" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Conteneur inférieur */}
        <View style={dynamicStyles.bottomContainer}>
          {/* Informations de route */}
          <View style={dynamicStyles.routeInfo}>
            <View style={dynamicStyles.routePoint}>
              <Svg width={20 * scale} height={20 * scale} viewBox="0 0 20 20">
                <Circle cx="10" cy="10" r="8" fill="#9333EA" />
              </Svg>
              <Text style={dynamicStyles.routePointText}>
                Départ : Rue zgm
              </Text>
            </View>
            <View style={dynamicStyles.routePoint}>
              <Svg width={20 * scale} height={20 * scale} viewBox="0 0 20 20">
                <Path
                  d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  fill="none"
                />
                <Path
                  d="M10 10V15"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <Path
                  d="M13.2059 13.3333C14.5784 15.0941 15.0642 15.975 14.5059 16.6717C14.4725 16.7361 14.434 16.798 14.3892 16.8574C13.51 17.5 11.6983 17.5 8.07483 17.5H6.92517C3.30167 17.5 1.49 17.5 0.610833 16.8574C0.565833 16.7988 0.527333 16.7368 0.494167 16.6717C-0.0641667 15.975 0.421667 15.0941 1.79417 13.3333"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
              <Text style={dynamicStyles.routePointText}>
                Arrivé : {destination.address}
              </Text>
            </View>
          </View>

          {/* Conteneur des moyens de transport */}
          <View style={dynamicStyles.vehicleContainer}>
            {VEHICLE_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  dynamicStyles.vehicleItem,
                  {
                    borderColor: selectedVehicle === item.id ? '#10B981' : '#D8E8E2',
                    backgroundColor: selectedVehicle === item.id ? '#F0FDF4' : '#D8E8E2',
                  },
                ]}
                onPress={() => setSelectedVehicle(item.id)}
                activeOpacity={0.8}
              >
                <Image
                  source={item.icon}
                  style={dynamicStyles.vehicleIcon}
                />
                <View style={{ alignItems: 'center' }}>
                  <Text style={dynamicStyles.vehiclePrice}>{item.price}</Text>
                  <Text style={dynamicStyles.vehicleName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conteneur bouton commander et indicateur de paiement */}
          <View style={dynamicStyles.commandContainer}>
            <TouchableOpacity
              style={dynamicStyles.paymentIndicator}
              onPress={handlePaymentMethodClick}
              activeOpacity={0.8}
            >
              {paymentMethod === 'cash' && (
                <Svg width={30 * scale} height={30 * scale} viewBox="0 0 30 30">
                  <Path
                    d="M13.2375 8.41881C13.3782 7.78834 13.2704 8.08834 12.3633 6.76177C11.5477 5.57115 11.7164 3.87896 10.7508 3.03756C10.1579 2.52193 9.41489 1.94302 6.64692 3.33521C5.68598 3.81802 3.76645 5.40943 1.59145 6.13834C-0.159331 6.72427 0.810982 7.43209 1.18364 7.56334C2.5102 8.02974 4.26567 7.02193 4.26567 7.02193C4.26567 7.02193 1.74848 8.66724 3.22739 9.05631C4.42739 9.37271 5.93911 7.93131 5.93911 7.93131C5.93911 7.93131 4.45786 9.50162 5.66958 9.90474C6.50161 10.1813 8.15395 8.60162 8.15395 8.60162C8.15395 8.60162 6.99848 10.2071 7.55629 10.5469C8.40473 11.0626 9.79457 9.73365 9.79457 9.73365C9.79457 9.73365 8.69067 11.3461 9.26723 11.6086C10.1297 12.0024 11.4094 10.8961 11.4094 10.8961C11.4094 10.8961 12.9844 9.54615 13.2375 8.41881Z"
                    fill="#E0E0E0"
                  />
                  <Path
                    d="M20.421 16.6007C18.0655 20.1304 16.085 24.0187 11.5804 25.2093C11.5335 25.2211 11.4843 25.207 11.4515 25.1718L4.09208 17.0507C3.87411 16.8093 3.98192 16.4273 4.2913 16.3265C7.31708 15.3328 9.20614 12.9656 10.889 10.4414C13.2093 6.96559 15.1968 3.14059 19.5585 1.88668C19.7249 1.8234 19.9194 1.86324 20.046 2.00153C21.0233 3.07965 28.3944 10.0968 28.4061 10.1109C28.4108 10.1132 22.228 13.8914 20.421 16.6007Z"
                    fill="#66BB6A"
                  />
                </Svg>
              )}
              {paymentMethod === 'wave' && (
                <Svg width={30 * scale} height={30 * scale} viewBox="0 0 62 62">
                  <Circle cx="31" cy="30" r="15" fill="#10B981" />
                  <Circle cx="31" cy="30" r="15.5" stroke="#10B981" strokeWidth="1" fill="none" />
                </Svg>
              )}
              {paymentMethod === 'orange_money' && (
                <Svg width={30 * scale} height={30 * scale} viewBox="0 0 62 62">
                  <Circle cx="31" cy="30" r="15" fill="#0078FA" />
                  <Circle cx="31" cy="30" r="15.5" stroke="#0078FA" strokeWidth="1" fill="none" />
                </Svg>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.commandButton}
              onPress={handleCommand}
              activeOpacity={0.8}
            >
              <View style={dynamicStyles.penguinIcon}>
                <Svg width={16 * scale} height={16 * scale} viewBox="0 0 16 16">
                  <Path
                    d="M8 4C9.10457 4 10 3.10457 10 2C10 0.895431 9.10457 0 8 0C6.89543 0 6 0.895431 6 2C6 3.10457 6.89543 4 8 4Z"
                    fill="#FFFFFF"
                  />
                  <Path
                    d="M8 6C5.79086 6 4 7.79086 4 10V12H12V10C12 7.79086 10.2091 6 8 6Z"
                    fill="#FFFFFF"
                  />
                </Svg>
              </View>
              <Text style={dynamicStyles.commandButtonText}>Commander</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
});
