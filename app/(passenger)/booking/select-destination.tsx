import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackButton } from '@/presentation/components/common/BackButton';
import Svg, { Path, Circle } from 'react-native-svg';
import * as Location from 'expo-location';

const DESIGN_WIDTH = 375;

interface SearchResult {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    name: 'Léona, Bambey',
    address: 'Léona, Bambey, Sénégal',
    latitude: 14.7167,
    longitude: -16.4667,
  },
  {
    id: '2',
    name: 'wakhal Diame, Bambey',
    address: 'wakhal Diame, Bambey, Sénégal',
    latitude: 14.7200,
    longitude: -16.4700,
  },
];

export default function SelectDestinationScreen() {
  const router = useRouter();
  const [origin, setOrigin] = useState<string>('Ma position Actuelle');
  const [destination, setDestination] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<SearchResult | null>(null);
  const [isSelectingOrigin, setIsSelectingOrigin] = useState(false);

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filtrer les résultats de recherche
      const filtered = MOCK_SEARCH_RESULTS.filter(result =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(MOCK_SEARCH_RESULTS);
    }
  }, [searchQuery]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission de localisation refusée');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSelectedOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Erreur de localisation:', error);
    }
  };

  const handleShareCurrentLocation = async () => {
    await getCurrentLocation();
    setOrigin('Ma position Actuelle');
    setIsSelectingOrigin(false);
  };

  const handleSelectOrigin = () => {
    setIsSelectingOrigin(true);
    setOrigin('');
  };

  const handleSelectDestination = () => {
    setIsSelectingOrigin(false);
    // Focus sur le champ destination
  };

  const handleSelectResult = (result: SearchResult) => {
    if (isSelectingOrigin) {
      setOrigin(result.name);
      setSelectedOrigin({
        latitude: result.latitude,
        longitude: result.longitude,
      });
      setIsSelectingOrigin(false);
    } else {
      setDestination(result.name);
      setSelectedDestination(result);
      setSearchQuery('');
    }
  };

  const handleValidate = () => {
    if (selectedOrigin && selectedDestination) {
      router.push({
        pathname: '/(passenger)/booking/confirm-ride',
        params: {
          originLat: selectedOrigin.latitude.toString(),
          originLng: selectedOrigin.longitude.toString(),
          destinationLat: selectedDestination.latitude.toString(),
          destinationLng: selectedDestination.longitude.toString(),
          destinationAddress: selectedDestination.address,
        },
      });
    }
  };

  const dynamicStyles = StyleSheet.create({
    title: {
      position: 'absolute',
      top: 90 * scale,
      fontFamily: 'Outfit-SemiBold',
      fontSize: 24 * scale,
      fontWeight: '600',
      color: '#000000',
      textAlign: 'center',
      width: 403 * scale,
      height: 90 * scale,
      margin: 'auto',
    },
    routeContainer: {
      position: 'absolute',
      top: 159 * scale,
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      backgroundColor: '#F3F4F6',
      borderRadius: 12 * scale,
      padding: 16 * scale,
    },
    originInput: {
      width: '100%',
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: origin === 'Ma position Actuelle' ? '#E9D5FF' : '#F3F4F6',
      paddingHorizontal: 20 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8 * scale,
    },
    originInputText: {
      flex: 1,
      fontSize: 14 * scale,
      color: '#000000',
      fontFamily: 'Inter-Bold',
      marginLeft: 12 * scale,
    },
    destinationInput: {
      width: '100%',
      height: 50 * scale,
      borderRadius: 100 * scale,
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 20 * scale,
      flexDirection: 'row',
      alignItems: 'center',
    },
    destinationInputText: {
      flex: 1,
      fontSize: 14 * scale,
      color: destination ? '#000000' : '#9CA3AF',
      fontFamily: 'Inter-Bold',
      marginLeft: 12 * scale,
    },
    dottedLine: {
      position: 'absolute',
      left: 32 * scale, // Aligné avec les icônes
      top: 50 * scale,
      width: 2,
      height: 8 * scale,
    },
    shareLocationOption: {
      position: 'absolute',
      top: 280 * scale,
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      height: 40 * scale,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20 * scale,
    },
    shareLocationText: {
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      color: '#000000',
      marginLeft: 12 * scale,
    },
    searchResultsContainer: {
      position: 'absolute',
      top: 340 * scale,
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      maxHeight: 200 * scale,
    },
    searchResultsTitle: {
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      color: '#6B7280',
      marginBottom: 12 * scale,
    },
    searchResultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12 * scale,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    searchResultText: {
      fontSize: 14 * scale,
      fontFamily: 'Inter-Bold',
      fontWeight: '600',
      color: '#000000',
      marginLeft: 12 * scale,
      flex: 1,
    },
    validateButton: {
      position: 'absolute',
      bottom: 40 * scale,
      left: (SCREEN_WIDTH - 335 * scale) / 2, // Centré
      width: 335 * scale,
      height: 50 * scale,
      backgroundColor: '#10B981',
      borderRadius: 100 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    validateButtonText: {
      fontFamily: 'Outfit-SemiBold',
      fontWeight: '600',
      fontSize: 15 * scale,
      lineHeight: 20.8 * scale,
      letterSpacing: 0,
      color: '#FFFFFF',
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Bouton retour */}
        <BackButton
          top={40}
          left={20}
          size={50}
          arrowRotation={0}
          arrowSize={20}
        />

        {/* Titre */}
        <Text style={dynamicStyles.title}>Votre prochain trajet</Text>

        {/* Conteneur des champs de route */}
        <View style={dynamicStyles.routeContainer}>
          {/* Ligne pointillée */}
          <Svg
            style={dynamicStyles.dottedLine}
            height={8 * scale}
            width={2}
          >
            <Path
              d={`M 1 0 L 1 ${8 * scale}`}
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          </Svg>

          {/* Champ Origine */}
          <TouchableOpacity
            style={dynamicStyles.originInput}
            onPress={handleSelectOrigin}
            activeOpacity={0.8}
          >
            <Svg width={25 * scale} height={25 * scale} viewBox="0 0 25 25">
              <Circle cx="12.5" cy="12.5" r="8" fill="#9333EA" />
            </Svg>
            <TextInput
              style={dynamicStyles.originInputText}
              placeholder="Choisir une position"
              placeholderTextColor="#9CA3AF"
              value={origin}
              onChangeText={setOrigin}
              editable={isSelectingOrigin}
              onFocus={handleSelectOrigin}
            />
          </TouchableOpacity>

          {/* Champ Destination */}
          <TouchableOpacity
            style={dynamicStyles.destinationInput}
            onPress={handleSelectDestination}
            activeOpacity={0.8}
          >
            <Svg width={25 * scale} height={25 * scale} viewBox="0 0 25 25">
              <Path
                d="M12.5 11.4583C14.8012 11.4583 16.6667 9.59285 16.6667 7.29167C16.6667 4.99048 14.8012 3.125 12.5 3.125C10.1988 3.125 8.33333 4.99048 8.33333 7.29167C8.33333 9.59285 10.1988 11.4583 12.5 11.4583Z"
                stroke="#10B981"
                strokeWidth="1.5"
                fill="none"
              />
              <Path
                d="M12.5 11.4584V18.75"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <Path
                d="M16.5073 16.6666C18.2229 18.8677 19.0802 19.9687 18.6323 20.8395C18.5906 20.9201 18.542 20.9975 18.4865 21.0718C17.8875 21.875 16.3406 21.875 13.2469 21.875H11.7521C8.65833 21.875 7.1125 21.875 6.51354 21.0718C6.45863 20.9985 6.40985 20.9208 6.36771 20.8395C5.91979 19.9677 6.77708 18.8677 8.49271 16.6666"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
            <TextInput
              style={dynamicStyles.destinationInputText}
              placeholder="Choisir une destination"
              placeholderTextColor="#9CA3AF"
              value={destination || searchQuery}
              onChangeText={(text) => {
                setDestination(text);
                setSearchQuery(text);
              }}
              onFocus={handleSelectDestination}
            />
          </TouchableOpacity>
        </View>

        {/* Option Partager ma position actuelle */}
        {isSelectingOrigin && (
          <TouchableOpacity
            style={dynamicStyles.shareLocationOption}
            onPress={handleShareCurrentLocation}
            activeOpacity={0.8}
          >
            <Svg width={25 * scale} height={25 * scale} viewBox="0 0 25 25">
              <Path
                d="M12.5 11.4583C14.8012 11.4583 16.6667 9.59285 16.6667 7.29167C16.6667 4.99048 14.8012 3.125 12.5 3.125C10.1988 3.125 8.33333 4.99048 8.33333 7.29167C8.33333 9.59285 10.1988 11.4583 12.5 11.4583Z"
                stroke="#10B981"
                strokeWidth="1.5"
                fill="none"
              />
              <Path
                d="M12.5 11.4584V18.75"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <Path
                d="M16.5073 16.6666C18.2229 18.8677 19.0802 19.9687 18.6323 20.8395C18.5906 20.9201 18.542 20.9975 18.4865 21.0718C17.8875 21.875 16.3406 21.875 13.2469 21.875H11.7521C8.65833 21.875 7.1125 21.875 6.51354 21.0718C6.45863 20.9985 6.40985 20.9208 6.36771 20.8395C5.91979 19.9677 6.77708 18.8677 8.49271 16.6666"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
            <Text style={dynamicStyles.shareLocationText}>
              Partager ma position actuelle
            </Text>
          </TouchableOpacity>
        )}

        {/* Résultats de recherche */}
        {(searchQuery.length > 0 || searchResults.length > 0) && !isSelectingOrigin && (
          <ScrollView
            style={dynamicStyles.searchResultsContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={dynamicStyles.searchResultsTitle}>Résultat de recherche</Text>
            {searchResults.map((result) => (
              <TouchableOpacity
                key={result.id}
                style={dynamicStyles.searchResultItem}
                onPress={() => handleSelectResult(result)}
                activeOpacity={0.7}
              >
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
                <Text style={dynamicStyles.searchResultText}>{result.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Bouton Valider */}
        <TouchableOpacity
          style={[
            dynamicStyles.validateButton,
            (!selectedOrigin || !selectedDestination) && { opacity: 0.5 },
          ]}
          onPress={handleValidate}
          disabled={!selectedOrigin || !selectedDestination}
          activeOpacity={0.8}
        >
          <Text style={dynamicStyles.validateButtonText}>Valider</Text>
        </TouchableOpacity>
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
