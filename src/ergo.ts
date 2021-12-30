export type Ergo = typeof import('ergo-lib-wasm-browser');

export const ERG_DECIMAL_PLACES = 9;

let ergo: Ergo;

export const getErgo = (): Ergo => {
  if (!ergo) {
    throw new Error('You must call initErgo before using ergo wasm!!');
  }

  return ergo;
};

export const initErgo = async (): Promise<Ergo> => {
  if (!ergo) {
    ergo = await import('ergo-lib-wasm-browser');
    // Tests are ran using jest (nodejs) otherwise we should be in the browser
    // if (process.env.E2E === 'true') {
    // console.log('loading browser');
    // } else {
    // ergo = await (process.env.NODE_ENV === 'test'
    // ? import('ergo-lib-wasm-nodejs')
    // : import('ergo-lib-wasm-browser'));
    // }
  }

  return ergo;
};
