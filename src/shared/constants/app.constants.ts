export const APP_NAME = 'KilisKalas';
export const APP_VERSION = '1.0.0';

export const DEFAULT_LOCATION = {
  latitude: 14.7167, // Bambey, Sénégal
  longitude: -16.4667,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const VEHICLE_TYPES = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
  XL: 'xl',
  MOTORCYCLE: 'motorcycle',
} as const;

export const PAYMENT_METHODS = {
  CASH: 'cash',
  ORANGE_MONEY: 'orange_money',
  WAVE: 'wave',
  CARD: 'card',
} as const;

export const RIDE_STATUS = {
  PENDING: 'pending',
  SEARCHING: 'searching',
  DRIVER_FOUND: 'driver_found',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

