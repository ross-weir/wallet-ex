import { Box } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNavigate, useParams } from 'react-router-dom';

import { useAccounts } from '@/hooks';
import { Account } from '@/internal';

import { AccountDetail } from './AccountDetail/AccountDetail';
import { AccountsHeader } from './AccountsHeader/AccountsHeader';
import { CreateAccountForm } from './CreateAccountForm/CreateAccountForm';
import { CreateAccountProcessedSchema } from './CreateAccountForm/schema';

export interface AccountSectionProps {
  accounts: Account[];
  onAccountCreate: (form: CreateAccountProcessedSchema) => Promise<void>;
}

export function AccountSection({
  accounts,
  onAccountCreate,
}: AccountSectionProps) {
  const navigate = useNavigate();
  const { walletId } = useParams();
  const modals = useModals();
  const { setSelectedAccount, selectedAccount } = useAccounts();

  const openCreateAccountModal = () => {
    const id = modals.openModal({
      title: 'Create account',
      children: (
        <CreateAccountForm
          onCancel={() => modals.closeModal(id, true)}
          onSubmit={async (form, setLoading) => {
            try {
              await onAccountCreate(form);
              modals.closeModal(id);
            } finally {
              setLoading(false);
            }
          }}
        />
      ),
    });
  };

  const onAccountClicked = (account: Account) => {
    setSelectedAccount(account);

    navigate(`wallets/${walletId}/accounts/${account.id}`);
  };

  return (
    <>
      <AccountsHeader iconProps={{ onClick: openCreateAccountModal }} mb="sm" />
      <Box>
        {accounts.map((account) => (
          <AccountDetail
            account={account}
            selected={selectedAccount === account}
            key={account.id}
            onClick={() => onAccountClicked(account)}
          />
        ))}
      </Box>
    </>
  );
}
