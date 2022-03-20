import { getOsString } from './os';

/**
 * Get the OS specific executable extension.
 *
 * @returns The file exetension used for executables on the current OS.
 */
export const getExecutableExt = (): string =>
  getOsString() === 'windows' ? '.exe' : '';

export const getNodeFilename = (blockchain: string): string =>
  `${blockchain}_node${getExecutableExt()}`.toLowerCase();
