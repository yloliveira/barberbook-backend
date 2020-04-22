import Appointment from '../models/appointment.model';
import AppointmentRepository from '../repositories/appointments.repository';
import { startOfHour } from 'date-fns';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private repository: AppointmentRepository;
  constructor(repository: AppointmentRepository) {
    this.repository = repository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.repository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.repository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
