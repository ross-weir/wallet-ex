import { path } from '@tauri-apps/api';
import * as api from '@wallet-ex/rosetta-api-client';
import { useEffect } from 'react';
import Container from 'typedi';

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

      try {
        const wallet = await db.wallets.add({
          name: 'test',
          interface: 'local',
          password: 'testing123',
        });
        console.log(wallet);
        const wallet3 = await db.wallets.get(wallet);
        console.log(wallet3);

        const listWallets = await db.wallets.toArray();
        console.log(listWallets);
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
