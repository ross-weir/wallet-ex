import { Child, Command } from '@tauri-apps/api/shell';
import EventEmitter from 'events';

import { UninitializedError } from '@/errors';

export interface SpawnOptions {
  path: string;
  args?: string | string[];
  cwd?: string;
  env?: Record<string, any>;
}

// TODO: auto restart?
export class Sidecar extends EventEmitter {
  private cmd?: Command;
  private process?: Child;
  protected maxLogCount = 1000;
  public readonly logs: string[] = [];

  public initialize({ path, args, cwd, env }: SpawnOptions) {
    this.cmd = new Command(path, args, { cwd, env });
  }

  public async spawn(): Promise<void> {
    if (!this.cmd) {
      throw new UninitializedError(
        'initialize() must be called before spawning sidecar',
      );
    }

    this.cmd.on('close', (data) => this.emit('close', data));
    this.cmd.on('error', (data) => this.emit('error', data));
    this.cmd.stderr.on('data', (data) => this.onData(data));
    this.cmd.stdout.on('data', (data) => this.onData(data));

    this.process = await this.cmd.spawn();
  }

  public async kill(): Promise<void> {
    return this.process?.kill();
  }

  protected onData(data: any): void {
    data = this.parseData(data);
    this.emit('data', data);

    console.log('data', data);
    this.logs.push(data);

    if (this.logs.length > this.maxLogCount) {
      this.logs.length = this.maxLogCount;
    }
  }

  protected parseData(data: any): any {
    return data;
  }
}
