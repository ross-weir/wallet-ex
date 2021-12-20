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

- recv ergs tab
- shows initial address when a wallet is created
- Derive next address button
- Previously used address/Balance discovery by generating `n` addresses and checking for balances via chainProvider

When a wallet is created/restored it should create a intial address, this will be shown when user visits
recv tab. It will also kick off the discovery process to find used addresses and create the entities in the db
as required. I don't think the addresses state needs to be accessible anywhere outside WalletViewReceiveTab? So
just load it all when user navigates to the tab

## 4. Transactions list



For starting out development just connect to an already running node
We can add node management later in development (starting/stopping/etc)
Also need to consider how to bundle the node with this app, we need to get the node jar as a exe
Then maybe use exe as a tuari sidecar?

use ergo-explorer to get data

Scanning for transactions using ergo explorer:
- generate 20 pk addresses
- Check for balance/transactions at address
- tally balances?
- repeat at offset highest derive_index with transaction + 20 until no addresses with transactions
this would be one way that would send off 20~ API calls
would probably be better than scanning the entire chain? Should actually less API calls 



THIS WEEK:

- get secret storage encrypt/decrypt working
- Get the receive page working with address derivaiton
