import { path } from '@tauri-apps/api';
import { BackendServiceToken } from '../ioc';
import { DependencyManager, RemoteDependency } from '../services';
import { getExecutableExt } from '../utils/fs';
import { getBlockchain } from '../blockchains';
import { SupportedBlockchain } from '../blockchains/types';
import { useEffect } from 'react';
import Container from 'typedi';

export function Test() {
  useEffect(() => {
    const run = async () => {
      const backend = Container.get(BackendServiceToken);

      const bcCfg = {
        network: 'testnet',
        useLocalNode: true,
      };
      const bc = await getBlockchain(SupportedBlockchain.Ergo, bcCfg);
      bc.on('stateChanged', (state) => console.log(state));
      bc.on('log', console.log);
      bc.initialize().catch(console.log);

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
