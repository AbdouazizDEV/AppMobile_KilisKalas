import { IAuthRepository, RegisterData, AuthResponse } from '../../repositories';

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: RegisterData): Promise<AuthResponse> {
    if (!data.name || !data.phone) {
      throw new Error('Le nom et le numéro de téléphone sont requis');
    }

    return await this.authRepository.register(data);
  }
}

