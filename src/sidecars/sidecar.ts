import { Child, Command } from '@tauri-apps/api/shell';
import EventEmitter from 'events';

export interface SidecarOptions {
  path: string;
  args?: string | string[];
  cwd?: string;
  env?: Record<string, any>;
}

// TODO: auto restart?
export class Sidecar extends EventEmitter {
  private readonly maxLogCount = 1000;
  private readonly cmd: Command;
  private process?: Child;
  public readonly logs: string[] = [];

  constructor({ path, args, cwd, env }: SidecarOptions) {
    super();
    this.cmd = new Command(path, args, { cwd, env });
  }

  public async spawn(): Promise<void> {
    this.cmd.on('close', (data) => this.emit('close', data));
    this.cmd.on('error', (data) => this.emit('error', data));
    this.cmd.stderr.on('data', (data) => this.onData(data));
    this.cmd.stdout.on('data', (data) => this.onData(data));

    this.process = await this.cmd.spawn();
  }

  public async kill(): Promise<void> {
    return this.process?.kill();
  }

  private onData(data: any): void {
    console.log('data', data);
    this.logs.push(data);

    if (this.logs.length > this.maxLogCount) {
      this.logs.length = this.maxLogCount;
    }
  }
}
