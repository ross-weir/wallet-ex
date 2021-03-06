/**
 * Capitalize the provided word
 *
 * For example: test -> Test
 *
 * @param word the word to capitalize
 * @returns the supplied word with the first character capitalized
 */
export const capitalize = (word: string): string =>
  `${word.substr(0, 1).toUpperCase()}${word.substr(1)}`;

/**
 * Convert a byte buffer to a base16 formatted string
 *
 * @param buf buffer to convert to base16 string
 * @returns base16 string
 */
export const toBase16 = (buf: Uint8Array): string =>
  Array.from(buf, (byte) => byte.toString(16).padStart(2, '0')).join('');

/**
 * Convert a string to a bytes buffer
 *
 * @param hex string to convert to bytes buffer
 * @returns bytes representation of the string
 */
export const fromBase16 = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
};

/**
 * Format a number with the specified decimals/zeros.
 *
 * @param n the number to add a decimal to
 * @param decimalCount How many trailing decimals there should be
 * @param trimTrailingZero remove any trailing zeros
 * @returns the number as a string with the decimal/zero formatting
 */
export const insertDecimal = (
  n: number | string,
  decimalCount: number,
  trimTrailingZero?: boolean,
): string => {
  const nStr = n.toString();
  const decimalIdx = nStr.length - decimalCount;
  let formatted = nStr.slice(0, decimalIdx) + '.' + nStr.slice(decimalIdx);

  if (trimTrailingZero) {
    formatted = formatted.replace(/0+$/, '');
  }

  return formatted;
};
