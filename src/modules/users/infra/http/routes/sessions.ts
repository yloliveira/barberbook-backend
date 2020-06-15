import { Router } from 'express';
import AuthenticateService from '@modules/users/services/authenticate';
import Repository from '@modules/users/infra/typeorm/repositories';

const routes = Router();

routes.post('/', async (req, res) => {
  const repository = new Repository();
  const createSession = new AuthenticateService(repository);
  const { email, password } = req.body;
  const session = await createSession.execute({ email, password });
  return res.json(session);
});

export default routes;
