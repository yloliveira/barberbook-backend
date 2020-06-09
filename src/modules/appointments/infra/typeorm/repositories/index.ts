import Appointment from '@modules/appointments/infra/typeorm/entities';
import IRepository from '@modules/appointments/interfaces/IRepository';
import { getRepository, Repository } from 'typeorm';
import ICreateAppointment from '@modules/appointments/interfaces/ICreateAppointments';

export default class Appointments implements IRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment || undefined;
  }

  public async findByProviderId(provider_id: string): Promise<Appointment[]> {
    const findAppointments = await this.ormRepository.find({
      where: { provider_id },
    });
    return findAppointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}
