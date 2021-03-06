import { Formik, FormikValues } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Container } from 'typedi';

import { useAuthenticatedWallet } from '@/hooks';
import { WalletService } from '@/internal';
import { capitalize } from '@/utils/fmt';

import WalletCreateWizard, {
  createInitialValues,
  createValidations,
} from '../WalletCreateWizard';
import WalletRestoreWizard, {
  restoreInitialValues,
  restoreValidations,
} from '../WalletRestoreWizard';

const initialState = {
  activeStep: 0,
};

function WalletActionForm() {
  const { t } = useTranslation(['common']);
  const [state, setState] = React.useState({ ...initialState });
  const navigate = useNavigate();
  const params = useParams();
  const walletService = Container.get(WalletService);
  const action = params.action as 'create' | 'restore';
  const { setAuthenticatedWallet } = useAuthenticatedWallet();

  /**
   * Handle create/restore wallet submission. Performs the following actions:
   *
   * - Creates the wallet/stores in database
   * - Generates secret seed from mnemonic, encrypts it and stores
   *
   * @param values Example of submitted 'local' wallet:
   *  {
   *    "name": "test",
   *    "password": "testing123",
   *    "passwordConfirm": "testing123",
   *    "mnemonicPassphrase": "test",
   *    "mnemonicPassphrase2": "test", (confirmation field)
   *    "phrase": [
   *        ...
   *        "words",
   *        "here"
   *        ...
   *    ]
   *  }
   */
  const handleSubmit = async (values: Record<string, any>) => {
    const { wallet, seed } = await walletService.create({
      name: values.name,
      password: values.password,
      mnemonic: values.phrase.join(' '),
      mnemonicPass: values.mnemonicPassphrase,
    });

    setAuthenticatedWallet({ wallet, seed });

    navigate(`/wallets/${wallet.id}`);
  };

  const totalSteps = {
    restore: 3,
    create: 4,
  }[action];

  const progressButtonText =
    state.activeStep === totalSteps - 1
      ? capitalize(t('common:finish'))
      : capitalize(t('common:continue'));

  const cancelButtonText =
    state.activeStep === 0
      ? capitalize(t('common:cancel'))
      : capitalize(t('common:back'));

  const resetState = () => {
    setState({ ...initialState });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (state.activeStep === 0) {
      navigate('/wallets/add');

      return;
    }

    setActiveStep(state.activeStep - 1);
  };

  const setActiveStep = (activeStep: number) =>
    setState((prev) => ({ ...prev, activeStep }));

  const getValidationSchema = () => {
    if ((action as any) === 'restore') {
      return restoreValidations[state.activeStep];
    }

    return createValidations[state.activeStep];
  };

  const getInitialValues = () => {
    if ((action as any) === 'restore') {
      return { ...restoreInitialValues };
    }

    return { ...createInitialValues };
  };

  return (
    <Formik
      initialValues={getInitialValues() as FormikValues}
      validationSchema={getValidationSchema()}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // last form submit
          if (state.activeStep === totalSteps - 1) {
            try {
              await handleSubmit(values);
            } catch (e) {
              // display a error
              // resetForm();
            }
          } else {
            setActiveStep(state.activeStep + 1);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form id="walletForm" onSubmit={formik.handleSubmit}>
          <Segment style={{ marginTop: 20 }}>
            {(action as any) === 'restore' ? (
              <WalletRestoreWizard activeStep={state.activeStep} />
            ) : (
              <WalletCreateWizard activeStep={state.activeStep} />
            )}
            <div style={{ marginTop: 10 }}>
              <Button
                id="submitWalletForm"
                type="submit"
                primary
                loading={formik.isSubmitting}
              >
                {progressButtonText}
              </Button>
              <Button
                tabIndex={100}
                onClick={handleCancel}
                loading={formik.isSubmitting}
              >
                {cancelButtonText}
              </Button>
            </div>
          </Segment>
        </Form>
      )}
    </Formik>
  );
}

export default WalletActionForm;
