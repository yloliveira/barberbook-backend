import Appointment from '../infra/typeorm/entities';
import IRepository from '../interfaces/IRepository';
import ICreateAppointment from '../interfaces/ICreateAppointments';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

export default class Appointments implements IRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointment;
  }

  public async findByProviderId(provider_id: string): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id,
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);
    return appointment;
  }
}
