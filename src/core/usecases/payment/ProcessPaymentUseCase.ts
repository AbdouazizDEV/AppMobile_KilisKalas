import { IPaymentRepository, ProcessPaymentParams } from '../../repositories';
import { Payment } from '../../entities';

export class ProcessPaymentUseCase {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(params: ProcessPaymentParams): Promise<Payment> {
    if (!params.rideId || !params.amount || !params.method) {
      throw new Error('Les informations de paiement sont incomplètes');
    }

    if (params.amount <= 0) {
      throw new Error('Le montant doit être supérieur à 0');
    }

    return await this.paymentRepository.processPayment(params);
  }
}

