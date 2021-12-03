import { Formik, useFormikContext } from 'formik';
import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import WalletRestoreWizard, {
  restoreInitialValues,
  restoreValidations,
} from '../WalletRestoreWizard';

interface Props {
  action: 'Create' | 'Restore';
  totalSteps: number;
}

const initialState = {
  activeStep: 0,
  open: false,
};

function WalletActionForm({ action, totalSteps }: Props) {
  const [state, setState] = React.useState({ ...initialState });

  const progressButtonText =
    state.activeStep === totalSteps - 1 ? 'Finish' : 'Continue';

  const cancelButtonText = state.activeStep === 0 ? 'Cancel' : 'Back';

  const resetState = () => {
    setState({ ...initialState });
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (state.activeStep === 0) {
      setModalOpen(false);

      return;
    }

    setActiveStep(state.activeStep - 1);
  };

  const onModalClose = (resetForm) => {
    resetState();
    resetForm();
  };

  const setModalOpen = (open: boolean) =>
    setState((prev) => ({ ...prev, open }));

  const setActiveStep = (activeStep: number) =>
    setState((prev) => ({ ...prev, activeStep }));

  const getValidationSchema = () => {
    if (action === 'Restore') {
      return restoreValidations[state.activeStep];
    }
  };

  const getInitialValues = () => {
    if (action === 'Restore') {
      return { ...restoreInitialValues };
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={getValidationSchema()}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        setActiveStep(state.activeStep + 1);

        // last form submit
        if (state.activeStep === totalSteps - 1) {
          // do stuff with `values`
          console.log(values);

          resetState();
          resetForm();
        }
      }}
    >
      {(formik) => (
        <Modal
          as={Form}
          size="small"
          open={state.open}
          closeIcon
          onClose={() => onModalClose(formik.resetForm)}
          onOpen={() => setModalOpen(true)}
          onSubmit={formik.handleSubmit}
          trigger={<Button>Modal</Button>}
        >
          <Modal.Header>{action} Wallet</Modal.Header>
          <Modal.Content>
            {action === 'Restore' ? (
              <WalletRestoreWizard
                activeStep={state.activeStep}
                formik={formik}
              />
            ) : (
              <p>nun</p>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onCancel}>{cancelButtonText}</Button>
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
