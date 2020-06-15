import User from '@modules/users/infra/typeorm/entities';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/appError';
import IRepository from '@modules/users/interfaces/IRepository';
import IHashProvider from '@modules/users/interfaces/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

export default class Authenticate {
  constructor(
    private repository: IRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
