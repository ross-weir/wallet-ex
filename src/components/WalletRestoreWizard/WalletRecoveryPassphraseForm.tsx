import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Box from '@kiwicom/orbit-components/lib/Box';
import Alert from '@kiwicom/orbit-components/lib/Alert';
import TextLink from '@kiwicom/orbit-components/lib/TextLink';
import Text from '@kiwicom/orbit-components/lib/Text';
import NewWindow from '@kiwicom/orbit-components/lib/icons/NewWindow';
import { useTranslation } from 'react-i18next';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string(),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match',
  ),
});

const initialValues = { password: '', passwordConfirm: '' };
export type WalletRecoveryPassphraseInput = typeof initialValues;

interface Props {
  data?: WalletRecoveryPassphraseInput;
  confirmButtonText: string;
  cancelButtonText: string;
  onSubmit?: (values: WalletRecoveryPassphraseInput) => void;
  onCancel?: (form: WalletRecoveryPassphraseInput) => void;
}

function WalletRecoveryPassphraseForm({
  data = initialValues,
  onSubmit,
  onCancel,
  cancelButtonText,
  confirmButtonText,
}: Props) {
  const { t } = useTranslation('wallet');

  const onFormCancel = (input: WalletRecoveryPassphraseInput) => {
    if (onCancel) {
      onCancel({ ...input });
    }
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        if (onSubmit) {
          onSubmit({ ...values });
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="large">
            <Heading>Recovery Passphrase</Heading>
            <Alert icon title="Optional recovery passphrase">
              <Text>
                If you set a recovery passphrase when you created your wallet
                you must enter it here. Otherwise skip this step.
              </Text>
              <Text>
                For more information about recovery passphrases{' '}
                <TextLink
                  external
                  rel="noopener noreferrer"
                  href="https://wiki.trezor.io/Passphrase"
                >
                  see here. <NewWindow size="small" />
                </TextLink>
              </Text>
            </Alert>
            {/* @ts-ignore */}
            <InputField
              id="password"
              label="Passphrase"
              placeholder="Passphrase"
              type="password"
              error={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps('password')}
            />
            {/* @ts-ignore */}
            <InputField
              id="passwordConfirm"
              label="Confirm passphrase"
              placeholder="Confirm passphrase"
              type="password"
              error={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
              {...formik.getFieldProps('passwordConfirm')}
            />
            <Box display="flex" justify="between">
              <Button
                type="secondary"
                onClick={() => onFormCancel(formik.values)}
              >
                {cancelButtonText}
              </Button>
              <Button submit>{confirmButtonText}</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Formik>
  );
}

export default WalletRecoveryPassphraseForm;
