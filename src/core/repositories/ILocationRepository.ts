import { Location } from '../entities';

export interface ILocationRepository {
  getCurrentLocation(): Promise<Location>;
  getAddressFromCoordinates(location: Location): Promise<string>;
  getCoordinatesFromAddress(address: string): Promise<Location>;
  calculateDistance(from: Location, to: Location): Promise<number>; // en km
  calculateEstimatedTime(distance: number): Promise<number>; // en minutes
}

