import { useModals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';

import { AddWalletMenu } from './AddWalletMenu/AddWalletMenu';
import { AddWalletAction } from './SoftwareWalletForm/schema';
import {
  SoftwareWalletForm,
  SoftwareWalletFormProps,
} from './SoftwareWalletForm/SoftwareWalletForm';

interface AddWalletTriggerProps {
  onAddWallet: (
    ...args: Parameters<SoftwareWalletFormProps['onSubmit']>
  ) => void;
}

export function AddWalletTrigger({ onAddWallet }: AddWalletTriggerProps) {
  const { t } = useTranslation('addWallet');
  const modals = useModals();

  const openModal = (action: AddWalletAction) => {
    const id = modals.openModal({
      title: t(action === 'create' ? 'createWallet' : 'restoreWallet'),
      children: (
        <SoftwareWalletForm
          onSubmit={onAddWallet}
          action={action}
          onCancel={() => modals.closeModal(id)}
        />
      ),
    });
  };

  return (
    <>
      <AddWalletMenu
        onCreate={() => openModal('create')}
        onRestore={() => openModal('restore')}
      />
    </>
  );
}
