import { IAuthRepository, LoginCredentials, AuthResponse } from '../../repositories';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!credentials.phone) {
      throw new Error('Le numéro de téléphone est requis');
    }

    return await this.authRepository.login(credentials);
  }
}

