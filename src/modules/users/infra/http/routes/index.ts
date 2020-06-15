import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import Controller from '@modules/users/infra/http/controllers';

const routes = Router();
const upload = multer(uploadConfig);
const controller = new Controller();

routes.post('/', controller.create);

routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  controller.updateAvatar,
);

export default routes;
