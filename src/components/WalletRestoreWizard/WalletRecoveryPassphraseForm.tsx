import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Form, Icon, Message } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

export const walletRecoveryPassphraseValidationSchema = Yup.object({
  mnemonicPassphrase: Yup.string(),
  mnemonicPassphrase2: Yup.string().when(
    'mnemonicPassphrase',
    (mnemonicPassphrase) =>
      !!mnemonicPassphrase
        ? Yup.string()
            .oneOf([Yup.ref('mnemonicPassphrase')], 'Passwords must match')
            .required('Must confirm passphrase')
        : Yup.string(),
  ),
});

export const walletRecoveryPassphraseInitialValues = {
  mnemonicPassphrase: '',
  mnemonicPassphrase2: '',
};
export type WalletRecoveryPassphraseInput =
  typeof walletRecoveryPassphraseInitialValues;

function WalletRecoveryPassphraseForm() {
  const { t } = useTranslation('wallet');
  const { getFieldProps, touched, errors } =
    useFormikContext<WalletRecoveryPassphraseInput>();

  return (
    <>
      <Message
        info
        icon="info circle"
        header="Optional passphrase"
        content={
          <>
            <p>
              If you set a recovery passphrase when you created your wallet you
              must enter it here.
              <br />
              Otherwise skip this step.
            </p>
            <p>
              For more information about recovery passphrases{' '}
              <a
                rel="noopener noreferrer"
                href="https://wiki.trezor.io/Passphrase"
                target="_blank"
              >
                see here. <Icon name="external" size="small" />
              </a>
            </p>
          </>
        }
      />
      <Form.Input
        id="mnemonicPassphrase"
        label="Passphrase"
        placeholder="Passphrase"
        type="password"
        error={touched.mnemonicPassphrase && errors.mnemonicPassphrase}
        {...getFieldProps('mnemonicPassphrase')}
      />
      <Form.Input
        id="mnemonicPassphrase2"
        label="Confirm passphrase"
        placeholder="Confirm passphrase"
        type="password"
        error={errors.mnemonicPassphrase2}
        {...getFieldProps('mnemonicPassphrase2')}
      />
    </>
  );
}

export default WalletRecoveryPassphraseForm;
