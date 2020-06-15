import Create from './create';
import Authenticate from './authenticate';
import Repository from '../mocks/Repository';

describe('Authenticate', () => {
  test('should be able to authenticate a registered user', async () => {
    const repository = new Repository();
    const create = new Create(repository);
    const authenticate = new Authenticate(repository);

    await create.execute({
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'valid_password',
    });

    const session = await authenticate.execute({
      email: 'valid@email.com',
      password: 'valid_password',
    });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
    expect(session.user).toHaveProperty('id');
    expect(session.user).toHaveProperty('email');
    expect(session.user.email).toBe('valid@email.com');
  });
});
