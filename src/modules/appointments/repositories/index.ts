import Appointment from '@modules/appointments/infra/typeorm/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
export default class Appointments extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}
