import Container from 'typedi';
import { BackendServiceToken } from '../ioc';

export const getFileExt = async (): Promise<string> => {
  const backend = Container.get(BackendServiceToken);
  let platform = await backend.getPlatform();

  return platform === 'windows' ? '.exe' : '';
};
