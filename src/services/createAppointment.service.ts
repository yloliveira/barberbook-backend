import Appointment from '../models/appointment.model';
import AppointmentRepository from '../repositories/appointments.repository';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '../errors/appError';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await repository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = repository.create({
      provider_id,
      date: appointmentDate,
    });

    await repository.save(appointment);

    return appointment;
  }
}
