export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  token?: string;
  createdOn: Date;
  lastLoggedInOn?: Date | string;
  iat?: number;
  exp?: number;
}

export type RegisterUserRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>;
