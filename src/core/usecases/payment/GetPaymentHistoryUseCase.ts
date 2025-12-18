import { IPaymentRepository } from '../../repositories';
import { Payment } from '../../entities';

export class GetPaymentHistoryUseCase {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(userId: string, limit = 20, offset = 0): Promise<Payment[]> {
    if (!userId) {
      throw new Error('L\'ID utilisateur est requis');
    }

    return await this.paymentRepository.getPaymentHistory(userId, limit, offset);
  }
}

