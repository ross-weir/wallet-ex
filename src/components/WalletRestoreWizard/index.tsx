import { useState } from 'react';
import Box from '@kiwicom/orbit-components/lib/Box';
import Wizard, { WizardStep } from '@kiwicom/orbit-components/lib/Wizard';
import WalletDetailsForm, { WalletDetailsInput } from '../WalletDetailsForm';
import WalletRecoveryPhraseForm, {
  WalletRecoveryPhraseInput,
} from './WalletRecoveryPhraseForm';
import WalletRecoveryPassphraseForm, {
  WalletRecoveryPassphraseInput,
} from './WalletRecoveryPassphraseForm';
import WalletConfirmation from '../WalletConfirmation';

// On the last step emit the form data (the create wizard does this too so the parent component should create)

interface FormData {
  details: WalletDetailsInput;
  phrase: WalletRecoveryPhraseInput;
  passphrase: WalletRecoveryPassphraseInput;
}
type FormName = keyof FormData;

const initialFormData: Partial<FormData> = {};

interface Props {
  // All data needed to create the wallet has been collected
  onSubmit: (data: FormData) => void;
  // The user has completed all steps, the wizard is finished
  onCompleted: () => void;
  onCancel: () => void;
}

function WalletRestoreWizard({ onSubmit, onCompleted, onCancel }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({
    ...initialFormData,
  });

  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

  const onFormSubmit =
    (formName: FormName) =>
    (
      data:
        | WalletDetailsInput
        | WalletRecoveryPhraseInput
        | WalletRecoveryPassphraseInput,
    ) => {
      handleChangeStep(activeStep + 1);

      setFormData((prev) => ({
        ...prev,
        [formName]: { ...data },
      }));
    };

  const onFormCancel =
    (formName: FormName) =>
    (
      data:
        | WalletDetailsInput
        | WalletRecoveryPhraseInput
        | WalletRecoveryPassphraseInput,
    ) => {
      handleChangeStep(activeStep - 1);

      setFormData((prev) => ({
        ...prev,
        [formName]: { ...data },
      }));
    };

  const getBasePropsForForm = (formName: FormName) => {
    const props = {
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      onSubmit: onFormSubmit(formName),
      onCancel: onFormCancel(formName),
    };

    if (formData[formName]) {
      // @ts-ignore
      props.data = formData[formName];
    }

    return props;
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        // TODO: onCancel should show the form instead of going back a step
        return (
          <WalletDetailsForm
            {...getBasePropsForForm('details')}
            onCancel={onCancel}
          />
        );
      case 1:
        return (
          <WalletRecoveryPhraseForm
            {...getBasePropsForForm('phrase')}
            cancelButtonText="Back"
          />
        );
      case 2:
        return (
          <WalletRecoveryPassphraseForm
            {...getBasePropsForForm('passphrase')}
            cancelButtonText="Back"
            onSubmit={(passphraseForm) => {
              const { onSubmit: onPassphraseSubmit } =
                getBasePropsForForm('passphrase');

              onPassphraseSubmit(passphraseForm);
              // by this point all the formdata will be present
              // trigger the creation of the wallet
              onSubmit(formData as FormData);
            }}
          />
        );
      case 3:
        return <WalletConfirmation action="Restored" onConfirm={onCompleted} />;
    }
  };

  return (
    <>
      <Wizard
        id="wallet-restore-wizard"
        activeStep={activeStep}
        completedSteps={activeStep}
        onChangeStep={handleChangeStep}
      >
        <WizardStep title="Wallet details" />
        <WizardStep title="Recovery phrase" />
        <WizardStep title="Recovery passphrase" />
        <WizardStep title="Confirmation" />
      </Wizard>
      <Box
        padding={{
          top: 'XLarge',
        }}
      >
        {renderContent()}
      </Box>
    </>
  );
}

export default WalletRestoreWizard;
