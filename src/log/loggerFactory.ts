import { Logger } from './logger';
import { TauriLogger } from './tauriLogger';

export const getLogger = (): Logger => new TauriLogger();
