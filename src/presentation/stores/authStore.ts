import { create } from 'zustand';
import { User } from '@/core/entities';
import { AuthRepository } from '@/data/repositories/AuthRepository';
import { LoginUseCase, RegisterUseCase, VerifyPhoneUseCase } from '@/core/usecases/auth';
import { AsyncStorageService } from '@/data/datasources/local/AsyncStorageService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (phone: string, password?: string) => Promise<void>;
  register: (name: string, phone: string, email?: string) => Promise<void>;
  verifyPhone: (phone: string, code: string) => Promise<boolean>;
  sendOTP: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const authRepository = new AuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const verifyPhoneUseCase = new VerifyPhoneUseCase(authRepository);

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (phone: string, password?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginUseCase.execute({ phone, password });
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la connexion',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (name: string, phone: string, email?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await registerUseCase.execute({ name, phone, email });
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de l\'inscription',
        isLoading: false,
      });
      throw error;
    }
  },

  verifyPhone: async (phone: string, code: string) => {
    set({ isLoading: true, error: null });
    try {
      const isValid = await verifyPhoneUseCase.execute(phone, code);
      set({ isLoading: false });
      return isValid;
    } catch (error: any) {
      set({
        error: error.message || 'Code invalide',
        isLoading: false,
      });
      throw error;
    }
  },

  sendOTP: async (phone: string) => {
    set({ isLoading: true, error: null });
    try {
      await authRepository.sendOTP(phone);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de l\'envoi du code',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authRepository.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la déconnexion',
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorageService.getItem('auth_token');
      if (token) {
        const user = await authRepository.getCurrentUser();
        if (user) {
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      }
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

