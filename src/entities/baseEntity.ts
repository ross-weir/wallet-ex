import { Container } from 'typedi';
import { BackendService } from '../services';
import { BackendServiceToken } from '../ioc';

export abstract class BaseEntity {
  id!: number;

  protected get backend(): BackendService {
    return Container.get(BackendServiceToken);
  }
}
