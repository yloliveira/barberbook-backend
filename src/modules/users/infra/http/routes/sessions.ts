import { Router } from 'express';
import Controller from '@modules/users/infra/http/controllers/sessions';

const routes = Router();
const controller = new Controller();

routes.post('/', controller.create);

export default routes;
