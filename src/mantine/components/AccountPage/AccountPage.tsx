import { useAccounts } from '@/hooks';

import { AccountPageHeader } from './AccountPageHeader/AccountPageHeader';
import { AccountPageTabs } from './AccountPageTabs/AccountPageTabs';

export function AccountPage() {
  const { selectedAccount } = useAccounts();

  return (
    <>
      <AccountPageHeader account={selectedAccount!} />
      <AccountPageTabs />
    </>
  );
}
