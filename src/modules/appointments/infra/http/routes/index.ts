import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '@modules/appointments/repositories';
import CreateService from '@modules/appointments/services/create';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentRepository);
  const { id: provider_id } = req.user;
  const appointments = await repository.find({ where: { provider_id } });
  return res.json(appointments);
});

routes.post('/', async (req, res) => {
  const { date } = req.body;
  const { id: provider_id } = req.user;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateService();
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default routes;
