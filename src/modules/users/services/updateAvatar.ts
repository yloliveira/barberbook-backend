import User from '@modules/users/infra/typeorm/entities';
import AppError from '@shared/errors/appError';
import IRepository from '@modules/users/interfaces/IRepository';
import IStorageProvider from '@shared/interfaces/IStorageProvider';

interface Request {
  user_id: string;
  avatar_filename: string;
}

export default class UpdateAvatar {
  constructor(
    private repository: IRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatar_filename }: Request): Promise<User> {
    const user = await this.repository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change  avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar_filename);

    user.avatar = filename;
    await this.repository.save(user);
    return user;
  }
}
