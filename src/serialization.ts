export interface DataSerializer<T> {
  serialize(obj: T): string;
  deserialize(obj: string): T;
}

export class JsonSerializer<T = any> implements DataSerializer<T> {
  serialize(obj: any): string {
    return JSON.stringify(obj);
  }

  deserialize(obj: string): any {
    return JSON.parse(obj);
  }
}

export class HoconSerializer<T = any> implements DataSerializer<T> {
  serialize(obj: T): string {
    throw new Error('Method not implemented.');
  }

  deserialize(obj: string): T {
    throw new Error('Method not implemented.');
  }
}
