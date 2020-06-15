import { Request, Response } from 'express';
import Repository from '@modules/appointments/infra/typeorm/repositories';
import { parseISO } from 'date-fns';
import CreateService from '@modules/appointments/services/create';

export default class Controller {
  public async list(req: Request, res: Response): Promise<Response> {
    const repository = new Repository();
    const { id: provider_id } = req.user;
    const appointments = await repository.findByProviderId(provider_id);
    return res.json(appointments);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const repository = new Repository();
    const { date } = req.body;
    const { id: provider_id } = req.user;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateService(repository);
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    return res.json(appointment);
  }
}
