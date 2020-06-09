import { Router } from 'express';
import CreateService from '@modules/sessions/services/create';

const routes = Router();

routes.post('/', async (req, res) => {
  const createSession = new CreateService();
  const { email, password } = req.body;
  const session = await createSession.execute({ email, password });
  return res.json(session);
});

export default routes;
