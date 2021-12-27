import { useTranslation } from 'react-i18next';
import { Step } from 'semantic-ui-react';
import WalletDetailsForm, {
  walletDetailsInitialValues,
  walletDetailsValidationSchema,
} from '../WalletDetailsForm';
import WalletRecoveryPhraseConfirm, {
  walletRecoveryPhraseConfirmInitialState,
} from './WalletRecoveryPhraseConfirm';
import WalletRecoveryPhraseRecord, {
  walletRecoveryPhraseRecordInitialState,
} from './WalletRecoveryPhraseRecord';

export const createValidations = [
  walletDetailsValidationSchema,
  undefined, // no validation needed for record phrase step
  undefined, // phrase confirmation validation done in-component
];

export const createInitialValues = {
  ...walletDetailsInitialValues,
  ...walletRecoveryPhraseRecordInitialState,
  ...walletRecoveryPhraseConfirmInitialState,
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
      case 2:
        return <WalletRecoveryPhraseConfirm />;
    }
  };

  const stepDetails = [
    'detailsForm',
    'phraseRecordForm',
    'phraseConfirmForm',
  ].map((f) => ({
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
