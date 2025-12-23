/**
 * Page de confirmation de course
 * 
 * Cette page gère tout le flux de réservation d'une course :
 * 1. Sélection du véhicule et méthode de paiement
 * 2. Recherche de chauffeurs disponibles
 * 3. Sélection d'un chauffeur
 * 4. Suivi de la course en cours
 * 5. Notation après la course
 * 
 * Tous les états sont gérés dans cette page unique pour une meilleure expérience utilisateur
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { BackButton } from '@/presentation/components/common/BackButton';
import Svg, { Circle } from 'react-native-svg';
import { getRoute, RouteCoordinate } from '@/infrastructure/services/GoogleMapsService';
import { MOCK_DRIVERS } from '@/data/datasources/mock/MockDriverData';
import { Driver } from '@/core/entities/Driver';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import {
  BottomSheet,
  DeliveryForm,
  SearchingDriverView,
  DriversList,
  DriverSelectedView,
  RideInProgressView,
  RideCompletedView,
  RideDetailsView,
} from '@/presentation/components/booking';

// Largeur de référence pour le design responsive
const DESIGN_WIDTH = 375;

/**
 * Interface pour les options de véhicules disponibles
 */
interface VehicleOption {
  id: string;
  name: string;
  price: string;
  icon: any;
}

/**
 * Liste des types de véhicules disponibles pour la réservation
 */
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

/**
 * États possibles du processus de réservation
 * - idle: État initial, sélection du véhicule et paiement
 * - searching: Recherche de chauffeurs en cours (animation 3 secondes)
 * - drivers_available: Chauffeurs disponibles affichés sur la carte
 * - driver_selected: Un chauffeur a été sélectionné, en attente de confirmation
 * - ride_in_progress: Course en cours, suivi en temps réel
 * - ride_completed: Course terminée, notation du chauffeur
 */
type SearchState = 'idle' | 'searching' | 'drivers_available' | 'driver_selected' | 'ride_in_progress' | 'ride_completed';

