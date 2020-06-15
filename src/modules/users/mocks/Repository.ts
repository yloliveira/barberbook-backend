import IRepository from '../interfaces/IRepository';
import ICreateUser from '../interfaces/ICreateUser';
import User from '../infra/typeorm/entities';
import { uuid } from 'uuidv4';

export default class UserRepository implements IRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async create(userData: ICreateUser): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...userData });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(({ id }) => id === user.id);
    this.users[userIndex] = user;
    return user;
  }
}
