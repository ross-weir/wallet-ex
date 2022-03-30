import { Logger } from './logger';

export class TauriLogger implements Logger {
  private tauri: any;

  constructor() {
    import('tauri-plugin-log-api').then((module) => {
      this.tauri = module;
      module.attachConsole();
    });
  }

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
}
