import { Box } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { useEntities } from '@/hooks';
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
  const modals = useModals();
  const { setSelectedAccount, selectedAccount } = useEntities();

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

  return (
    <>
      <AccountsHeader iconProps={{ onClick: openCreateAccountModal }} mb="sm" />
      <Box>
        {accounts.map((a) => (
          <AccountDetail
            account={a}
            selected={selectedAccount === a}
            key={a.id}
            onClick={() => setSelectedAccount(a)}
          />
        ))}
      </Box>
    </>
  );
}
