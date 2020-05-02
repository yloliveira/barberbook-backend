import User from '../models/user.model';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
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

    const token = sign({}, '2682dcd5ff94d9cbc22a077563959c49', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
