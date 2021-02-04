import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password?: string;
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email address already used.');

    const hashedPassword = await hash(password || '', 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}