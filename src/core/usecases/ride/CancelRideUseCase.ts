import { IRideRepository } from '../../repositories';

export class CancelRideUseCase {
  constructor(private rideRepository: IRideRepository) {}

  async execute(rideId: string, reason?: string): Promise<void> {
    if (!rideId) {
      throw new Error('L\'ID de la course est requis');
    }

    await this.rideRepository.cancelRide(rideId, reason);
  }
}

