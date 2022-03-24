import { path } from '@tauri-apps/api';
import * as api from '@wallet-ex/rosetta-api-client';
import { useEffect } from 'react';
import Container from 'typedi';

import { Account, Wallet } from '@/entities';
import { IWalletExDatabase } from '@/storage/db';
import { dxDb } from '@/storage/db/dexie';
import { TauriDatabase } from '@/storage/db/tauri';

import { getBlockchain } from '../blockchains';
import { SupportedBlockchain } from '../blockchains/types';
import { BackendServiceToken } from '../ioc';
import { DependencyManager, RemoteDependency } from '../services';
import { getExecutableExt } from '../utils/fs';

export function Test() {
  useEffect(() => {
    const run = async () => {
      const backend = Container.get(BackendServiceToken);
      const db: IWalletExDatabase = new TauriDatabase();
      // const db: IWalletExDatabase = dxDb;

      try {
        const wallet = await db.createWallet(
          Wallet.fromJson({
            name: 'test',
            interface: 'local',
            password: 'testing123',
          }),
        );

        console.log(wallet);
        const wallet3 = await db.findWallet(wallet);
        console.log(wallet3);

        const wallets = await db.listWallets();
        console.log(wallets);
        // const listWallets = await db.wallets.toArray();
        // console.log(listWallets);

        const accountId = await db.createAccount(
          Account.fromJson({
            name: 'testAccount',
            deriveIdx: 0,
            coinType: 429,
            walletId: 4,
          }),
        );
        console.log(accountId);

        const account = await db.findAccount(accountId);
        console.log(account);

        const allAccounts = await db.accountsForWallet(4);
        console.log(allAccounts);
      } catch (e) {
        console.log(e);
      }

      // const cfg = { baseDir: `${appDir}ergo`, network: 'testnet' };
      // const node = await ergoNodeFactory(cfg);
      // node.spawn();

      // console.log(await path.basename(`${appDir}\\ergo\\ergo_node.exe`));
      // const dm = IocContainer.get(DependencyManager);
      // const deps: RemoteDependency[] = [
      //   {
      //     downloadUrl:
      //       'https://github.com/ross-weir/ergo-portable/releases/download/v4.0.23/ergo-windows-v4.0.23.exe',
      //     localPath: `${appDir}\\ergo\\ergo_node.exe`,
      //     digest:
      //       '523119fdcd15ce5eaeb17a299ecdce60f212e0ee643a598a7762c264d3cd752d',
      //   },
      // ];

      // dm.ensureDependencies(deps);
    };

    run();
  }, []);

  return (
    <>
      <p>Testing</p>
    </>
  );
}
