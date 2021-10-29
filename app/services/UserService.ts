import { Inject, Service } from 'typedi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../config';
import { UserRepository } from '../db';
import { ValidationError } from '../errors';
import { RegisterUserRequest, User } from '../types';

@Service()
export class UserService {
  @Inject()
  userRepo!: UserRepository;

  public async register(input: RegisterUserRequest): Promise<User> {
    this.validateRegistration(input);
    const existingUser = await this.userRepo.getByEmail(input.email);
    if (existingUser) {
      throw Error(`User with email "${input.email}" already exists`);
    }

    input.password = await this.encryptPassword(input.password as string);

    const user = await this.userRepo.insert(input);
    user.token = this.getToken(user);

    return user;
  }

  public async login(input: { email: string; password: string }) {
    const user = await this.userRepo.getByEmail(input.email);
    if (!user) {
      throw Error(`No user found with email "${input.email}""`);
    }

    if (!(await this.isValidPassword(input.password, user.password as string))) {
      throw Error('Invalid password');
    }

    user.token = this.getToken(user);

    this.userRepo.update(user.id, { lastLoggedInOn: new Date().toISOString() });

    return user;
  }

  private validateRegistration(input: RegisterUserRequest) {
    const validators: [boolean, string][] = [
      [Boolean(input.email && input.email.length > 3), 'invalid e-mail'],
      [Boolean(input.firstName), 'invalid first name'],
      [Boolean(input.lastName), 'invalid last name'],
      [Boolean(input.password && input.password.length >= 6), 'invalid password']
    ];

    const errors = validators.filter(([isValid]) => isValid === false);
    if (errors.length) {
      throw new ValidationError(errors.map(([, message]) => message).join(';'));
    }
  }

  private encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private getToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      auth.tokenKey,
      { expiresIn: '2h' }
    );
  }

  private isValidPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
