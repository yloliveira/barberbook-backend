import AppError from '@shared/errors/appError';
import User from '@modules/users/infra/typeorm/entities';
import IRepository from '@modules/users/interfaces/IRepository';
import IHashProvider from '@modules/users/interfaces/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class Create {
  constructor(
    private repository: IRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.repository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
