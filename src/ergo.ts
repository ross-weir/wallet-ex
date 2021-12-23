export type Ergo = typeof import('ergo-lib-wasm-browser');

let ergo: Ergo;

export const getErgo = (): Ergo => {
  if (!ergo) {
    throw new Error('You must call initErgo before using ergo wasm!!');
  }

  return ergo;
};

export const initErgo = async (): Promise<Ergo> => {
  if (!ergo) {
    // Tests are ran using jest (nodejs) otherwise we should be in the browser
    ergo = await (process.env.NODE_ENV === 'test'
      ? import('ergo-lib-wasm-nodejs')
      : import('ergo-lib-wasm-browser'));
  }

  return ergo;
};
