import { IRideRepository, RequestRideParams } from '@/core/repositories';
import { Ride, RideStatus } from '@/core/entities';
import { MOCK_RIDES } from '../datasources/mock/MockRideData';
import { MOCK_DRIVERS } from '../datasources/mock/MockDriverData';

export class RideRepository implements IRideRepository {
  private rides: Ride[] = [...MOCK_RIDES];

  async requestRide(params: RequestRideParams): Promise<Ride> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Trouver un chauffeur disponible
    const availableDriver = MOCK_DRIVERS.find(d => d.isAvailable && d.isOnline);
    
    if (!availableDriver) {
      throw new Error('Aucun chauffeur disponible pour le moment');
    }

    const newRide: Ride = {
      id: `ride${Date.now()}`,
      passengerId: params.passengerId,
      driverId: availableDriver.id,
      driver: availableDriver,
      status: 'searching',
      pickup: params.pickup,
      destination: params.destination,
      estimatedPrice: this.calculatePrice(params.pickup, params.destination, params.vehicleType),
      estimatedDuration: this.calculateDuration(params.pickup, params.destination),
      distance: this.calculateDistance(params.pickup, params.destination),
      paymentMethod: params.paymentMethod as any,
      createdAt: new Date(),
    };

    this.rides.unshift(newRide);
    return newRide;
  }

  async cancelRide(rideId: string, reason?: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const ride = this.rides.find(r => r.id === rideId);
    if (ride) {
      ride.status = 'cancelled';
      ride.cancelledAt = new Date();
    }
  }

  async getRideById(rideId: string): Promise<Ride | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.rides.find(r => r.id === rideId) || null;
  }

  async getRideHistory(userId: string, limit = 20, offset = 0): Promise<Ride[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.rides
      .filter(r => r.passengerId === userId)
      .slice(offset, offset + limit);
  }

  async rateRide(rideId: string, rating: number, review?: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const ride = this.rides.find(r => r.id === rideId);
    if (ride) {
      ride.rating = rating;
      ride.review = review;
    }
  }

  async getActiveRide(userId: string): Promise<Ride | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.rides.find(
      r => r.passengerId === userId && 
      ['pending', 'searching', 'driver_found', 'accepted', 'in_progress'].includes(r.status)
    ) || null;
  }

  private calculatePrice(pickup: any, destination: any, vehicleType: string): number {
    const basePrice = 1000;
    const pricePerKm = vehicleType === 'premium' ? 2000 : vehicleType === 'xl' ? 1500 : 1000;
    const distance = this.calculateDistance(pickup, destination);
    return Math.round(basePrice + (distance * pricePerKm));
  }

  private calculateDuration(pickup: any, destination: any): number {
    const distance = this.calculateDistance(pickup, destination);
    const avgSpeed = 30; // km/h
    return Math.round((distance / avgSpeed) * 60); // en minutes
  }

  private calculateDistance(from: any, to: any): number {
    // Formule de Haversine simplifiée
    const R = 6371; // Rayon de la Terre en km
    const dLat = (to.latitude - from.latitude) * Math.PI / 180;
    const dLon = (to.longitude - from.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(from.latitude * Math.PI / 180) * Math.cos(to.latitude * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Arrondi à 1 décimale
  }
}

