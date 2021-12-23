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
  const { t } = useTranslation('walletCreateRestore');
  const { getFieldProps, touched, errors } =
    useFormikContext<WalletRecoveryPassphraseInput>();

  const getT = (key: string): string => t(`passphraseForm.${key}`);

  return (
    <>
      <Message
        info
        icon="info circle"
        header="Optional passphrase"
        content={
          <>
            <p dangerouslySetInnerHTML={{ __html: getT('info') }} />
            <p>
              {getT('moreInfo')}{' '}
              <a
                rel="noopener noreferrer"
                href="https://wiki.trezor.io/Passphrase"
                target="_blank"
              >
                {getT('see')}. <Icon name="external" size="small" />
              </a>
            </p>
          </>
        }
      />
      <Form.Input
        id="mnemonicPassphrase"
        label={getT('mnemonicPassphrase.label')}
        placeholder={getT('mnemonicPassphrase.placeholder')}
        type="password"
        error={touched.mnemonicPassphrase && errors.mnemonicPassphrase}
        {...getFieldProps('mnemonicPassphrase')}
      />
      <Form.Input
        id="mnemonicPassphrase2"
        label={getT('mnemonicPassphrase2.label')}
        placeholder={getT('mnemonicPassphrase2.placeholder')}
        type="password"
        error={errors.mnemonicPassphrase2}
        {...getFieldProps('mnemonicPassphrase2')}
      />
    </>
  );
}

export default WalletRecoveryPassphraseForm;
