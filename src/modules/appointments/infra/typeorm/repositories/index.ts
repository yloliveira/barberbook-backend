import Appointment from '@modules/appointments/infra/typeorm/entities';
import IRepository from '@modules/appointments/interfaces/IRepository';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
export default class Appointments extends Repository<Appointment>
  implements IRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || undefined;
  }
}
