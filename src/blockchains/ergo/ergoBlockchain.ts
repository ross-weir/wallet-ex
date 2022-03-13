import { Blockchain } from '../blockchain';
import { Node } from '../node';
import { ErgoNode } from './ergoNode';

export class ErgoBlockchain extends Blockchain {
  public getName(): string {
    return 'ergo';
  }

  public get isNodeSupported(): boolean {
    return true;
  }

  public getNodeCls(): void | typeof Node {
    return ErgoNode;
  }
}
