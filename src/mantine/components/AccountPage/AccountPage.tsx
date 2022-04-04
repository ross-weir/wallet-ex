import { useAccounts, useAuthenticatedWallet } from '@/hooks';

import { AccountPageHeader } from './AccountPageHeader/AccountPageHeader';
import { AccountPageTabs } from './AccountPageTabs/AccountPageTabs';

export function AccountPage() {
  const { selectedAccount } = useAccounts();
  const { wallet, seed } = useAuthenticatedWallet();
  const walletCtx = { wallet: wallet!, seed: seed! };

  return (
    <>
      <AccountPageHeader account={selectedAccount!} />
      <AccountPageTabs account={selectedAccount!} walletCtx={walletCtx} />
    </>
  );
}
