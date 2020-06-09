import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/appError';

interface Request {
  user_id: string;
  avatar_filename: string;
}

export default class UpdateAvatarService {
  public async execute({ user_id, avatar_filename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change  avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar_filename;
    delete user.password;
    await userRepository.save(user);
    return user;
  }
}
