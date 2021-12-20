/**
 * Encrypts secrets to a format following the process outlined here:
 * https://github.com/ergoplatform/ergo-wallet/wiki/Ergo-Secret-Storage
 *
 * Mostly used for persisting secret seeds in an encypted form.
 */

import { toBase16 } from './utils/formatting';

// Parameters used for encryption that are required
// along with the password for decryption
export interface CipherParams {
  iv: string;
  salt: string;
}

export interface EncryptResult {
  cipherText: string;
  params: CipherParams;
}

// 1. Pass password through key derivation function PBKDF2
// 2. using the key from (1) encrypt using AES-GCM: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm_2

// Get the base key used to derive the DK (derive key)
const getKeyMaterial = (password: string) => {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2', length: 256 },
    false,
    ['deriveKey', 'deriveBits'],
  );
};

// Get the DK (derive key) used to encrypt the message
const getKey = (keyMaterial: CryptoKey, salt: Uint8Array) =>
  crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 128000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 128 },
    true,
    ['encrypt', 'decrypt'],
  );

/**
 * Encrypt the provided data following ergos method
 *
 * @param data the data to encrypt
 * @param password password used in PBKDF2
 * @param prevSalt salt previously used for this encryption, for example if
 * it's an existing secret and we read the salt from storage
 * @param prevIv iv previously used for this encryption, for example if
 * it's an existing secret and we read the iv from storage
 * @returns an object including the cypher text and params used for encryption
 */
export const encrypt = async (
  data: string,
  password: string,
  prevSalt?: Uint8Array,
  prevIv?: Uint8Array,
): Promise<EncryptResult> => {
  const keyMaterial = await getKeyMaterial(password);
  const salt = prevSalt || crypto.getRandomValues(new Uint8Array(32));
  const key = await getKey(keyMaterial, salt);
  const iv = prevIv || crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();

  const cipherText = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(data),
  );

  return { cipherText, params: { iv: toBase16(iv), salt: toBase16(salt) } };
};

export const decrypt = (
  data: string,
  password: string,
  salt: Uint8Array,
  iv: Uint8Array,
): string => '';
