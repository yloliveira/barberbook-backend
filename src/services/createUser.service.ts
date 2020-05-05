import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/appError';
import User from '../models/user.model';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User);

    const checkUserExists = await repository.findOne({ where: { email } });
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);
    const user = repository.create({ name, email, password: hashedPassword });
    await repository.save(user);
    return user;
  }
}
