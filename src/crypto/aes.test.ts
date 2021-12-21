import { AesCrypto, EncryptParams } from './aes';

export {};

describe('aes', () => {
  it('should encrypt and decrypt', async () => {
    const aes = AesCrypto.default();
    const secret = 'Very secret string';
    const encParams: EncryptParams = {
      password: 'test123',
      data: new TextEncoder().encode(secret),
    };

    const encryptResult = await aes.encrypt(encParams);
    const decryptResult = await aes.decrypt({
      password: 'test123',
      data: encryptResult.cipherText,
      salt: encryptResult.salt,
      iv: encryptResult.iv,
    });

    expect(new TextDecoder().decode(decryptResult)).toBe(secret);
  });

  it('should fail for incorrect password', async () => {
    const aes = AesCrypto.default();
    const secret = crypto.getRandomValues(new Uint8Array(32));
    const encParams: EncryptParams = {
      password: 'test123',
      data: secret,
    };

    const encryptResult = await aes.encrypt(encParams);

    const decrypt = async () =>
      await aes.decrypt({
        password: 'test124',
        data: encryptResult.cipherText,
        salt: encryptResult.salt,
        iv: encryptResult.iv,
      });

    await expect(decrypt).rejects.toThrow('Cipher job failed');
  });
});
