export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

export interface LocationWithAddress extends Location {
  address: string;
}

