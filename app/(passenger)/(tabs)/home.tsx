import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { Kalam_700Bold } from '@expo-google-fonts/kalam';

const DESIGN_WIDTH = 375;

export default function HomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Kalam: Kalam_700Bold,
  });

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  const handleDestinationClick = () => {
    router.push('/(passenger)/booking/select-destination');
  };

  const handleMenuClick = () => {
    router.push('/(passenger)/menu');
  };

  const dynamicStyles = StyleSheet.create({
    headerContainer: {
      position: 'absolute',
      top: 40 * scale,
      left: 20 * scale,
      width: 230 * scale,
      height: 32 * scale,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 10,
    },
    menuIcon: {
      width: 25 * scale,
      height: 25 * scale,
      marginLeft: 10 * scale,
      fontSize: 28 * scale,
    },
    logo: {
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      fontSize: 20 * scale,
      lineHeight: 20 * scale, // 100%
      letterSpacing: 0,
      color: '#10B981',
      width: 100 * scale,
      height: 30 * scale,
    },
    title: {
      position: 'absolute',
      top: 118 * scale,
      left: 21 * scale,
      width: 335 * scale,
      height: 90 * scale,
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 28 * scale,
      lineHeight: 44.8 * scale, // 160%
      letterSpacing: 0,
      color: '#000000',
    },
    destinationInput: {
      position: 'absolute',
      top: 232 * scale,
      left: 20 * scale,
      width: 335 * scale,
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 20 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 10,
    },
    destinationInputText: {
      flex: 1,
      fontSize: 14 * scale,
      color: '#000000',
      fontFamily: 'Inter-Bold',
      marginLeft: 12 * scale,
    },
    mapContainer: {
      position: 'absolute',
      top: 322 * scale,
      left: 20 * scale,
      width: 335 * scale,
      height: 370 * scale,
      overflow: 'hidden',
      backgroundColor: '#FFFAFA',
      borderRadius: 23 * scale,
      borderWidth: 4 * scale,
      borderColor: '#10B981',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0* scale,
      width: 333 * scale,
      height: 323 * scale,
      borderRadius: 17 * scale,
      overflow: 'hidden',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: -3 * scale,
      left: -3 * scale,
      width: 337 * scale,
      height: 60 * scale,
      backgroundColor: '#10B981',
      borderBottomLeftRadius: 23 * scale,
      borderBottomRightRadius: 23 * scale,
    },
    buttonText: {
      position: 'absolute',
      top: 18 * scale, // 287 - 269 = 18px depuis le haut du buttonContainer
      left: 72 * scale, // 92px depuis l'écran - 20px du mapContainer = 72px depuis le mapContainer
      width: 190 * scale,
      height: 20 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      fontSize: 16 * scale,
      lineHeight: 20 * scale,
      color: '#000000',
      textAlign: 'center',
    },
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header avec menu et logo */}
        <View style={dynamicStyles.headerContainer}>
          <TouchableOpacity onPress={handleMenuClick} activeOpacity={0.8}>
            <Svg
              width={25 * scale}
              height={25 * scale}
              viewBox="0 0 25 25"
              style={dynamicStyles.menuIcon}
            >
              <Path
                d="M21.6797 12.5C21.6797 12.6554 21.618 12.8044 21.5081 12.9143C21.3982 13.0242 21.2492 13.0859 21.0938 13.0859H3.90625C3.75085 13.0859 3.60181 13.0242 3.49193 12.9143C3.38204 12.8044 3.32031 12.6554 3.32031 12.5C3.32031 12.3446 3.38204 12.1956 3.49193 12.0857C3.60181 11.9758 3.75085 11.9141 3.90625 11.9141H21.0938C21.2492 11.9141 21.3982 11.9758 21.5081 12.0857C21.618 12.1956 21.6797 12.3446 21.6797 12.5ZM3.90625 6.83594H21.0938C21.2492 6.83594 21.3982 6.7742 21.5081 6.66432C21.618 6.55444 21.6797 6.4054 21.6797 6.25C21.6797 6.0946 21.618 5.94556 21.5081 5.83568C21.3982 5.72579 21.2492 5.66406 21.0938 5.66406H3.90625C3.75085 5.66406 3.60181 5.72579 3.49193 5.83568C3.38204 5.94556 3.32031 6.0946 3.32031 6.25C3.32031 6.4054 3.38204 6.55444 3.49193 6.66432C3.60181 6.7742 3.75085 6.83594 3.90625 6.83594ZM21.0938 18.1641H3.90625C3.75085 18.1641 3.60181 18.2258 3.49193 18.3357C3.38204 18.4456 3.32031 18.5946 3.32031 18.75C3.32031 18.9054 3.38204 19.0544 3.49193 19.1643C3.60181 19.2742 3.75085 19.3359 3.90625 19.3359H21.0938C21.2492 19.3359 21.3982 19.2742 21.5081 19.1643C21.618 19.0544 21.6797 18.9054 21.6797 18.75C21.6797 18.5946 21.618 18.4456 21.5081 18.3357C21.3982 18.2258 21.2492 18.1641 21.0938 18.1641Z"
                fill="black"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={dynamicStyles.logo}>Kilis Kalas</Text>
        </View>

        {/* Titre */}
        <Text style={dynamicStyles.title}>Prêt pour votre prochain trajet ?</Text>

        {/* Input destination */}
        <TouchableOpacity
          style={dynamicStyles.destinationInput}
          onPress={handleDestinationClick}
          activeOpacity={0.8}
        >
          <Svg
            width={25 * scale}
            height={25 * scale}
            viewBox="0 0 25 25"
          >
            <Path
              d="M12.5 11.4583C14.8012 11.4583 16.6667 9.59285 16.6667 7.29167C16.6667 4.99048 14.8012 3.125 12.5 3.125C10.1988 3.125 8.33333 4.99048 8.33333 7.29167C8.33333 9.59285 10.1988 11.4583 12.5 11.4583Z"
              stroke="black"
              strokeWidth="1.5"
            />
            <Path
              d="M12.5 11.4584V18.75"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M16.5073 16.6666C18.2229 18.8677 19.0802 19.9687 18.6323 20.8395C18.5906 20.9201 18.542 20.9975 18.4865 21.0718C17.8875 21.875 16.3406 21.875 13.2469 21.875H11.7521C8.65833 21.875 7.1125 21.875 6.51354 21.0718C6.45863 20.9985 6.40985 20.9208 6.36771 20.8395C5.91979 19.9677 6.77708 18.8677 8.49271 16.6666"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={dynamicStyles.destinationInputText}>Choisir une destination</Text>
        </TouchableOpacity>

        {/* Carte */}
        <View style={dynamicStyles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={dynamicStyles.map}
            initialRegion={{
              latitude: 14.7167, // Bambey, Sénégal
              longitude: -16.4667,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation
            showsMyLocationButton={false}
          />
          {/* Conteneur du bouton "Définir sur la carte" */}
          <TouchableOpacity
            style={dynamicStyles.buttonContainer}
            onPress={handleDestinationClick}
            activeOpacity={0.8}
          >
            <Text style={dynamicStyles.buttonText}>Définir sur la Carte</Text>
          </TouchableOpacity>
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
