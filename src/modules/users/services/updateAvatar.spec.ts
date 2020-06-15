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

  test('should not be able to update avatar from non existing user', async () => {
    const repository = new Repository();
    const storage = new StorageProvider();
    const updateAvatar = new UpdateAvatar(repository, storage);

    expect(
      updateAvatar.execute({
        user_id: 'invalid_id',
        avatar_filename: 'valid_filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should delete old avatar when updating new one', async () => {
    const repository = new Repository();
    const storage = new StorageProvider();
    const hashProvider = new HashProvider();
    const create = new Create(repository, hashProvider);
    const updateAvatar = new UpdateAvatar(repository, storage);

    const deleteFile = spyOn(storage, 'deleteFile');

    const user = await create.execute({
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'valid_password',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatar_filename: 'valid_filename.jpg',
    });

    const avatar2 = await updateAvatar.execute({
      user_id: user.id,
      avatar_filename: 'valid_filename2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('valid_filename.jpg');

    expect(avatar2).toEqual({ ...user, avatar: 'valid_filename2.jpg' });
  });
});
