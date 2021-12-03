import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Form } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

export const walletDetailsValidationSchema = Yup.object({
  name: Yup.string().required(),
  password: Yup.string().min(8).required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
});

export const walletDetailsInitialValues = {
  name: '',
  password: '',
  passwordConfirm: '',
};
export type WalletDetailsInput = typeof walletDetailsInitialValues;

function WalletDetailsForm() {
  const { t } = useTranslation('wallet');
  const { getFieldProps, touched, errors } =
    useFormikContext<WalletDetailsInput>();

  return (
    <>
      <Form.Input
        id="name"
        label={t('detailsForm.label.name')}
        placeholder={t('detailsForm.placeholder.name')}
        error={touched.name && errors.name}
        {...getFieldProps('name')}
        required
      />
      <Form.Input
        id="password"
        label={t('detailsForm.label.password1')}
        placeholder={t('detailsForm.placeholder.password1')}
        type="password"
        error={touched.password && errors.password}
        {...getFieldProps('password')}
        required
      />
      <Form.Input
        id="passwordConfirm"
        label={t('detailsForm.label.password2')}
        placeholder={t('detailsForm.placeholder.password2')}
        type="password"
        error={touched.passwordConfirm && errors.passwordConfirm}
        {...getFieldProps('passwordConfirm')}
        required
      />
    </>
  );
}

export default WalletDetailsForm;
