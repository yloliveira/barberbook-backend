import Create from './create';
import Repository from '../mocks/Repository';

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
});
