import { path } from '@tauri-apps/api';
import * as api from '@wallet-ex/rosetta-api-client';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import Container from 'typedi';

import { Account, Wallet } from '@/entities';
import { db } from '@/storage';

import { getBlockchain } from '../blockchains';
import { SupportedBlockchain } from '../blockchains/types';
import { BackendServiceToken } from '../ioc';
import { DependencyManager, RemoteDependency } from '../services';
import { getExecutableExt } from '../utils/fs';

export function Test() {
  useEffect(() => {
    const run = async () => {
      const backend = Container.get(BackendServiceToken);

      const wallet = Wallet.fromJson({
        name: 'test',
        password: 'test',
        interface: 'local',
      });
      wallet.seed = new Uint8Array([1]);

      const walletId = await db.wallets.add(wallet);

      const wallet2 = await db.wallets.get(walletId);
      console.log('test', wallet2);
      console.log(wallet?.seed);

      const acct = Account.fromJson({
        name: 'test',
        deriveIdx: 0,
        coinType: 429,
        walletId: 1,
      });
      const acctId = await db.accounts.add(acct);

      const acctGet = await db.accounts.get(acctId);
      console.log(acctGet);
    };

    run();
  }, []);

  return (
    <>
      <p>Testing</p>
    </>
  );
}
