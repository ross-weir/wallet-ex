import { Logger } from './logger';
import { TauriLogger } from './tauriLogger';

export const getLogger = async (): Promise<Logger> => TauriLogger.new();
