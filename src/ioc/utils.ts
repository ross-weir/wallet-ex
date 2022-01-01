import { InjectionToken, container, inject } from 'tsyringe';

export type ForwardRefFn<T> = () => InjectionToken<T>;

/**
 * Property based IoC injection.
 *
 * Currently used to supply entities with backend service.
 *
 * https://github.com/microsoft/tsyringe/issues/80#issuecomment-726005891
 */
export function AutoWired<T>(target: any, propertyKey: string | symbol): void;
export function AutoWired<T>(
  token: InjectionToken<T> | ForwardRefFn<T>,
): (target: any, propertyKey: string | symbol, parameterIndex?: number) => void;
export function AutoWired<T>(
  token?: InjectionToken<T> | ForwardRefFn<T>,
  propertyKey?: string | symbol,
):
  | ((
      target: any,
      propertyKey: string | symbol,
      parameterIndex?: number,
    ) => void)
  | void {
  if (typeof token === 'function') {
    console.log('HERE1');
    return (target: any, propertyKey: string | symbol) => {
      Object.defineProperty(target, propertyKey, {
        get: () => {
          const type = (token as ForwardRefFn<T>)();
          return container.resolve(type);
        },
      });
    };
  } else if (token && propertyKey) {
    console.log('HERE2');
    const type = Reflect.getMetadata('design:type', token, propertyKey);
    if (type === undefined) {
      // tslint:disable-next-line:no-console
      throw new Error(
        `failed to get design type of ${
          (token as any).constructor.name
        }'s ${String(propertyKey)}`,
      );
    }
    Object.defineProperty(token, propertyKey, {
      get: () => {
        return container.resolve(type);
      },
    });
  } else {
    console.log('HERE3');
    return (target: any, propertyKey: string | symbol, index?: number) => {
      if (index !== undefined) {
        console.log(index);
        console.log(token);
        console.log('HERE31');
        return inject(token!)(target, propertyKey, index);
      } else {
        console.log('HERE32');
        if (token) {
          console.log('HERE34');
          Object.defineProperty(target, propertyKey, {
            get: () => {
              return container.resolve(token);
            },
          });
        }
      }
    };
  }
}
