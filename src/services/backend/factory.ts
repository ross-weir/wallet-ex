import Container from 'typedi';

import { BackendServiceToken } from '../../ioc';
import { BackendService } from './backend';

export const getBackendService = (): BackendService => {
  return Container.get(BackendServiceToken);
};
