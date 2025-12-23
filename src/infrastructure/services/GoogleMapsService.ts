/**
 * Service pour interagir avec l'API Google Maps
 */

import Constants from 'expo-constants';

export interface RouteCoordinate {
  latitude: number;
  longitude: number;
}

export interface RouteResponse {
  coordinates: RouteCoordinate[];
  distance: string;
  duration: string;
}

/**
 * Décode une polyline encodée de Google Maps en coordonnées
 * Algorithme de décodage de polyline de Google
 */
function decodePolyline(encoded: string): RouteCoordinate[] {
  const coordinates: RouteCoordinate[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    // Décode latitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;

    // Décode longitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push({
      latitude: lat * 1e-5,
      longitude: lng * 1e-5,
    });
  }

  return coordinates;
}

/**
 * Obtient l'itinéraire réel entre deux points en utilisant l'API Google Maps Directions
 * @param origin - Coordonnées du point de départ
 * @param destination - Coordonnées du point d'arrivée
 * @param apiKey - Clé API Google Maps (optionnelle, peut être définie via variable d'environnement)
 * @returns Promise avec les coordonnées de l'itinéraire, la distance et la durée
 */
export async function getRoute(
  origin: RouteCoordinate,
  destination: RouteCoordinate,
  apiKey?: string
): Promise<RouteResponse> {
  // Utiliser la clé API fournie, celle de l'environnement Expo, ou celle de process.env
  const GOOGLE_MAPS_API_KEY =
    apiKey ||
    Constants.expoConfig?.extra?.googleMapsApiKey ||
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_MAPS_API_KEY) {
    console.warn(
      'Google Maps API key not found. Using straight line route as fallback.'
    );
    // Retourner une ligne droite si pas de clé API
    return {
      coordinates: [origin, destination],
      distance: 'N/A',
      duration: 'N/A',
    };
  }

  try {
    const originStr = `${origin.latitude},${origin.longitude}`;
    const destinationStr = `${destination.latitude},${destination.longitude}`;

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=${GOOGLE_MAPS_API_KEY}&language=fr`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
      console.warn('Google Maps Directions API error:', data.status);
      // Retourner une ligne droite en cas d'erreur
      return {
        coordinates: [origin, destination],
        distance: 'N/A',
        duration: 'N/A',
      };
    }

    const route = data.routes[0];
    const leg = route.legs[0];
    const polyline = route.overview_polyline.points;

    // Décoder la polyline pour obtenir les coordonnées
    const coordinates = decodePolyline(polyline);

    return {
      coordinates,
      distance: leg.distance?.text || 'N/A',
      duration: leg.duration?.text || 'N/A',
    };
  } catch (error) {
    console.error('Error fetching route from Google Maps:', error);
    // Retourner une ligne droite en cas d'erreur
    return {
      coordinates: [origin, destination],
      distance: 'N/A',
      duration: 'N/A',
    };
  }
}

/**
 * Obtient les coordonnées d'une adresse (geocoding)
 * @param address - Adresse à géocoder
 * @param apiKey - Clé API Google Maps (optionnelle)
 * @returns Promise avec les coordonnées
 */
export async function geocodeAddress(
  address: string,
  apiKey?: string
): Promise<RouteCoordinate | null> {
  const GOOGLE_MAPS_API_KEY =
    apiKey ||
    Constants.expoConfig?.extra?.googleMapsApiKey ||
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key not found for geocoding.');
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}&language=fr`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.warn('Geocoding error:', data.status);
      return null;
    }

    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

