export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  fullAddress: string;
}

