import Appointment from '@modules/appointments/infra/typeorm/entities';

export default interface IRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
