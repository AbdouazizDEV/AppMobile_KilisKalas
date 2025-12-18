export type VehicleType = 'standard' | 'premium' | 'xl' | 'motorcycle';

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  photo?: string;
}

