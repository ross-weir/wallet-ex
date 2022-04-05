import { Box, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'typedi';

import { Account, Address, AddressService } from '@/internal';
import { AddressText } from '@/mantine/components/AddressText';
import { WalletContext } from '@/types';

import { AddressTable } from './AddressTable/AddressTable';
import { NewAddressButton } from './NewAddressButton/NewAddressButton';
import useStyles from './ReceiveTab.styles';

interface ReceiveTabProps {
  account: Account;
  walletCtx: WalletContext;
}

export function ReceiveTab({ account, walletCtx }: ReceiveTabProps) {
  const { t } = useTranslation('accountPage');
  const { classes } = useStyles();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deriving, setDeriving] = useState(false);

  const addressService = Container.get(AddressService);

  useEffect(() => {
    setLoading(true);

    addressService
      .filterByAccountId(account.id)
      .then((addrs) => setAddresses(addrs.reverse()))
      .catch((err) => console.log(`handle this m8: ${err}`))
      .finally(() => setLoading(false));
  }, [account.id, addressService]);

  const onNewAccount = async () => {
    setDeriving(true);

    try {
      const { wallet, seed } = walletCtx;
      const latestAddress =
        addressService.getLatestAddressByDeriviation(addresses);

      const addressIdx = latestAddress.deriveIdx + 1;
      const newAddr = await wallet.deriveAddress({
        seed,
        accountIdx: account.deriveIdx,
        addressIdx,
        network: account.network,
      });

      const addr = await addressService.create(
        {
          address: newAddr,
          accountId: account.id,
          deriveIdx: addressIdx,
        },
        account.getBlockchain(),
      );

      setAddresses((addrs) => [addr, ...addrs]);
      // TODO: handle err
    } finally {
      setDeriving(false);
    }
  };

  return (
    <>
      <Text weight={500} size="lg">
        {t('receiveTab.header')}
      </Text>
      <Text color="dimmed" size="sm">
        {t('receiveTab.headerSubheader')}
      </Text>

      {!!addresses.length && (
        <Box
          className={classes.currentAddressContainer}
          onClick={() => console.log('testing')}
        >
          <AddressText value={addresses[0].address} />
        </Box>
      )}
      <NewAddressButton
        loading={deriving}
        disabled={deriving}
        onClick={onNewAccount}
      >
        {t('receiveTab.newAddressButton')}
      </NewAddressButton>

      <div className={classes.prevAddressContainer}>
        <Text weight={500} size="lg">
          {t('receiveTab.previousAddressesHeader')}
        </Text>
        <Text color="dimmed" size="sm">
          {t('receiveTab.previousAddressesSubheader')}
        </Text>
        <AddressTable addresses={addresses} />
      </div>
    </>
  );
}
