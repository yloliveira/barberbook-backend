import Create from './create';
import Repository from '../mocks/Repository';
import AppError from '@shared/errors/appError';

describe('Create', () => {
  test('should be able to create a new user', async () => {
    const repository = new Repository();
    const create = new Create(repository);
    const user = await create.execute({
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'valid_password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('valid_name');
    expect(user.email).toBe('valid@email.com');
  });

  test('should not be able to create a new user with email address already used', async () => {
    const repository = new Repository();
    const create = new Create(repository);
    const user = {
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'valid_password',
    };

    await create.execute(user);

    expect(create.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
