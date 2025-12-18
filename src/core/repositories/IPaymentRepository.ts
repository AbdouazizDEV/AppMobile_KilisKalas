import { Payment, PaymentMethod } from '../entities';

export interface ProcessPaymentParams {
  rideId: string;
  amount: number;
  method: PaymentMethod;
}

export interface IPaymentRepository {
  processPayment(params: ProcessPaymentParams): Promise<Payment>;
  getPaymentHistory(userId: string, limit?: number, offset?: number): Promise<Payment[]>;
  getPaymentById(paymentId: string): Promise<Payment | null>;
  refundPayment(paymentId: string): Promise<Payment>;
}

