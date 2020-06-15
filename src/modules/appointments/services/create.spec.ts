import Create from './create';
import Repository from '../mocks/Repository';
import AppError from '@shared/errors/appError';

describe('Create', () => {
  test('should be able to create a new appointment', async () => {
    const repository = new Repository();
    const create = new Create(repository);
    const appointment = await create.execute({
      provider_id: 'valid_provider_id',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('valid_provider_id');
  });

  test('should not be able to create a new appointment in same date', async () => {
    const repository = new Repository();
    const create = new Create(repository);
    const date = new Date();
    const provider_id = 'valid_provider_id';

    await create.execute({ provider_id, date });

    expect(create.execute({ provider_id, date })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
