import { Router } from 'express';
import { uuid } from 'uuidv4';

const routes = Router();

const appointments = [];

routes.post('/', (req, res) => {
  const { provider, data } = req.body;
  const appointment = {
    id: uuid(),
    provider,
    data,
  };
  appointments.push(appointment);
  return res.json(appointment);
});

export default routes;
