import User from '@modules/users/infra/typeorm/entities';
import ICreateUser from '@modules/users/interfaces/ICreateUser';

export default interface IRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUser): Promise<User>;
  save(data: User): Promise<User>;
}
