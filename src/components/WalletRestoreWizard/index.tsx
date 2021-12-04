import WalletDetailsForm, {
  walletDetailsInitialValues,
  walletDetailsValidationSchema,
} from '../WalletDetailsForm';
import WalletRecoveryPhraseForm, {
  walletRecoveryPhraseInitialState,
  walletRecoveryPhraseValidationSchema,
} from './WalletRecoveryPhraseForm';
import WalletRecoveryPassphraseForm, {
  walletRecoveryPassphraseInitialValues,
  walletRecoveryPassphraseValidationSchema,
} from './WalletRecoveryPassphraseForm';
import { Step } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
  activeStep: number;
  formik: any;
}

export const restoreValidations = [
  walletDetailsValidationSchema,
  walletRecoveryPhraseValidationSchema,
  walletRecoveryPassphraseValidationSchema,
];

export const restoreInitialValues = {
  ...walletDetailsInitialValues,
  ...walletRecoveryPassphraseInitialValues,
  ...walletRecoveryPhraseInitialState,
};

function WalletRestoreWizard({ activeStep }: Props) {
  const { t } = useTranslation('walletCreateRestore');

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

  // Looks up translations in `walletCreateRestore.json`
  const stepDetails = ['detailsForm', 'phraseForm', 'passphraseForm'].map(
    (f) => ({
      title: t(`${f}.title`),
      description: t(`${f}.description`),
    }),
  );

  return (
    <>
      <Step.Group size="small" fluid>
        {stepDetails.map((s, i) => (
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
