import { IRideRepository, RequestRideParams } from '../../repositories';
import { Ride } from '../../entities';

export class RequestRideUseCase {
  constructor(private rideRepository: IRideRepository) {}

  async execute(params: RequestRideParams): Promise<Ride> {
    if (!params.passengerId || !params.pickup || !params.destination) {
      throw new Error('Les informations de course sont incomplètes');
    }

    return await this.rideRepository.requestRide(params);
  }
}

