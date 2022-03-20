import localforage from 'localforage';

// Uses localforage to persist basic objects.
// Useful of things like app config and state.
export class ObjectStorage<T extends Record<string, any>> {
  private readonly key;

  constructor(key: string, defaultObj: T) {
    this.key = key;

    localforage.getItem(key).then((v) => {
      if (!v) {
        localforage.setItem(key, defaultObj);
      }
    });
  }

  public async get(): Promise<T | null> {
    return localforage.getItem(this.key);
  }

  public async set(obj: T): Promise<T> {
    return localforage.setItem(this.key, obj);
  }

  public async update<K extends keyof T>(key: K, value: T[K]) {
    const obj = await this.get();

    if (obj) {
      obj[key] = value;

      return localforage.setItem(this.key, obj);
    }

    return obj;
  }

  public async updatePartial(obj: Partial<T>) {
    const curObj = await this.get();

    if (curObj) {
      return localforage.setItem(this.key, { ...curObj, ...obj });
    }
  }
}
