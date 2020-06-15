import IRepository from '@modules/users/interfaces/IRepository';
import ICreateUser from '@modules/users/interfaces/ICreateUser';
import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities';

export default class UserRepository implements IRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user || undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user || undefined;
  }

  public async create(userData: ICreateUser): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
