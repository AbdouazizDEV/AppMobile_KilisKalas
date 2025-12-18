import { IAuthRepository } from '../../repositories';

export class VerifyPhoneUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(phone: string, code: string): Promise<boolean> {
    if (!phone || !code) {
      throw new Error('Le numéro de téléphone et le code sont requis');
    }

    return await this.authRepository.verifyPhone(phone, code);
  }
}

