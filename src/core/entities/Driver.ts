import { Location } from './Location';
import { Vehicle } from './Vehicle';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  rating: number;
  totalRides: number;
  photo?: string;
  vehicle: Vehicle;
  location: Location;
  isAvailable: boolean;
  isOnline?: boolean;
}

