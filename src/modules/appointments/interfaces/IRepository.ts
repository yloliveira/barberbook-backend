import Appointment from '@modules/appointments/infra/typeorm/entities';
import ICreateAppointment from '@modules/appointments/interfaces/ICreateAppointments';

export default interface IRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByProviderId(provider_id: string): Promise<Appointment[]>;
  create(data: ICreateAppointment): Promise<Appointment>;
}
