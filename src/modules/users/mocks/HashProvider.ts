import IHashProvider from '../interfaces/IHashProvider';

export default class HashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return payload;
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
