import { container } from 'tsyringe';
import { BackendService } from '../services';

export abstract class BaseEntity {
  id!: number;

  protected get backend(): BackendService {
    return container.resolve('BackendService');
  }
}
