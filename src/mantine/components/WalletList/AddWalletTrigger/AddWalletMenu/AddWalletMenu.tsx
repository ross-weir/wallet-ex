import { Button, Menu } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Plus, RotateClockwise, Wallet } from 'tabler-icons-react';

interface AddWalletMenuProps {
  onCreate: () => void;
  onRestore: () => void;
}

export function AddWalletMenu({ onCreate, onRestore }: AddWalletMenuProps) {
  const { t } = useTranslation('addWallet');

  return (
    <Menu
      position="right"
      control={
        <Button rightIcon={<Plus size={18} />} variant="light">
          {t('title')}
        </Button>
      }
    >
      <Menu.Label>{t('manageWallets')}</Menu.Label>
      <Menu.Item icon={<Wallet size={14} />} onClick={onCreate}>
        {t('createWallet')}
      </Menu.Item>
      <Menu.Item icon={<RotateClockwise size={14} />} onClick={onRestore}>
        {t('restoreWallet')}
      </Menu.Item>
    </Menu>
  );
}
