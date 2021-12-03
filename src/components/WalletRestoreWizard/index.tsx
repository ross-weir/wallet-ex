import WalletDetailsForm, {
  walletDetailsInitialValues,
  walletDetailsValidationSchema,
} from '../WalletDetailsForm';
import WalletRecoveryPhraseForm from './WalletRecoveryPhraseForm';
import WalletRecoveryPassphraseForm, {
  walletRecoveryPassphraseInitialValues,
  walletRecoveryPassphraseValidationSchema,
} from './WalletRecoveryPassphraseForm';
import WalletConfirmation from '../WalletConfirmation';
import { Step } from 'semantic-ui-react';

interface Props {
  activeStep: number;
  formik: any;
}

const steps = [
  {
    title: 'Wallet details',
    description: 'Enter wallet information',
  },
  {
    title: 'Recovery phrase',
    description: 'Enter wallet recovery phrase',
  },
  {
    title: 'Recovery passphrase',
    description: 'Enter wallet recovery passphrase',
  },
];

export const restoreValidations = [
  walletDetailsValidationSchema,
  undefined,
  walletRecoveryPassphraseValidationSchema,
];

export const restoreInitialValues = {
  ...walletDetailsInitialValues,
  ...walletRecoveryPassphraseInitialValues,
};

function WalletRestoreWizard({ activeStep }: Props) {
  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return <WalletDetailsForm />;
      case 1:
        return <WalletRecoveryPhraseForm />;
      case 2:
        return <WalletRecoveryPassphraseForm />;
    }
  };

  return (
    <>
      <Step.Group size="small" fluid>
        {steps.map((s, i) => (
          <Step
            key={s.title}
            active={i === activeStep}
            disabled={i > activeStep}
            title={s.title}
            description={s.description}
          />
        ))}
      </Step.Group>
      {renderForm()}
    </>
  );
}

export default WalletRestoreWizard;
