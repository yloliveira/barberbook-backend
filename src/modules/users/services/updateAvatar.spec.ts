import UpdateAvatar from './updateAvatar';
import Create from './create';
import Repository from '../mocks/Repository';
import AppError from '@shared/errors/appError';
import HashProvider from '../mocks/HashProvider';
import StorageProvider from '@shared/mocks/StorageProvider';

describe('UpdateAvatar', () => {
  test('should be able to update avatar', async () => {
    const repository = new Repository();
    const storage = new StorageProvider();
    const hashProvider = new HashProvider();
    const create = new Create(repository, hashProvider);
    const updateAvatar = new UpdateAvatar(repository, storage);

    const user = await create.execute({
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'valid_password',
    });

    const avatar = await updateAvatar.execute({
      user_id: user.id,
      avatar_filename: 'valid_filename.jpg',
    });

    expect(avatar).toEqual({ ...user, avatar: 'valid_filename.jpg' });
  });
});
