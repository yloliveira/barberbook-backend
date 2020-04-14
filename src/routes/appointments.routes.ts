import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments.repository';

const routes = Router();
const repository = new AppointmentRepository();

routes.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = repository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = repository.create(provider, parsedDate);

  return res.json(appointment);
});

export default routes;
