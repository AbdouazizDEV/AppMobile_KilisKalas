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
    // Mettre à jour la méthode de paiement quand les paramètres changent
    const method = (params.selectedMethod as string) || 'cash';
    if (method !== paymentMethod) {
      setPaymentMethod(method);
    }
  }, [params.selectedMethod, paymentMethod]);

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
      color: '#000000',
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

          {/* Conteneur bouton commander et indicateur du methode de paiement */}
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
                    d="M8.36259 3.22498C8.36259 3.22498 6.85322 4.11091 6.30244 4.82341C6.22978 4.91716 5.77744 5.36951 6.17587 5.62966C6.27665 5.69529 6.57665 5.6531 6.75478 5.54529C7.56572 5.0531 9.00009 3.88591 9.15712 3.94685C9.31415 4.00779 7.87509 4.95466 7.41103 6.10076C7.23759 6.53201 7.57509 6.84138 8.454 6.32341C9.41025 5.76091 10.2329 4.76951 10.3712 4.77419C10.3712 4.77419 9.98681 5.44451 9.49462 5.97419C8.99306 6.5156 8.63915 7.06638 9.00947 7.23982C9.47587 7.46013 10.4837 6.86248 10.4837 6.86248C10.4837 6.86248 9.8415 7.6406 9.00947 7.81638C8.7165 7.87966 8.48681 7.83982 8.34619 7.68044C8.1329 7.43669 8.21493 7.06169 8.21493 7.06169C7.77197 7.23748 7.0079 7.52341 6.55322 7.13904C6.19931 6.83904 6.68212 5.96013 6.68212 5.96013C6.68212 5.96013 5.82665 6.43357 5.33915 6.2906C5.08603 6.2156 4.69931 5.84998 5.26415 5.07419C6.15478 3.86248 8.36259 3.22498 8.36259 3.22498ZM10.1673 11.7492C11.1446 10.4789 12.122 9.21091 13.0993 7.9406L13.0149 7.57498C12.9727 7.44607 12.5884 7.42966 12.0563 7.73669C11.7001 7.94294 11.0462 8.68357 10.6267 8.27576C10.336 7.99451 11.1704 6.98904 11.1704 6.98904C11.0556 6.99138 10.1298 7.61013 9.98212 8.23123C9.85556 8.75857 9.97744 9.37732 11.1681 8.77498C11.2032 8.75623 11.2407 8.73513 11.2759 8.71404C11.1259 8.95076 10.9899 9.19919 10.8751 9.45232C10.5423 10.1836 10.3454 10.9664 10.1673 11.7492Z"
                    fill="#BDBDBD"
                  />
                  <Path
                    d="M20.421 16.6007C18.0655 20.1304 16.085 24.0187 11.5804 25.2093C11.5335 25.2211 11.4843 25.207 11.4515 25.1718L4.09208 17.0507C3.87411 16.8093 3.98192 16.4273 4.2913 16.3265C7.31708 15.3328 9.20614 12.9656 10.889 10.4414C13.2093 6.96559 15.1968 3.14059 19.5585 1.88668C19.7249 1.8234 19.9194 1.86324 20.046 2.00153C21.0233 3.07965 28.3944 10.0968 28.4061 10.1109C28.4108 10.1132 22.228 13.8914 20.421 16.6007Z"
                    fill="#66BB6A"
                  />
                  <Path
                    d="M13.6196 18.2133C13.4603 18.0539 13.2704 17.9742 13.0501 17.9765C12.8298 17.9789 12.5438 18.0679 12.1899 18.2437C11.7095 18.4992 11.2923 18.6187 10.9431 18.607C10.5938 18.5929 10.2798 18.4476 10.0032 18.1687C9.71963 17.8851 9.56963 17.5687 9.55556 17.2219C9.53916 16.875 9.65869 16.5398 9.91416 16.2164L9.4665 15.7664C9.43492 15.7341 9.41724 15.6908 9.41724 15.6457C9.41724 15.6005 9.43492 15.5572 9.4665 15.525L9.61181 15.3797C9.67744 15.314 9.78525 15.314 9.85322 15.3797L10.3032 15.832C10.6337 15.5812 10.9829 15.4781 11.3485 15.5203C11.6767 15.5601 12.0001 15.7218 12.3165 16.0125C12.3774 16.0687 12.3774 16.1672 12.3188 16.2258L12.0517 16.4929C11.9954 16.5492 11.904 16.5492 11.8454 16.4953C11.6345 16.3125 11.4165 16.207 11.1938 16.1836C10.9337 16.1554 10.704 16.2398 10.5071 16.4367C10.3009 16.6429 10.1954 16.8539 10.1931 17.0672C10.1907 17.2828 10.2845 17.4867 10.4743 17.6765C10.6501 17.8547 10.8493 17.9367 11.0696 17.9273C11.2899 17.9179 11.5735 17.8242 11.9251 17.6461C12.2767 17.4679 12.5743 17.3578 12.8274 17.3133C13.0782 17.2687 13.3079 17.2804 13.5142 17.3461C13.7204 17.414 13.9149 17.5383 14.0978 17.7211C14.3884 18.014 14.536 18.3375 14.5384 18.6914C14.5407 19.0453 14.4001 19.3968 14.1142 19.7461L14.4892 20.1211C14.5548 20.1867 14.5548 20.2945 14.4892 20.3625L14.3462 20.5054C14.2806 20.5711 14.1728 20.5711 14.1048 20.5054L13.7298 20.1304C13.3782 20.4211 13.0103 20.5593 12.6282 20.5406C12.2884 20.5242 11.9626 20.3789 11.6532 20.1047C11.6384 20.0912 11.6265 20.0749 11.6182 20.0566C11.61 20.0383 11.6057 20.0186 11.6054 19.9985C11.6052 19.9785 11.6091 19.9586 11.617 19.9402C11.6248 19.9218 11.6363 19.9051 11.6509 19.8914L11.9228 19.6218C11.9767 19.5679 12.0634 19.5633 12.122 19.6125C12.3306 19.7929 12.5462 19.8843 12.7688 19.889C13.0243 19.8937 13.2681 19.7789 13.5001 19.5468C13.7274 19.3218 13.8517 19.0875 13.8728 18.8508C13.8892 18.614 13.8071 18.4008 13.6196 18.2133Z"
                    fill="white"
                  />
                  <Path
                    d="M14.2194 19.8609L13.7272 20.1351L9.92334 16.2304L9.79443 16.0992L10.303 15.8344L14.1069 19.7484L14.2194 19.8609Z"
                    fill="white"
                  />
                  <Path
                    opacity="0.5"
                    d="M17.7845 14.0555C19.651 14.0555 21.1642 12.5424 21.1642 10.6758C21.1642 8.80928 19.651 7.29614 17.7845 7.29614C15.9179 7.29614 14.4048 8.80928 14.4048 10.6758C14.4048 12.5424 15.9179 14.0555 17.7845 14.0555Z"
                    fill="#2E7D32"
                  />
                  <Path
                    d="M21.6001 18.3797C20.3931 20.189 18.654 23.6414 16.2587 25.5398C14.0603 27.2836 11.2876 28.1437 11.2876 28.1437L3.65869 19.2093L3.9751 16.7578L11.4563 25.1742C11.4868 25.207 11.5337 25.2234 11.5782 25.2117C16.0853 24.0211 18.0657 20.1328 20.4212 16.6031C22.2282 13.8937 24.9306 11.0062 28.4087 10.1156C28.6853 10.4203 28.5634 12.975 28.261 13.0758C25.179 14.0976 23.2876 15.8461 21.6001 18.3797Z"
                    fill="#2E7D32"
                  />
                </Svg>
              )}
              {paymentMethod === 'wave' && (
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/dhivn2ahm/image/upload/v1742918314/images_2_nnjbsa.png',
                  }}
                  style={{
                    width: 30 * scale,
                    height: 30 * scale,
                    borderRadius: 15 * scale,
                  }}
                  resizeMode="contain"
                />
              )}
              {paymentMethod === 'orange_money' && (
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/dhivn2ahm/image/upload/v1742918314/Orange-Money-recrute-pour-ces-02-postes-08-Novembre-2024_wr0bvp.png',
                  }}
                  style={{
                    width: 30 * scale,
                    height: 30 * scale,
                    borderRadius: 15 * scale,
                  }}
                  resizeMode="contain"
                />
              )}
              {paymentMethod === 'yas' && (
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/dhivn2ahm/image/upload/v1742918314/channels4_profile_rqd24x.jpg',
                  }}
                  style={{
                    width: 30 * scale,
                    height: 30 * scale,
                    borderRadius: 15 * scale,
                  }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.commandButton}
              onPress={handleCommand}
              activeOpacity={0.8}
            >
              {/* <View style={dynamicStyles.penguinIcon}>
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
              </View> */}
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
