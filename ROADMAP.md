## Get international language ready



## 1. Restore wallet (create is done basically the same way as restore)

WalletService backend should be configurable so we can use tauri or ledger

using ledger: https://sygn.github.io/integrate-the-nano-ledger-s-with-your-web-app/
https://github.com/Emurgo/yoroi-extension-ledger-connect

__use one wallet/phrase but multiple accounts within the wallet__ (by using different deriviation paths)
Support multiple wallets, one mnemonic, derive multiple wallets by using passphrases: https://blog.trezor.io/passphrase-the-ultimate-protection-for-your-accounts-3a311990925b
people often use more than one wallet. If we use more than one they should be password protected

Probably just do similar to yori for now, ergo-lib missing functionality to create keys from mnemoic sentence

Restore wallet flow (wizard):
- Enter wallet details - name/password
- Enter mnemonic phrase / mnemonic passphrase

Create wallet flow (wizard):
- Enter wallet details - name/password
- Write down calculated mnemonic phrase / neter passphrase

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

use ergo-explorer to get data
we can build it into a standalone exe with `nexe` and use it to talk to a local node
OR talk to the legit deployed ergo explorer so the wallet supports both light and full operating modes
