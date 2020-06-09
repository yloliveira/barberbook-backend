import Appointment from '@modules/appointments/infra/typeorm/entities';
import IRepository from '@modules/appointments/interfaces/IRepository';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/appError';
import ICreateRequest from '@modules/appointments/interfaces/ICreateRequest';

export default class Create {
  constructor(private repository: IRepository) {}

  public async execute({
    date,
    provider_id,
  }: ICreateRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.repository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
