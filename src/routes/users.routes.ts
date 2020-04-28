import { Router } from 'express';
import CreateUserService from '../services/createUser.service';

const routes = Router();

routes.post('/', async (req, res) => {
  try {
    const createUser = new CreateUserService();
    const user = await createUser.execute(req.body);
    delete user.password;
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;