import { IRideRepository } from '../../repositories';
import { Ride } from '../../entities';

export class GetRideHistoryUseCase {
  constructor(private rideRepository: IRideRepository) {}

  async execute(userId: string, limit = 20, offset = 0): Promise<Ride[]> {
    if (!userId) {
      throw new Error('L\'ID utilisateur est requis');
    }

    return await this.rideRepository.getRideHistory(userId, limit, offset);
  }
}

