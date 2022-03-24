import { capitalize, fromBase16, insertDecimal,toBase16 } from './fmt';

export {};

describe('capitalize', () => {
  it('should capitalize the provided word', () => {
    const word = 'test';
    const result = capitalize(word);

    expect(result).toBe('Test');
  });

  it('should capitalize the first word of a sentence', () => {
    const sentence = 'hey there its me';
    const result = capitalize(sentence);

    expect(result).toBe('Hey there its me');
  });

  it('should preserve capitalized word', () => {
    const word = 'Ergo';
    const result = capitalize(word);

    expect(result).toBe('Ergo');
  });
});

describe('toBase16', () => {
  it('should convert Uint8Array to base16 string', () => {
    const buf = new Uint8Array([247, 72, 1, 66, 226, 221, 88, 178]);
    const result = toBase16(buf);

    expect(result).toBe('f7480142e2dd58b2');
  });

  it('should work for empty Uint8Array', () => {
    const buf = new Uint8Array([]);
    const result = toBase16(buf);

    expect(result).toBe('');
  });
});

describe('fromBase16', () => {
  it('should convert base16 string to Uint8Array', () => {
    const str = 'e691a6aea44b8201';
    const result = fromBase16(str);

    expect(result).toStrictEqual(
      new Uint8Array([230, 145, 166, 174, 164, 75, 130, 1]),
    );
  });

  it('should work for empty string', () => {
    const str = '';
    const result = fromBase16(str);

    expect(result).toStrictEqual(new Uint8Array([]));
  });
});

describe('insertDecimal', () => {
  it('should insert decimal in expected position', () => {
    const n = 110002480;
    const result = insertDecimal(n, 7);

    expect(result).toBe('11.0002480');
  });

  it('should trim trailing zeros', () => {
    const n = 24489020000;
    const result = insertDecimal(n, 7, true);

    expect(result).toBe('2448.902');
  });
});