export default function ConfirmRideScreen() {
  // Navigation et paramètres de route
  const router = useRouter();
  const params = useLocalSearchParams();

  // État de sélection du véhicule (moto, voiture, livraison)
  const [selectedVehicle, setSelectedVehicle] = useState<string>('motorcycle');
  
  // Méthode de paiement sélectionnée (cash, wave, orange_money, yas)
  const [paymentMethod, setPaymentMethod] = useState<string>(
    (params.selectedMethod as string) || 'cash'
  );

  // Coordonnées de l'itinéraire pour affichage sur la carte
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinate[]>([]);
  
  // Informations sur la route (distance et durée)
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string }>({
    distance: '',
    duration: '',
  });

  // État actuel du processus de réservation
  const [searchState, setSearchState] = useState<SearchState>('idle');
  
  // Liste des chauffeurs disponibles après la recherche
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
  
  // Chauffeur sélectionné par l'utilisateur
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  
  // Hauteur actuelle du bottom sheet (pour ajuster la carte)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(280);
  
  // Notation du chauffeur (1-5 étoiles)
  const [rating, setRating] = useState(0);
  
  // Commentaire optionnel après la course
  const [comment, setComment] = useState('');
  
  // Temps d'arrivée estimé pendant la course
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState('20 minutes');
  
  // Formulaire de livraison (si type de véhicule = delivery)
  const [deliveryForm, setDeliveryForm] = useState({
    recipientPhone: '',
    recipientName: '',
    packageDescription: '',
  });
  
  // Validation du formulaire de livraison
  const [isDeliveryFormValid, setIsDeliveryFormValid] = useState(false);
  
  // Référence à la carte pour contrôler la vue
  const mapRef = useRef<MapView>(null);

  // Dimensions de l'écran pour le responsive design
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  // Point de départ (origine) de la course
  const origin = {
    latitude: parseFloat((params.originLat as string) || '14.7167'), // Par défaut: Dakar
    longitude: parseFloat((params.originLng as string) || '-16.4667'),
  };

  // Point d'arrivée (destination) de la course
  const destination = {
    latitude: parseFloat(params.destinationLat as string),
    longitude: parseFloat(params.destinationLng as string),
    address: params.destinationAddress as string,
  };

  /**
   * Mise à jour de la méthode de paiement quand elle change depuis la page payment-method
   */
  useEffect(() => {
    const method = (params.selectedMethod as string) || 'cash';
    if (method !== paymentMethod) {
      setPaymentMethod(method);
    }
  }, [params.selectedMethod, paymentMethod]);

  /**
   * Réinitialisation du formulaire de livraison si l'utilisateur change de type de véhicule
   */
  useEffect(() => {
    if (selectedVehicle !== 'delivery') {
      setDeliveryForm({
        recipientPhone: '',
        recipientName: '',
        packageDescription: '',
      });
    }
  }, [selectedVehicle]);

  /**
   * Chargement de l'itinéraire réel depuis Google Maps API
   * Se déclenche uniquement à l'état initial (idle) pour éviter les appels inutiles
   */
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const route = await getRoute(origin, destination);
        setRouteCoordinates(route.coordinates);
        setRouteInfo({
          distance: route.distance,
          duration: route.duration,
        });
      } catch (error) {
        console.error('Error fetching route:', error);
        // En cas d'erreur, utiliser une ligne droite entre origine et destination
        setRouteCoordinates([origin, destination]);
      }
    };

    // Charger l'itinéraire seulement si on a les coordonnées et qu'on est à l'état initial
    if (origin.latitude && origin.longitude && destination.latitude && destination.longitude && searchState === 'idle') {
      fetchRoute();
    }
  }, [origin.latitude, origin.longitude, destination.latitude, destination.longitude]);

  /**
   * Timer de 3 secondes pendant la recherche de chauffeurs
   * Après 3 secondes, on charge les chauffeurs disponibles
   */
  useEffect(() => {
    if (searchState === 'searching') {
      const timer = setTimeout(() => {
        loadAvailableDrivers();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchState]);

  /**
   * Ajustement automatique de la vue de la carte selon l'état actuel
   * - drivers_available: Affiche tous les chauffeurs, origine et destination
   * - driver_selected: Affiche le chauffeur sélectionné et l'origine
   * - idle: Affiche l'itinéraire complet
   */
  useEffect(() => {
    if (mapRef.current) {
      if (searchState === 'drivers_available' && availableDrivers.length > 0) {
        // Afficher tous les chauffeurs disponibles avec origine et destination
        const allCoordinates = [
          origin,
          destination,
          ...availableDrivers.map((driver) => driver.location),
        ];
        mapRef.current.fitToCoordinates(allCoordinates, {
          edgePadding: {
            top: 50 * scale,
            right: 50 * scale,
            bottom: (bottomSheetHeight + 50) * scale, // Prendre en compte la hauteur du bottom sheet
            left: 50 * scale,
          },
          animated: true,
        });
      } else if (searchState === 'driver_selected' && selectedDriver) {
        // Afficher le chauffeur sélectionné et le point de départ
        const allCoordinates = [selectedDriver.location, origin];
        mapRef.current.fitToCoordinates(allCoordinates, {
          edgePadding: {
            top: 50 * scale,
            right: 50 * scale,
            bottom: (bottomSheetHeight + 50) * scale,
            left: 50 * scale,
          },
          animated: true,
        });
      } else if (routeCoordinates.length > 0 && searchState === 'idle') {
        // Afficher l'itinéraire complet à l'état initial
        const allCoordinates = [origin, ...routeCoordinates, destination];
        mapRef.current.fitToCoordinates(allCoordinates, {
          edgePadding: {
            top: 50 * scale,
            right: 50 * scale,
            bottom: (bottomSheetHeight + 50) * scale,
            left: 50 * scale,
          },
          animated: true,
        });
      }
    }
  }, [searchState, availableDrivers, selectedDriver, routeCoordinates, bottomSheetHeight]);

  /**
   * Charge les chauffeurs disponibles selon le type de véhicule sélectionné
   * Filtre les chauffeurs en ligne et disponibles avec le bon type de véhicule
   */
  const loadAvailableDrivers = () => {
    /**
     * Mapping des types de véhicules sélectionnés vers les types de véhicules des chauffeurs
     */
    const getVehicleTypes = (type: string): string[] => {
      switch (type) {
        case 'car':
          return ['standard', 'premium']; // Voitures standard et premium
        case 'motorcycle':
          return ['motorcycle']; // Uniquement motos
        case 'delivery':
          return ['standard', 'premium', 'motorcycle']; // Tous types pour la livraison
        default:
          return [type];
      }
    };

    const allowedTypes = getVehicleTypes(selectedVehicle);
    
    // Filtrer les chauffeurs disponibles, en ligne et avec le bon type de véhicule
    const filtered = MOCK_DRIVERS.filter(
      (driver) =>
        driver.isAvailable &&
        driver.isOnline &&
        allowedTypes.includes(driver.vehicle.type)
    );
    
    setAvailableDrivers(filtered);
    setSearchState('drivers_available');
  };

  /**
   * Validation du formulaire de livraison
   * Tous les champs doivent être remplis pour valider
   */
  useEffect(() => {
    if (selectedVehicle === 'delivery') {
      const isValid =
        deliveryForm.recipientPhone.trim().length > 0 &&
        deliveryForm.recipientName.trim().length > 0 &&
        deliveryForm.packageDescription.trim().length > 0;
      setIsDeliveryFormValid(isValid);
    } else {
      // Pour les autres types de véhicules, le formulaire est toujours valide
      setIsDeliveryFormValid(true);
    }
  }, [deliveryForm, selectedVehicle]);

  /**
   * Gestion du clic sur le bouton "Commander"
   * Vérifie la validité du formulaire si c'est une livraison
   * Lance la recherche de chauffeurs
   */
  const handleCommand = () => {
    if (selectedVehicle === 'delivery' && !isDeliveryFormValid) {
      return; // Ne pas permettre la commande si le formulaire n'est pas valide
    }
    setSearchState('searching');
  };

  /**
   * Sélection d'un chauffeur depuis la liste ou la carte
   */
  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setSearchState('driver_selected');
  };

  /**
   * Appel téléphonique au chauffeur
   */
  const handleCall = () => {
    if (selectedDriver) {
      Linking.openURL(`tel:${selectedDriver.phone}`);
    }
  };

  /**
   * Navigation vers la page de chat avec le chauffeur
   */
  const handleChat = () => {
    if (selectedDriver) {
      router.push({
        pathname: '/(passenger)/booking/chat',
        params: {
          driverId: selectedDriver.id,
          driverName: selectedDriver.name,
          driverPhoto: selectedDriver.photo || '',
          driverPhone: selectedDriver.phone,
        },
      });
    }
  };

  /**
   * Annulation de la commande
   * Retour à l'état initial
   */
  const handleCancel = () => {
    setSearchState('idle');
    setSelectedDriver(null);
    setAvailableDrivers([]);
  };

  /**
   * Démarrage de la course
   * Le chauffeur a rejoint le client, on passe en mode "en route"
   * Recharge l'itinéraire et calcule le temps d'arrivée
   */
  const handleStartRide = () => {
    setSearchState('ride_in_progress');
    if (selectedDriver) {
      const fetchRideRoute = async () => {
        try {
          const route = await getRoute(origin, destination);
          setRouteCoordinates(route.coordinates);
          // Extraire le temps d'arrivée depuis la durée de la route
          const durationMatch = route.duration.match(/(\d+)/);
          if (durationMatch) {
            const minutes = parseInt(durationMatch[1]);
            setEstimatedArrivalTime(`${minutes} minutes`);
          }
        } catch (error) {
          console.error('Error fetching ride route:', error);
        }
      };
      fetchRideRoute();
    }
  };

  /**
   * Partage du trajet par SMS
   * Envoie les informations de la course à un contact
   */
  const handleShareTrip = async () => {
    const tripInfo = `Je suis en route vers ${destination.address}. Temps d'arrivée estimé: ${estimatedArrivalTime}`;
    try {
      await Linking.openURL(`sms:?body=${encodeURIComponent(tripInfo)}`);
    } catch (error) {
      console.error('Error sharing trip:', error);
    }
  };

  /**
   * Appel d'urgence (pompiers)
   */
  const handleEmergencyCall = () => {
    Linking.openURL(`tel:18`);
  };

  /**
   * Arrivée à destination
   * Passe à l'état de notation du chauffeur
   */
  const handleCompleteRide = () => {
    setSearchState('ride_completed');
    setBottomSheetHeight(600); // Augmenter la hauteur pour afficher le formulaire de notation
  };

  /**
   * Soumission de la notation et du commentaire
   * Retour à la page d'accueil après soumission
   */
  const handleSubmitRating = () => {
    console.log('Rating:', rating, 'Comment:', comment);
    // TODO: Envoyer la notation au backend
    router.replace('/(passenger)/(tabs)/home');
  };

  /**
   * Affichage des détails de la course
   * TODO: Implémenter la navigation vers la page de détails
   */
  const handleViewDetails = () => {
    console.log('View details');
  };

  /**
   * Navigation vers la page de sélection de méthode de paiement
   * Passe les paramètres nécessaires pour revenir sur cette page
   */
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

  // Icône du véhicule sélectionné pour l'animation et l'affichage
  const vehicleIcon = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle)?.icon || VEHICLE_OPTIONS[0].icon;

  /**
   * Rendu conditionnel du contenu du bottom sheet selon l'état actuel
   * Chaque état affiche un composant différent
   */
  const renderBottomContent = () => {
    // État: Recherche de chauffeurs en cours (animation 3 secondes)
    if (searchState === 'searching') {
      return <SearchingDriverView vehicleIcon={vehicleIcon} onCancel={handleCancel} />;
    }

    // État: Chauffeurs disponibles affichés
    if (searchState === 'drivers_available') {
      return (
        <DriversList
          drivers={availableDrivers}
          selectedDriver={selectedDriver}
          onSelectDriver={handleSelectDriver}
        />
      );
    }

    // État: Chauffeur sélectionné, en attente de confirmation
    if (searchState === 'driver_selected' && selectedDriver) {
      return (
        <DriverSelectedView
          driver={selectedDriver}
          vehicleIcon={vehicleIcon}
          onChat={handleChat}
          onCall={handleCall}
          onStartRide={handleStartRide}
          onCancel={handleCancel}
        />
      );
    }

    // État: Course en cours, suivi en temps réel
    if (searchState === 'ride_in_progress' && selectedDriver) {
      return (
        <RideInProgressView
          driver={selectedDriver}
          vehicleIcon={vehicleIcon}
          estimatedArrivalTime={estimatedArrivalTime}
          destinationAddress={destination.address}
          onShareTrip={handleShareTrip}
          onEmergencyCall={handleEmergencyCall}
          onCompleteRide={handleCompleteRide}
        />
      );
    }

    // État: Course terminée, notation du chauffeur
    if (searchState === 'ride_completed' && selectedDriver) {
      return (
        <RideCompletedView
          driver={selectedDriver}
          rating={rating}
          comment={comment}
          onRatingChange={setRating}
          onCommentChange={setComment}
          onSubmit={handleSubmitRating}
          onViewDetails={handleViewDetails}
        />
      );
    }

    // État initial: Formulaire de livraison (si type = delivery)
    if (selectedVehicle === 'delivery') {
      return (
        <DeliveryForm
          recipientPhone={deliveryForm.recipientPhone}
          recipientName={deliveryForm.recipientName}
          packageDescription={deliveryForm.packageDescription}
          onRecipientPhoneChange={(text) => setDeliveryForm({ ...deliveryForm, recipientPhone: text })}
          onRecipientNameChange={(text) => setDeliveryForm({ ...deliveryForm, recipientName: text })}
          onPackageDescriptionChange={(text) => setDeliveryForm({ ...deliveryForm, packageDescription: text })}
          isValid={isDeliveryFormValid}
          onSubmit={handleCommand}
        />
      );
    }

    // État initial: Sélection du véhicule et méthode de paiement (par défaut)
    return (
      <RideDetailsView
        destinationAddress={destination.address}
        routeInfo={routeInfo}
        vehicleOptions={VEHICLE_OPTIONS}
        selectedVehicle={selectedVehicle}
        paymentMethod={paymentMethod}
        onVehicleSelect={setSelectedVehicle}
        onPaymentMethodClick={handlePaymentMethodClick}
        onCommand={handleCommand}
        isDeliveryFormValid={isDeliveryFormValid}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* KeyboardAvoidingView pour gérer l'affichage du clavier */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={styles.content}>
            {/* Carte Google Maps */}
            <View style={[styles.mapContainer, { height: SCREEN_HEIGHT - bottomSheetHeight * scale }]}>
              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  // Centrer la carte entre origine et destination
                  latitude: (origin.latitude + destination.latitude) / 2,
                  longitude: (origin.longitude + destination.longitude) / 2,
                  // Calculer le zoom pour afficher les deux points
                  latitudeDelta: Math.max(Math.abs(origin.latitude - destination.latitude) * 2.5, 0.05),
                  longitudeDelta: Math.max(Math.abs(origin.longitude - destination.longitude) * 2.5, 0.05),
                }}
                showsUserLocation
                showsMyLocationButton={false}
              >
                {/* Marqueur du point de départ (violet) */}
                <Marker coordinate={origin} pinColor="#9333EA" />
                
                {/* Marqueur du point d'arrivée (vert) */}
                <Marker coordinate={destination} pinColor="#10B981" />
                
                {/* Itinéraire tracé sur la carte */}
                {routeCoordinates.length > 0 &&
                  (searchState === 'idle' ||
                    searchState === 'searching' ||
                    searchState === 'drivers_available' ||
                    searchState === 'driver_selected' ||
                    searchState === 'ride_in_progress') && (
                    <Polyline
                      coordinates={routeCoordinates}
                      strokeColor="#9333EA"
                      strokeWidth={4}
                      lineCap="round"
                      lineJoin="round"
                      // Ligne pointillée pendant la recherche et le trajet
                      lineDashPattern={
                        searchState === 'ride_in_progress' ||
                        searchState === 'searching' ||
                        searchState === 'drivers_available' ||
                        searchState === 'driver_selected'
                          ? [5, 5]
                          : undefined
                      }
                    />
                  )}
                
                {/* Marqueur du véhicule en route (pendant la course) */}
                {searchState === 'ride_in_progress' && selectedDriver && (
                  <Marker coordinate={origin}>
                    <View style={[styles.driverMarker, { backgroundColor: '#9333EA', width: 50 * scale, height: 50 * scale, borderRadius: 25 * scale }]}>
                      <View style={{ width: 40 * scale, height: 25 * scale, justifyContent: 'center', alignItems: 'center' }}>
                        <Svg width={40 * scale} height={25 * scale} viewBox="0 0 40 25">
                          <Circle cx="20" cy="12.5" r="10" fill="#FFFFFF" />
                        </Svg>
                      </View>
                    </View>
                  </Marker>
                )}
                
                {/* Marqueurs des chauffeurs disponibles */}
                {searchState === 'drivers_available' &&
                  availableDrivers.map((driver) => (
                    <Marker
                      key={driver.id}
                      coordinate={driver.location}
                      onPress={() => handleSelectDriver(driver)}
                    >
                      <View
                        style={[
                          styles.driverMarker,
                          {
                            // Vert si sélectionné, violet sinon
                            backgroundColor: selectedDriver?.id === driver.id ? '#10B981' : '#9333EA',
                            width: 40 * scale,
                            height: 20 * scale,
                            borderRadius: 10 * scale,
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}
                      >
                        <View style={{ width: 30 * scale, height: 30 * scale, borderRadius: 15 * scale, backgroundColor: '#FFFFFF', opacity: 0.3 }} />
                      </View>
                    </Marker>
                  ))}
                
                {/* Marqueur du chauffeur sélectionné */}
                {searchState === 'driver_selected' && selectedDriver && (
                  <Marker coordinate={selectedDriver.location}>
                    <View style={[styles.driverMarker, { backgroundColor: '#10B981', width: 50 * scale, height: 50 * scale, borderRadius: 25 * scale }]}>
                      <View style={{ width: 20 * scale, height: 25 * scale, justifyContent: 'center', alignItems: 'center' }}>
                        <Svg width={40 * scale} height={25 * scale} viewBox="0 0 40 25">
                          <Circle cx="20" cy="12.5" r="10" fill="#FFFFFF" />
                        </Svg>
                      </View>
                    </View>
                  </Marker>
                )}
              </MapView>

              {/* Bouton retour */}
              <View style={styles.backButton}>
                <BackButton
                  top={0}
                  left={0}
                  size={50}
                  arrowRotation={0}
                  arrowSize={20}
                  onPress={() => router.back()}
                />
              </View>

              {/* Bouton pour recentrer la carte */}
              <TouchableOpacity
                style={styles.centerButton}
                onPress={() => {
                  if (mapRef.current) {
                    // Recentrer selon l'état actuel
                    if (searchState === 'drivers_available' && availableDrivers.length > 0) {
                      // Afficher tous les chauffeurs
                      const allCoordinates = [
                        origin,
                        destination,
                        ...availableDrivers.map((driver) => driver.location),
                      ];
                      mapRef.current.fitToCoordinates(allCoordinates, {
                        edgePadding: {
                          top: 50 * scale,
                          right: 50 * scale,
                          bottom: (bottomSheetHeight + 50) * scale,
                          left: 50 * scale,
                        },
                        animated: true,
                      });
                    } else if (searchState === 'driver_selected' && selectedDriver) {
                      // Afficher le chauffeur sélectionné
                      const allCoordinates = [selectedDriver.location, origin];
                      mapRef.current.fitToCoordinates(allCoordinates, {
                        edgePadding: {
                          top: 50 * scale,
                          right: 50 * scale,
                          bottom: (bottomSheetHeight + 50) * scale,
                          left: 50 * scale,
                        },
                        animated: true,
                      });
                    } else if (routeCoordinates.length > 0) {
                      // Afficher l'itinéraire complet
                      const allCoordinates = [origin, ...routeCoordinates, destination];
                      mapRef.current.fitToCoordinates(allCoordinates, {
                        edgePadding: {
                          top: 50 * scale,
                          right: 50 * scale,
                          bottom: (bottomSheetHeight + 50) * scale,
                          left: 50 * scale,
                        },
                        animated: true,
                      });
                    }
                  }
                }}
                activeOpacity={0.8}
              >
                <Svg width={24 * scale} height={24 * scale} viewBox="0 0 24 24">
                  <Circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2" fill="none" />
                  <Circle cx="12" cy="12" r="3" fill="#000000" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Bottom Sheet swipeable avec contenu dynamique */}
            <BottomSheet
              minHeight={258}
              maxHeight={500}
              initialHeight={280}
              onHeightChange={setBottomSheetHeight}
            >
              {renderBottomContent()}
            </BottomSheet>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  centerButton: {
    position: 'absolute',
    bottom: 59,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
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
    elevation: 3,
    zIndex: 0,
  },
  driverMarker: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
