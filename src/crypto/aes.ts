/**
 * Operations for AES encryption/decryption
 *
 * Roughly follows the implementation in ergo node:
 * https://github.com/ergoplatform/ergo/blob/master/ergo-wallet/src/main/scala/org/ergoplatform/wallet/crypto/AES.scala
 * PBKDF2+SHA-256+AES-GCM
 *
 * TODO: WebCrypto has a `wrapKey` method that is used to store keys encrypted, could try using that.
 * Low priority though because this works and matches ergo.
 * TODO: add all the configuration parameters to the config file
 *
 * Note: WebCrypto differs to Java in that Java crypto formats the cipher as authTag + cipherText (reverse compared to web)
 * We don't handle the authTag here, leave it up to WebCrypto.
 */

// Parameters used during encryption/decryption
export interface CipherParams {
  iterations: number;
  hashAlgo: string;
}

// Parameters used to encrypt the data
// If salt or iv isn't provided they are generated automatically
export interface EncryptParams {
  data: Uint8Array;
  password: string;
  salt?: Uint8Array;
  iv?: Uint8Array;
}

// Parameters used to decrypt the provided data
export interface DecryptParams {
  data: Uint8Array;
  password: string;
  salt: Uint8Array;
  iv: Uint8Array;
}

// Result of the encryption
// Includes encrypted text and parameters required for decryption
export interface EncryptResult {
  cipherText: Uint8Array;
  iv: Uint8Array;
  salt: Uint8Array;
  params: CipherParams;
}

export class AesCrypto {
  private cipherAlgo = 'AES-GCM';

  constructor(private iterations: number, private hashAlgo: string) {}

  /**
   * Creates an AesCrypto instance using the default configuration in ergo node
   *
   * @returns AesCrypto instance
   */
  public static default(): AesCrypto {
    return new AesCrypto(128000, 'SHA-256');
  }

  /**
   * Encrypt the provdied data
   *
   * @param params the parameters to use during encryption
   * @returns the encrypted data and parameters required for decryption
   */
  public async encrypt(params: EncryptParams): Promise<EncryptResult> {
    const keyMaterial = await this.getKeyMaterial(params.password);
    const salt = params.salt || crypto.getRandomValues(new Uint8Array(32));
    const key = await this.deriveKey(keyMaterial, salt);
    const iv = params.iv || crypto.getRandomValues(new Uint8Array(12));

    const cipherBuf = await crypto.subtle.encrypt(
      {
        name: this.cipherAlgo,
        iv,
      },
      key,
      params.data,
    );

    return {
      cipherText: new Uint8Array(cipherBuf),
      iv,
      salt,
      params: {
        iterations: this.iterations,
        hashAlgo: this.hashAlgo,
      },
    };
  }

  /**
   * Decrypt the provided data
   *
   * @param params the parameters to use for decryption, must match those used to encrypt the data
   * @returns the plain text data
   */
  public async decrypt(params: DecryptParams): Promise<Uint8Array> {
    const keyMaterial = await this.getKeyMaterial(params.password);
    const key = await this.deriveKey(keyMaterial, params.salt);

    const plainTextBuf = await crypto.subtle.decrypt(
      {
        name: this.cipherAlgo,
        iv: params.iv,
      },
      key,
      params.data,
    );

    return new Uint8Array(plainTextBuf);
  }

  private async getKeyMaterial(password: string) {
    return crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey'],
    );
  }

  private async deriveKey(keyMaterial: CryptoKey, salt: Uint8Array) {
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: this.iterations,
        hash: this.hashAlgo,
      },
      keyMaterial,
      { name: this.cipherAlgo, length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );
  }
}
