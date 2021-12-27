import { Formik, FormikValues } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form } from 'semantic-ui-react';
import { capitalize } from '../../utils/formatting';
import WalletCreateWizard, {
  createInitialValues,
  createValidations,
} from '../WalletCreateWizard';
import WalletRestoreWizard, {
  restoreInitialValues,
  restoreValidations,
} from '../WalletRestoreWizard';

interface Props {
  action: 'Create' | 'Restore';
  totalSteps: number;
  onCancel?: () => void;
  onSubmit?: (values: Record<string, any>) => void;
}

const initialState = {
  activeStep: 0,
  open: true,
};

function WalletActionForm({ action, totalSteps, onCancel, onSubmit }: Props) {
  const { t } = useTranslation(['common']);
  const [state, setState] = React.useState({ ...initialState });

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
      if (onCancel) onCancel();
      setModalOpen(false);

      return;
    }

    setActiveStep(state.activeStep - 1);
  };

  const onModalClose = (resetForm: any) => {
    resetState();
    resetForm();
    if (onCancel) onCancel();
  };

  const setModalOpen = (open: boolean) =>
    setState((prev) => ({ ...prev, open }));

  const setActiveStep = (activeStep: number) =>
    setState((prev) => ({ ...prev, activeStep }));

  const getValidationSchema = () => {
    if (action === 'Restore') {
      return restoreValidations[state.activeStep];
    }

    return createValidations[state.activeStep];
  };

  const getInitialValues = () => {
    if (action === 'Restore') {
      return { ...restoreInitialValues };
    }

    return { ...createInitialValues };
  };

  return (
    <Formik
      initialValues={getInitialValues() as FormikValues}
      validationSchema={getValidationSchema()}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        setActiveStep(state.activeStep + 1);

        // last form submit
        if (state.activeStep === totalSteps - 1) {
          if (onSubmit) onSubmit(values);

          resetState();
          resetForm();
        }
      }}
    >
      {(formik) => (
        <Modal
          as={Form}
          size="large"
          open={state.open}
          closeIcon
          onClose={() => onModalClose(formik.resetForm)}
          onOpen={() => setModalOpen(true)}
          onSubmit={formik.handleSubmit}
        >
          <Modal.Header>{action} Wallet</Modal.Header>
          <Modal.Content>
            {action === 'Restore' ? (
              <WalletRestoreWizard activeStep={state.activeStep} />
            ) : (
              <WalletCreateWizard activeStep={state.activeStep} />
            )}
          </Modal.Content>
          <Modal.Actions>
            {/* Hack: Tab index to force cancel button tabbed after submit button */}
            <Button tabIndex={100} onClick={handleCancel}>
              {cancelButtonText}
            </Button>
            <Button type="submit" primary>
              {progressButtonText}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
}

export default WalletActionForm;
