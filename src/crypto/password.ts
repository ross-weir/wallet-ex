import bcrypt from 'bcryptjs';

export type HashedPassword = string;

export const hashPassword = async (password: string): Promise<HashedPassword> =>
  bcrypt.hash(password, 10);

export const checkPassword = async (
  password: string,
  hashedPassword: HashedPassword,
): Promise<boolean> => bcrypt.compare(password, hashedPassword);
