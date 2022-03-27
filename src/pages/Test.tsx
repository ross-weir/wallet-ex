import { path } from '@tauri-apps/api';
import * as api from '@wallet-ex/rosetta-api-client';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import Container from 'typedi';

import { Account, Wallet } from '@/entities';
import { db } from '@/storage';

import { SupportedBlockchain } from '../blockchains/types';
import { BackendServiceToken } from '../ioc';
import { DependencyManager, RemoteDependency } from '../services';
import { getExecutableExt } from '../utils/fs';

export function Test() {
  useEffect(() => {
    const run = async () => {
      const backend = Container.get(BackendServiceToken);
    };

    run();
  }, []);

  return (
    <>
      <p>Testing</p>
    </>
  );
}
