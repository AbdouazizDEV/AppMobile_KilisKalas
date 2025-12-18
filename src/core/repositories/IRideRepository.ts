import { Ride, Location } from '../entities';

export interface RequestRideParams {
  passengerId: string;
  pickup: Location;
  destination: Location;
  vehicleType: string;
  paymentMethod: string;
}

export interface IRideRepository {
  requestRide(params: RequestRideParams): Promise<Ride>;
  cancelRide(rideId: string, reason?: string): Promise<void>;
  getRideById(rideId: string): Promise<Ride | null>;
  getRideHistory(userId: string, limit?: number, offset?: number): Promise<Ride[]>;
  rateRide(rideId: string, rating: number, review?: string): Promise<void>;
  getActiveRide(userId: string): Promise<Ride | null>;
}

