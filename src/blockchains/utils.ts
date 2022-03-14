import { getFileExt } from '../utils/fs';

export const getNodeBinaryPath = async (
  rootDir: string,
  chain: string,
): Promise<string> => {
  const ext = await getFileExt();

  return `${rootDir}/${chain}_node${ext}`;
};
