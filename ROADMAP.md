## Get international language ready



## 1. Restore wallet (create is done basically the same way as restore)

Probably just do similar to yori for now, ergo-lib missing functionality to create keys from mnemoic sentence

Optional mnemoic password to seed the mnemoic with 

- Generate mnemoic
- Get a seed from mnemoic
- Generate key from seed

Example Yoroi:

```js
// @flow

import { mnemonicToSeedSync } from 'bip39';
import { fromSeed, } from 'bip32';
import { BIP32PrivateKey } from '../../../common/lib/crypto/keys/keyRepository';

export function generateWalletRootKey(
  mnemonic: string
): BIP32PrivateKey {
  const seed = mnemonicToSeedSync(mnemonic);
  return BIP32PrivateKey.fromBip32(fromSeed(seed));
}
```

## 2. Send ergs (future, send tokens)
## 3. Recv ergs (addresses and utxo sum for each)
## 4. Transactions list



For starting out development just connect to an already running node
We can add node management later in development (starting/stopping/etc)
Also need to consider how to bundle the node with this app, we need to get the node jar as a exe
Then maybe use exe as a tuari sidecar?
