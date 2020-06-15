import { Router } from 'express';
import Controller from '@modules/appointments/infra/http/controllers';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const routes = Router();
const controller = new Controller();
routes.use(ensureAuthenticated);

routes.get('/', controller.list);

routes.post('/', controller.create);

export default routes;
