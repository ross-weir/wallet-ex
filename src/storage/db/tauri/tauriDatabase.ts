import { IWalletExDatabase } from '@/storage/db';

import { AccountsTable, AddressesTable, WalletsTable } from './tables';

export class TauriDatabase implements IWalletExDatabase {
  wallets = new WalletsTable();
  accounts = new AccountsTable();
  addresses = new AddressesTable();
}
