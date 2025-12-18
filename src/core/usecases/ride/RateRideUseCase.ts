import { IRideRepository } from '../../repositories';

export class RateRideUseCase {
  constructor(private rideRepository: IRideRepository) {}

  async execute(rideId: string, rating: number, review?: string): Promise<void> {
    if (!rideId) {
      throw new Error('L\'ID de la course est requis');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('La note doit être entre 1 et 5');
    }

    await this.rideRepository.rateRide(rideId, rating, review);
  }
}

