import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

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
        <Form onSubmit={formik.handleSubmit}>
          <Header as="h1">Wallet details</Header>
          <Form.Input
            id="name"
            label={t('detailsForm.label.name')}
            placeholder={t('detailsForm.placeholder.name')}
            error={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps('name')}
            required
          />
          <Form.Input
            id="password"
            label={t('detailsForm.label.password1')}
            placeholder={t('detailsForm.placeholder.password1')}
            type="password"
            error={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
            required
          />
          <Form.Input
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
          <Grid columns={2} stackable>
            <Grid.Column>
              <Button onClick={() => onFormCancel(formik.values)}>
                {cancelButtonText}
              </Button>
            </Grid.Column>
            <Grid.Column>
              {/* Add `fluid` only for mobile devices */}
              <Button type="submit" floated="right" primary>
                {confirmButtonText}
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default WalletDetailsForm;
