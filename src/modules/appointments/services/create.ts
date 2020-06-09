import Appointment from '@modules/appointments/infra/typeorm/entities';
import AppointmentRepository from '@modules/appointments/repositories';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/appError';

interface Request {
  provider_id: string;
  date: Date;
}

export default class Create {
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
