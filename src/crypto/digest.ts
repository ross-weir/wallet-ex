import Container from 'typedi';
import { BackendServiceToken } from '@/ioc';

export type Digest = string;

export const digestFile = (filePath: string): Promise<Digest> => {
  const backend = Container.get(BackendServiceToken);

  return backend.digestFile(filePath);
};
