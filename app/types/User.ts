import { UserRepository } from 'db';

export interface User {
  id: BigInt;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  token?: string;
  createdOn: Date;
}

export type RegisterUserRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>;
