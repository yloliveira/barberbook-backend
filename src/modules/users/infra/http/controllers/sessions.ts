import { Request, Response } from 'express';
import AuthenticateService from '@modules/users/services/authenticate';
import Repository from '@modules/users/infra/typeorm/repositories';

export default class Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const repository = new Repository();
    const createSession = new AuthenticateService(repository);
    const { email, password } = req.body;
    const session = await createSession.execute({ email, password });
    return res.json(session);
  }
}
