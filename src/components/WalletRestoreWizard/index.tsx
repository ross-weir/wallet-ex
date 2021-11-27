import React from 'react';
import Wizard, { WizardStep } from '@kiwicom/orbit-components/lib/Wizard';

function WalletRestoreWizard() {
  return (
    <Wizard id="wallet-restore-wizard" activeStep={2} completedSteps={2}>
      <WizardStep title="Wallet details" />
      <WizardStep title="Recovery phrase" />
    </Wizard>
  );
}

export default WalletRestoreWizard;
