import { Request, Response } from 'express';
import Repository from '@modules/users/infra/typeorm/repositories';
import CreateService from '@modules/users/services/create';
import UpdateAvatarService from '@modules/users/services/updateAvatar';

export default class Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const repository = new Repository();
    const createUser = new CreateService(repository);
    const user = await createUser.execute(req.body);
    delete user.password;
    return res.json(user);
  }

  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const repository = new Repository();
    const updateUserAvatar = new UpdateAvatarService(repository);
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatar_filename: req.file.filename,
    });
    delete user.password;
    return res.json({ user });
  }
}
