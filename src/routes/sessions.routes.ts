import { Router } from 'express';
import CreateSessionService from '../services/createSession.service';

const routes = Router();

routes.post('/', async (req, res) => {
  try {
    const createSession = new CreateSessionService();
    const { email, password } = req.body;
    const session = await createSession.execute({ email, password });
    return res.json(session);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;