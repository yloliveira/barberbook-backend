import { Router } from 'express';

const routes = Router();

routes.post('/', async (req, res) => {
  try {
    return res.send();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;
