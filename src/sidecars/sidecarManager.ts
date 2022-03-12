import { Sidecar } from './sidecar';

export class SidecarManager {
  private readonly registry: Record<string, Sidecar> = {};

  constructor() {}

  public get(sidecarName: string): Sidecar | undefined {
    return this.registry[sidecarName];
  }

  public register(sidecarName: string, sidecar: Sidecar): void {
    if (this.registry[sidecarName]) {
      // handle already exists
      return;
    }

    this.registry[sidecarName] = sidecar;
  }

  public killAll(): void {
    for (const sidecar of Object.values(this.registry)) {
      sidecar.kill();
    }
  }
}
