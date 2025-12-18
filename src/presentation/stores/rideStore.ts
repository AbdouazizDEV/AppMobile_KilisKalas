import { create } from 'zustand';
import { Ride, Location } from '@/core/entities';
import { RideRepository } from '@/data/repositories/RideRepository';
import { RequestRideUseCase, CancelRideUseCase, GetRideHistoryUseCase, RateRideUseCase } from '@/core/usecases/ride';

interface RideState {
  activeRide: Ride | null;
  rideHistory: Ride[];
  isLoading: boolean;
  error: string | null;
  requestRide: (params: {
    passengerId: string;
    pickup: Location;
    destination: Location;
    vehicleType: string;
    paymentMethod: string;
  }) => Promise<Ride>;
  cancelRide: (rideId: string, reason?: string) => Promise<void>;
  getRideHistory: (userId: string) => Promise<void>;
  rateRide: (rideId: string, rating: number, review?: string) => Promise<void>;
  getActiveRide: (userId: string) => Promise<void>;
  clearError: () => void;
}

const rideRepository = new RideRepository();
const requestRideUseCase = new RequestRideUseCase(rideRepository);
const cancelRideUseCase = new CancelRideUseCase(rideRepository);
const getRideHistoryUseCase = new GetRideHistoryUseCase(rideRepository);
const rateRideUseCase = new RateRideUseCase(rideRepository);

export const useRideStore = create<RideState>((set, get) => ({
  activeRide: null,
  rideHistory: [],
  isLoading: false,
  error: null,

  requestRide: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const ride = await requestRideUseCase.execute(params);
      set({ activeRide: ride, isLoading: false });
      return ride;
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la demande de course',
        isLoading: false,
      });
      throw error;
    }
  },

  cancelRide: async (rideId: string, reason?: string) => {
    set({ isLoading: true, error: null });
    try {
      await cancelRideUseCase.execute(rideId, reason);
      set({ activeRide: null, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de l\'annulation',
        isLoading: false,
      });
      throw error;
    }
  },

  getRideHistory: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const history = await getRideHistoryUseCase.execute(userId);
      set({ rideHistory: history, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement de l\'historique',
        isLoading: false,
      });
    }
  },

  rateRide: async (rideId: string, rating: number, review?: string) => {
    set({ isLoading: true, error: null });
    try {
      await rateRideUseCase.execute(rideId, rating, review);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de l\'évaluation',
        isLoading: false,
      });
      throw error;
    }
  },

  getActiveRide: async (userId: string) => {
    set({ isLoading: true });
    try {
      const ride = await rideRepository.getActiveRide(userId);
      set({ activeRide: ride, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

