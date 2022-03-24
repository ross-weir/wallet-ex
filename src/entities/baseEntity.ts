import { Container } from 'typedi';

import { BackendServiceToken } from '../ioc';
import { BackendService } from '../services';

export abstract class BaseEntity {
  id!: number;

  protected get backend(): BackendService {
    return Container.get(BackendServiceToken);
  }
}
