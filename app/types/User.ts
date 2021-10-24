import { UserRepository } from 'db';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  token?: string;
  createdOn: Date;
  iat?: number;
  exp?: number;
}

export type RegisterUserRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>;
