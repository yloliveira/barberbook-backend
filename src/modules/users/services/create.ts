import { hash } from 'bcryptjs';
import AppError from '@shared/errors/appError';
import User from '@modules/users/infra/typeorm/entities';
import IRepository from '@modules/users/interfaces/IRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class Create {
  constructor(private repository: IRepository) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.repository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
