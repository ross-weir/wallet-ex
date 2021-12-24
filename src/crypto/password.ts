import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const checkPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => bcrypt.compare(password, hashedPassword);
