import IStorageProvider from '../interfaces/IStorageProvider';

export default class StorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {}

  public async deleteFile(file: string): Promise<void> {}
}
