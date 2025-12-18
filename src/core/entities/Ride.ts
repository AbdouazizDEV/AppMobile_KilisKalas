import { Location } from './Location';
import { Driver } from './Driver';
import { PaymentMethod } from './Payment';

export type RideStatus = 
  | 'pending' 
  | 'searching' 
  | 'driver_found' 
  | 'accepted' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  driver?: Driver;
  status: RideStatus;
  pickup: Location;
  destination: Location;
  estimatedPrice: number;
  finalPrice?: number;
  estimatedDuration: number; // en minutes
  actualDuration?: number; // en minutes
  distance: number; // en km
  paymentMethod: PaymentMethod;
  createdAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  rating?: number;
  review?: string;
}

