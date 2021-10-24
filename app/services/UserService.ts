import { Inject, Service } from 'typedi';
import { UserRepository } from '../db';
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
    const user = await this.userRepo.insert(input);
    return user;
  }

  public validateRegistration(input: RegisterUserRequest) {
    const validators: [boolean, string][] = [
      [Boolean(input.email && input.email.length > 3), 'invalid e-mail'],
      [Boolean(input.firstName), 'invalid first name'],
      [Boolean(input.lastName), 'invalid last name'],
      [Boolean(input.password && input.password.length >= 6), 'invalid password']
    ];

    const errors = validators.filter(([isValid]) => isValid === false);
    if (errors.length) {
      throw Error(errors.map(([, message]) => message).join(';'));
    }
  }
}
