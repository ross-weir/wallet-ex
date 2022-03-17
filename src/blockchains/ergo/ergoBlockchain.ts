// import { Blockchain } from '../blockchain';
import { Node } from '../node';
import { ErgoNode } from './ergoNode';

// this might not be needed
export class ErgoBlockchain {
  public getName(): string {
    return 'ergo';
  }

  // public getNodeCls(): void | typeof Node {
  //   return ErgoNode;
  // }
}
