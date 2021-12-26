import { useTranslation } from 'react-i18next';
import { Step } from 'semantic-ui-react';
import WalletDetailsForm, {
  walletDetailsInitialValues,
  walletDetailsValidationSchema,
} from '../WalletDetailsForm';
import WalletRecoveryPhraseRecord from './WalletRecoveryPhraseRecord';

export const createValidations = [walletDetailsValidationSchema];

export const createInitialValues = {
  ...walletDetailsInitialValues,
};

export interface WalletCreateWizardProps {
  activeStep: number;
}

function WalletCreateWizard({ activeStep }: WalletCreateWizardProps) {
  const { t } = useTranslation('walletCreateRestore');

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return <WalletDetailsForm />;
      case 1:
        return <WalletRecoveryPhraseRecord />;
    }
  };

  const stepDetails = ['detailsForm', 'phraseRecordForm'].map((f) => ({
    title: t(`${f}.title`),
    description: t(`${f}.description`),
  }));

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

export default WalletCreateWizard;
