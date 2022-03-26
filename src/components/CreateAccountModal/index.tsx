import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'semantic-ui-react';

import { capitalize } from '@/utils/fmt';

export interface CreateAccountForm {
  name: string;
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
  const [accountNameError, setAccountNameError] = useState<
    string | undefined
  >();

  const validate = () => {
    if (!accountName) {
      setAccountNameError(t('walletView:createAccount:nameRequiredErr'));
      return false;
    }

    if (accountName.length > 20) {
      setAccountNameError(t('walletView:createAccount:nameCharacterLimitErr'));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await handleAccountCreate({ name: accountName });

      setIsOpen(false);
      setAccountName('');
      setAccountNameError(undefined);
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
