export interface Logger {
  trace(msg: string): void;
  debug(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}
