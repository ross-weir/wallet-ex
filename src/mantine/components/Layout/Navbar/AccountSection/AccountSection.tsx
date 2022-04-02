import { Account } from '@/internal';
import { useModals } from '@mantine/modals';
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
      <AccountsHeader iconProps={{ onClick: openCreateAccountModal }} />
      <div>
        {accounts.map((a) => (
          <p>{a.name}</p>
        ))}
      </div>
    </>
  );
}
