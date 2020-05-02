import User from '../models/user.model';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
}

export default class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const repository = getRepository(User);
    const user = await repository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    delete user.password;
    return { user };
  }
}
