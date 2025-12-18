import { User } from '@/core/entities';

export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    name: 'Amadou Diallo',
    phone: '+221771111111',
    email: 'amadou@example.com',
    photo: 'https://i.pravatar.cc/150?img=1',
    role: 'passenger',
    isVerified: true,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00'),
  },
];

