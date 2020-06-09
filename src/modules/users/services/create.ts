import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/appError';
import User from '@modules/users/infra/typeorm/entities';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class Create {
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
