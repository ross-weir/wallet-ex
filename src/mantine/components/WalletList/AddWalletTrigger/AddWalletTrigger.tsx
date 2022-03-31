import { Modal } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddWalletMenu } from './AddWalletMenu/AddWalletMenu';
import { AddWalletAction, WalletFormSchema } from './SoftwareWalletForm/schema';
import { SoftwareWalletForm } from './SoftwareWalletForm/SoftwareWalletForm';

interface AddWalletTriggerProps {
  onAddWallet: (form: WalletFormSchema) => void;
}

export function AddWalletTrigger({ onAddWallet }: AddWalletTriggerProps) {
  const { t } = useTranslation('addWallet');
  const [isOpen, setIsOpen] = useState(false);
  const [walletAction, setWalletAction] = useState<AddWalletAction | undefined>(
    undefined,
  );

  const getTitle = () => {
    if (!walletAction) {
      return;
    }

    return t(
      `addWallet:${
        walletAction === 'create' ? 'createWallet' : 'restoreWallet'
      }`,
    );
  };

  const openModal = (action: AddWalletAction) => {
    setWalletAction(action);
    setIsOpen(true);
  };

  const onClose = () => {
    setWalletAction(undefined);
    setIsOpen(false);
  };

  return (
    <>
      <Modal opened={isOpen} onClose={onClose} title={getTitle()}>
        <SoftwareWalletForm onSubmit={onAddWallet} action={walletAction!} />
      </Modal>
      <AddWalletMenu
        onCreate={() => openModal('create')}
        onRestore={() => openModal('restore')}
      />
    </>
  );
}
