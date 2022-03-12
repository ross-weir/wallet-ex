import { Child, Command } from '@tauri-apps/api/shell';

export interface SidecarOptions {
  path: string;
  args?: string | string[];
  cwd?: string;
  env?: Record<string, any>;
}

export interface SidecarExitData {
  code: number;
  signal?: number; // not sure on the type
}

export class Sidecar {
  private readonly maxLogCount = 1000;
  private readonly cmd: Command;
  private process?: Child;
  public readonly logs: string[] = [];

  constructor({ path, args, cwd, env }: SidecarOptions) {
    this.cmd = new Command(path, args, { cwd, env });
  }

  public async spawn(): Promise<void> {
    this.cmd.on('close', (data) => this.onClose(data));
    this.cmd.on('error', (data) => this.onError(data));
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

  private onClose(data: SidecarExitData): void {
    console.log('close', data);
  }

  private onError(data: any): void {
    console.log('error', data);
  }
}
