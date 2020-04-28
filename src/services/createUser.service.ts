import { getRepository } from 'typeorm';

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
      throw new Error('Email address already used');
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);
    return user;
  }
}
