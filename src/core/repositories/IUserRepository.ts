import { User } from '../entities';

export interface UpdateUserData {
  name?: string;
  email?: string;
  photo?: string;
}

export interface IUserRepository {
  getUserById(userId: string): Promise<User | null>;
  updateUser(userId: string, data: UpdateUserData): Promise<User>;
  deleteUser(userId: string): Promise<void>;
}

