import '@testing-library/jest-dom';

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
  const crypto = require('crypto');
  global.crypto = crypto.webcrypto;
}
