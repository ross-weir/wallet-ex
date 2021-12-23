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
  const { t } = useTranslation('walletCreateRestore');
  const { getFieldProps, touched, errors } =
    useFormikContext<WalletDetailsInput>();

  const getT = (key: string): string => t(`detailsForm.${key}`);

  return (
    <>
      <Form.Input
        id="name"
        label={getT('name.label')}
        placeholder={getT('name.placeholder')}
        error={touched.name && errors.name}
        {...getFieldProps('name')}
        required
      />
      <Form.Input
        id="password"
        label={getT('password.label')}
        placeholder={getT('password.placeholder')}
        type="password"
        error={touched.password && errors.password}
        {...getFieldProps('password')}
        required
      />
      <Form.Input
        id="passwordConfirm"
        label={getT('passwordConfirm.label')}
        placeholder={getT('passwordConfirm.placeholder')}
        type="password"
        error={touched.passwordConfirm && errors.passwordConfirm}
        {...getFieldProps('passwordConfirm')}
        required
      />
    </>
  );
}

export default WalletDetailsForm;
