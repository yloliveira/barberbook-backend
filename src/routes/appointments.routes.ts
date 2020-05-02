import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments.repository';
import CreateService from '../services/createAppointment.service';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentRepository);
  const { id: provider_id } = req.user;
  const appointments = await repository.find({ where: { provider_id } });
  return res.json(appointments);
});

routes.post('/', async (req, res) => {
  try {
    const { date } = req.body;
    const { id: provider_id } = req.user;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateService();
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;
