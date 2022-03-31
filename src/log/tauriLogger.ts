import { isDev } from '@/utils/env';
import { Logger } from './logger';

export class TauriLogger implements Logger {
  constructor(private readonly tauri: typeof import('tauri-plugin-log-api')) {}

  public trace(msg: string): void {
    this.tauri.trace(msg);
  }

  public debug(msg: string): void {
    this.tauri.debug(msg);
  }

  public info(msg: string): void {
    this.tauri.info(msg);
  }

  public warn(msg: string): void {
    this.tauri.warn(msg);
  }

  public error(msg: string): void {
    this.tauri.error(msg);
  }

  public static async new(): Promise<Logger> {
    const tauri = await import('tauri-plugin-log-api');

    if (isDev()) {
      await tauri.attachConsole();
    }

    return new TauriLogger(tauri);
  }
}
