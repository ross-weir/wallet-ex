import { ErgoNode } from './ergo';

export enum SupportedBlockchain {
  Ergo = 'ergo',
}

const nodeCtorMap = {
  [SupportedBlockchain.Ergo]: ErgoNode,
};
