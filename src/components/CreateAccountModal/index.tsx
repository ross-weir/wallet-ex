import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'semantic-ui-react';

import {
  getIconForBlockchain,
  getNetworksForBlockchain,
  getSupportedBlockchains,
  SupportedBlockchain,
} from '@/internal';
import { capitalize } from '@/utils/fmt';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface CreateAccountForm {
  name: string;
  blockchainName: SupportedBlockchain;
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
  const { t } = useTranslation(['common', 'walletView', 'form']);
  const [isOpen, setIsOpen] = useState(false);

  const coinOpts = (): any[] => {
    const opts = [];

    for (const blockchainName of getSupportedBlockchains()) {
      const networks = getNetworksForBlockchain(blockchainName);

      for (const network of networks) {
        const id = `${blockchainName}.${network}`;

        opts.push({
          key: id,
          text: `${capitalize(blockchainName)} ${capitalize(network)}`,
          value: id,
          image: {
            avatar: true,
            src: getIconForBlockchain(blockchainName, network),
          },
        });
      }
    }

    return opts;
  };

  const schema = Yup.object().shape({
    accountName: Yup.string()
      .required(t('walletView:createAccount:nameRequiredErr'))
      .max(20, t('walletView:createAccount:nameCharacterLimitErr')),
    coin: Yup.string().required(
      t('form:error:required', { fieldName: 'Coin' }),
    ),
  });

  return (
    <Formik
      initialValues={{ accountName: '', coin: '' }}
      validationSchema={schema}
      onSubmit={async ({ coin, accountName }, { setSubmitting, resetForm }) => {
        try {
          const [blockchain, network] = coin.split('.');

          await handleAccountCreate({
            name: accountName,
            blockchainName: blockchain as SupportedBlockchain,
            network,
          });

          setIsOpen(false);
          resetForm();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        getFieldProps,
        handleSubmit,
        handleBlur,
        setFieldValue,
        isSubmitting,
      }) => (
        <Modal
          open={isOpen}
          as={Form}
          trigger={trigger}
          size="small"
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          onSubmit={handleSubmit}
        >
          <Modal.Header>{t('walletView:createAccount:title')}</Modal.Header>
          <Modal.Content>
            <Form.Input
              required
              id="accountName"
              label={t('walletView:createAccount:nameLabel')}
              placeholder={t('walletView:createAccount:namePlaceholder')}
              error={touched.accountName && errors.accountName}
              {...getFieldProps('accountName')}
            />
            {/* Cant use getFieldProps because this dropdown doesn't use a 'input' element */}
            <Form.Dropdown
              id="coin"
              label="Coin"
              required
              options={coinOpts()}
              placeholder={t('form:placeholder:select', { fieldName: 'Coin' })}
              selection
              error={touched.coin && errors.coin}
              value={values.coin}
              onBlur={handleBlur}
              onChange={(_, { value }) => setFieldValue('coin', value)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setIsOpen(false)}
              tabIndex={100}
              type="button"
              disabled={isSubmitting}
            >
              {capitalize(t('common:cancel'))}
            </Button>
            <Button
              id="submit"
              primary
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              {capitalize(t('common:submit'))}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
}

export default CreateAccountModal;
