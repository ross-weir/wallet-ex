import { checkPassword,hashPassword } from './password';

export {};

describe('checkPassword', () => {
  it('should return true for matching password', async () => {
    const psw = await hashPassword('testing123');
    const result = await checkPassword('testing123', psw);

    expect(result).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const psw = await hashPassword('testing123');
    const result = await checkPassword('testing3', psw);

    expect(result).toBe(false);
  });
});
