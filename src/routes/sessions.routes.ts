import { Router } from 'express';
import CreateSessionService from '../services/createSession.service';

const routes = Router();

routes.post('/', async (req, res) => {
  const createSession = new CreateSessionService();
  const { email, password } = req.body;
  const session = await createSession.execute({ email, password });
  return res.json(session);
});

export default routes;
