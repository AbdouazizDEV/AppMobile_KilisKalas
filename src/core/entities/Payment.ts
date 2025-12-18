export type PaymentMethod = 'cash' | 'orange_money' | 'wave' | 'card';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  rideId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  completedAt?: Date;
}

