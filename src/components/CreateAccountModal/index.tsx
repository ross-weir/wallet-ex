import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'semantic-ui-react';

import {
  bip44Map,
  getIconForBlockchain,
  getNetworksForBlockchain,
  getSupportedBlockchains,
  SupportedBlockchain,
} from '@/internal';
import { capitalize } from '@/utils/fmt';

export interface CreateAccountForm {
  name: string;
  coinType: number;
  network: string;
}

export interface CreateAccountModalProps {
  trigger: React.ReactNode;
  handleAccountCreate: (form: CreateAccountForm) => Promise<void>;
}

function CreateAccountModal({
  trigger,
  handleAccountCreate,
}: CreateAccountModalProps) {
  const { t } = useTranslation(['common', 'walletView']);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: use formik if more fields added
  const [accountName, setAccountName] = useState('');
  const [coin, setCoin] = useState('');
  const [accountNameError, setAccountNameError] = useState<
    string | undefined
  >();
  const [coinError, setCoinError] = useState<string | undefined>();

  const coinOpts = (): any[] => {
    const opts = [];

    for (const blockchain of getSupportedBlockchains()) {
      const bc = blockchain as SupportedBlockchain;
      const { coinType } = bip44Map[blockchain];
      const networks = getNetworksForBlockchain(bc);

      for (const network of networks) {
        const id = `${coinType}.${network}`;

        opts.push({
          key: id,
          text: `${capitalize(blockchain)} (${capitalize(network)})`,
          value: id,
          image: {
            avatar: true,
            src: getIconForBlockchain(blockchain, network),
          },
        });
      }
    }

    return opts;
  };

  const validate = () => {
    if (!accountName) {
      setAccountNameError(t('walletView:createAccount:nameRequiredErr'));
      return false;
    }

    if (accountName.length > 20) {
      setAccountNameError(t('walletView:createAccount:nameCharacterLimitErr'));
      return false;
    }

    if (!coin) {
      setCoinError('Must select coin');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      const [coinType, network] = coin.split('.');

      await handleAccountCreate({
        name: accountName,
        coinType: Number(coinType),
        network,
      });

      setIsOpen(false);
      setAccountName('');
      setCoin('');
      setAccountNameError(undefined);
      setCoinError(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: any) => {
    setAccountNameError(undefined);
    setAccountName(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleCoinSelect = (e: any, { name, value }: any) => {
    setCoinError(undefined);
    setCoin(value);
  };

  return (
    <Modal
      open={isOpen}
      trigger={trigger}
      size="small"
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <Modal.Header>{t('walletView:createAccount:title')}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            name="accountName"
            value={accountName}
            error={accountNameError}
            label={t('walletView:createAccount:nameLabel')}
            placeholder={t('walletView:createAccount:namePlaceholder')}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
            required
          />
          <Form.Dropdown
            name="coin"
            label="Coin"
            value={coin}
            error={coinError}
            options={coinOpts()}
            selection
            required
            onChange={handleCoinSelect}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setIsOpen(false)} tabIndex={100}>
          {capitalize(t('common:cancel'))}
        </Button>
        <Button
          primary
          loading={isLoading}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {capitalize(t('common:submit'))}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CreateAccountModal;
