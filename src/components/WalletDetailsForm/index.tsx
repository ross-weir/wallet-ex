import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Box from '@kiwicom/orbit-components/lib/Box';
import { useTranslation } from 'react-i18next';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required(),
  password: Yup.string().min(8).required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
});

const initialValues = { name: '', password: '', passwordConfirm: '' };
export type WalletDetailsInput = typeof initialValues;

interface Props {
  data?: WalletDetailsInput;
  confirmButtonText: string;
  cancelButtonText: string;
  onSubmit?: (values: WalletDetailsInput) => void;
  onCancel?: (form: WalletDetailsInput) => void;
}

function WalletDetailsForm({
  data = initialValues,
  onSubmit,
  onCancel,
  cancelButtonText,
  confirmButtonText,
}: Props) {
  const { t } = useTranslation('wallet');

  const onFormCancel = (input: WalletDetailsInput) => {
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
            <Heading>Wallet details</Heading>
            {/* @ts-ignore */}
            <InputField
              id="name"
              label={t('detailsForm.label.name')}
              placeholder={t('detailsForm.placeholder.name')}
              error={formik.touched.name && formik.errors.name}
              {...formik.getFieldProps('name')}
              required
            />
            {/* @ts-ignore */}
            <InputField
              id="password"
              label={t('detailsForm.label.password1')}
              placeholder={t('detailsForm.placeholder.password1')}
              type="password"
              error={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps('password')}
              required
            />
            {/* @ts-ignore */}
            <InputField
              id="passwordConfirm"
              label={t('detailsForm.label.password2')}
              placeholder={t('detailsForm.placeholder.password2')}
              type="password"
              error={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
              {...formik.getFieldProps('passwordConfirm')}
              required
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

export default WalletDetailsForm;
