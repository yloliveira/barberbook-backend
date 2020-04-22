import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments.repository';
import CreateService from '../services/createAppointment.service';

const routes = Router();
const repository = new AppointmentRepository();

routes.get('/', (req, res) => {
  const appointments = repository.all();
  return res.json(appointments);
});

routes.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateService(repository);
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;
