import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '(auth)': NavigatorScreenParams<AuthStackParamList>;
  '(passenger)': NavigatorScreenParams<PassengerStackParamList>;
  '(driver)': NavigatorScreenParams<DriverStackParamList>;
  '(admin)': NavigatorScreenParams<AdminStackParamList>;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  'verify-phone': { phone: string };
  'forgot-password': undefined;
};

export type PassengerStackParamList = {
  '(tabs)': NavigatorScreenParams<PassengerTabsParamList>;
  booking: NavigatorScreenParams<BookingStackParamList>;
  'ride-details': { id: string };
};

export type PassengerTabsParamList = {
  home: undefined;
  activity: undefined;
  wallet: undefined;
  profile: undefined;
};

export type BookingStackParamList = {
  'select-destination': undefined;
  'confirm-ride': {
    destinationLat: string;
    destinationLng: string;
    destinationAddress: string;
    originLat?: string;
    originLng?: string;
    selectedMethod?: string;
    vehicleType?: string;
  };
  'payment-method': {
    selectedMethod?: string;
    originLat?: string;
    originLng?: string;
    destinationLat?: string;
    destinationLng?: string;
    destinationAddress?: string;
    vehicleType?: string;
  };
  'chat': {
    driverId: string;
    driverName: string;
    driverPhoto?: string;
    driverPhone: string;
  };
};

export type DriverStackParamList = {
  index: undefined;
};

export type AdminStackParamList = {
  index: undefined;
};

