import { Box, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'typedi';

import { Account, Address, AddressService } from '@/internal';
import { AddressText } from '@/mantine/components/AddressText';
import { WalletContext } from '@/types';

import { NewAddressButton } from './NewAddressButton/NewAddressButton';
import useStyles from './ReceiveTab.styles';

interface ReceiveTabProps {
  account: Account;
  walletCtx: WalletContext;
}

export function ReceiveTab({ account, walletCtx }: ReceiveTabProps) {
  const { t } = useTranslation('walletReceiveTab');
  const { classes } = useStyles();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addressService = Container.get(AddressService);

  useEffect(() => {
    setIsLoading(true);

    addressService
      .filterByAccountId(account.id)
      .then(setAddresses)
      .catch((err) => console.log(`handle this m8: ${err}`))
      .finally(() => setIsLoading(false));
  }, [account.id, addressService]);

  const onNewAccount = async () => {};

  return (
    <>
      <Text weight={500} size="lg">
        {t('header')}
      </Text>
      <Text color="dimmed" size="sm">
        {t('headerSubheader')}
      </Text>

      {!!addresses.length && (
        <Box
          className={classes.currentAddressContainer}
          onClick={() => console.log('testing')}
        >
          <AddressText value={addresses[0].address} />
        </Box>
      )}
      <NewAddressButton onClick={onNewAccount}>
        {t('newAddressButton')}
      </NewAddressButton>

      {/* addresses table */}
    </>
  );
}
