import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Form, Modal } from 'semantic-ui-react';
import { Wallet } from '../../entities';
import { useAuthenticatedWallet } from '../../hooks';
import { capitalize } from '../../utils/fmt';

export interface WalletsListPasswordProps {
  onCancel: () => void;
  onSubmit?: () => void;
  wallet: Wallet;
}

function WalletsListPasswordModal({
  wallet,
  onCancel,
}: WalletsListPasswordProps) {
  const { t } = useTranslation(['common', 'walletsList']);
  const { setAuthenticatedWallet } = useAuthenticatedWallet();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    wallet
      .checkCredentials({ password })
      .then(async (isValid: boolean) => {
        if (!isValid) {
          setPasswordError(t('common:incorrectPassword'));

          return;
        }

        const seed = await wallet.retrieveSeed(password);
        setAuthenticatedWallet(wallet);

        navigate(`/wallets/${wallet.id}`, { state: { seed } });
      })
      .catch((e: any) => console.error(`handle this error: ${e}`))
      .finally(() => setIsLoading(false));
  };

  const handleInput = (e: any) => {
    setPasswordError(undefined);
    setPassword(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }

    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <Modal size="mini" open>
      <Modal.Header>
        {t('walletsList:walletPasswordTitle', { walletName: wallet.name })}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            name="password"
            value={password}
            icon="lock"
            iconPosition="left"
            label={t('common:walletPassword')}
            type="password"
            error={passwordError}
            placeholder={t('common:walletPassword')}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button tabIndex={100} onClick={onCancel}>
          {capitalize(t('common:cancel'))}
        </Button>
        <Button
          primary
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          {capitalize(t('common:submit'))}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default WalletsListPasswordModal;
