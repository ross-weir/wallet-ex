import '@testing-library/jest-dom';
import 'reflect-metadata';

// Polyfill globals that exist on `window` in the browser
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder } = require('util');
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  const { TextDecoder } = require('util');
  global.TextDecoder = TextDecoder;
}

if (typeof global.crypto === 'undefined') {
  // requires node version > 15
  const crypto = require('crypto');
  global.crypto = crypto.webcrypto;
}
