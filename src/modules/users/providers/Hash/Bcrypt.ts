import IHashProvider from '@modules/users/interfaces/IHashProvider';
import { hash, compare } from 'bcryptjs';

export default class BcryptHashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
