import { Router } from 'express';
import CreateUserService from '@modules/users/services/create';
import UpdateAvatarService from '@modules/users/services/updateAvatar';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (req, res) => {
  const createUser = new CreateUserService();
  const user = await createUser.execute(req.body);
  delete user.password;
  return res.json(user);
});

routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatar_filename: req.file.filename,
    });
    return res.json({ user });
  },
);

export default routes;
