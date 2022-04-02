import { Account } from '@/internal';
import { useModals } from '@mantine/modals';
import { AccountsHeader } from './AccountsHeader/AccountsHeader';
import { CreateAccountForm } from './CreateAccountForm/CreateAccountForm';

interface AccountSectionProps {
  accounts: Account[];
  onAccountCreate: (form: any) => void;
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
          onCancel={() => modals.closeModal(id)}
          onSubmit={async (form: any) => {
            try {
              onAccountCreate(form);
            } catch (e) {}
          }}
        />
      ),
    });
  };

  return (
    <>
      <AccountsHeader iconProps={{ onClick: openCreateAccountModal }} />
    </>
  );
}
