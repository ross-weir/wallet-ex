import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { getBackend } from './backends';
import { Account, Wallet } from './entities';
import * as ergo from 'ergo-lib-wasm-browser';

const backend = getBackend();

const mnemonic =
  'talent mind narrow jaguar wink quantum work scrub pony apart label labor';

// For experimentation/testing integration with tauri backend
export function TestComp() {
  const [wallet, setWallet] = useState<Wallet | undefined>();
  const [walletErr, setWalletErr] = useState('');
  const [account, setAccount] = useState<Account | undefined>();
  const [accountErr, setAccountErr] = useState('');

  // const [address]

  const onCreateWallet = async () => {
    try {
      const w = await backend.createWallet({
        name: 'testWallet',
        interface: 'local',
      });
      setWallet(w as Wallet);
    } catch (e) {
      setWalletErr(JSON.stringify(e));
    }
  };

  const onGetWallet = () => {};

  const onCreateAccount = async () => {
    try {
      const a = await backend.createAccount({
        walletId: 1,
        name: 'hello',
        coinType: 429,
      });
      setAccount(a as Account);
    } catch (e) {
      setAccountErr(JSON.stringify(e));
    }
  };

  const onGetAccount = () => {};

  return (
    <>
      <Button onClick={onCreateWallet}>Create wallet</Button>
      <Button onClick={onGetWallet}>Get wallet</Button>
      <Button onClick={onCreateAccount}>Create account</Button>
      <Button onClick={onGetAccount}>Get account</Button>

      <p>Current wallet: {JSON.stringify(wallet)}</p>
      <p>Current wallet error: {walletErr}</p>
      <p>Current account: {JSON.stringify(account)}</p>
      <p>Current account error: {accountErr}</p>
    </>
  );
}
