import { IAuthRepository, LoginCredentials, RegisterData, AuthResponse } from '@/core/repositories';
import { User } from '@/core/entities';
import { MOCK_USERS } from '../datasources/mock/MockUserData';
import { MOCK_OTP_CODES, MOCK_PASSWORDS, MOCK_TOKENS } from '../datasources/mock/MockAuthData';
import { AsyncStorageService } from '../datasources/local/AsyncStorageService';

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(u => u.phone === credentials.phone);
    
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérifier le mot de passe si fourni
    if (credentials.password) {
      const expectedPassword = MOCK_PASSWORDS[credentials.phone];
      if (expectedPassword && expectedPassword !== credentials.password) {
        throw new Error('Mot de passe incorrect');
      }
    }

    const token = MOCK_TOKENS[user.id] || 'mock_token';
    
    // Sauvegarder le token
    await AsyncStorageService.setItem('auth_token', token);
    await AsyncStorageService.setItem('user_id', user.id);

    return {
      user,
      token,
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `user${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: 'passenger',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const token = `mock_token_${newUser.id}`;
    
    await AsyncStorageService.setItem('auth_token', token);
    await AsyncStorageService.setItem('user_id', newUser.id);

    return {
      user: newUser,
      token,
    };
  }

  async verifyPhone(phone: string, code: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const expectedCode = MOCK_OTP_CODES[phone];
    return expectedCode === code;
  }

  async sendOTP(phone: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En production, cela enverrait un vrai SMS
    console.log(`OTP envoyé à ${phone}: ${MOCK_OTP_CODES[phone] || '1234'}`);
  }

  async logout(): Promise<void> {
    await AsyncStorageService.removeItem('auth_token');
    await AsyncStorageService.removeItem('user_id');
  }

  async refreshToken(refreshToken: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'new_mock_token';
  }

  async getCurrentUser(): Promise<User | null> {
    const userId = await AsyncStorageService.getItem('user_id');
    if (!userId) return null;

    return MOCK_USERS.find(u => u.id === userId) || null;
  }
}

