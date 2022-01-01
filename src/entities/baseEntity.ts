import { AutoWired } from '../ioc';
import { BackendService } from '../services';

export class BaseEntity {
  id!: number;

  @AutoWired
  protected backend!: BackendService;
}
