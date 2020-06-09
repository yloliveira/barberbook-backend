import { Router } from 'express';
import { parseISO } from 'date-fns';
import Repository from '@modules/appointments/infra/typeorm/repositories';
import CreateService from '@modules/appointments/services/create';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

const repository = new Repository();

routes.get('/', async (req, res) => {
  const { id: provider_id } = req.user;
  const appointments = await repository.findByProviderId(provider_id);
  return res.json(appointments);
});

routes.post('/', async (req, res) => {
  const { date } = req.body;
  const { id: provider_id } = req.user;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateService(repository);
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default routes;
