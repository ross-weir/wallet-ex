import { Button, Menu, Modal } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, RotateClockwise, Wallet } from 'tabler-icons-react';
import { AddWalletAction } from './schema';
import { SoftwareWalletForm } from './SoftwareWalletForm';

export function AddWalletTrigger() {
  const { t } = useTranslation(['addWallet', 'common']);
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

  const onSubmit = (form: any) => {
    console.log(form);
  };

  return (
    <>
      <Modal opened={isOpen} onClose={onClose} title={getTitle()}>
        <SoftwareWalletForm onSubmit={onSubmit} action={walletAction!} />
      </Modal>
      <Menu
        position="right"
        control={
          <Button rightIcon={<Plus size={18} />} variant="light">
            {t('addWallet:title')}
          </Button>
        }
      >
        <Menu.Label>{t('addWallet:manageWallets')}</Menu.Label>
        <Menu.Item
          icon={<Wallet size={14} />}
          onClick={() => openModal('create')}
        >
          {t('addWallet:createWallet')}
        </Menu.Item>
        <Menu.Item
          icon={<RotateClockwise size={14} />}
          onClick={() => openModal('restore')}
        >
          {t('addWallet:restoreWallet')}
        </Menu.Item>
      </Menu>
    </>
  );
}
