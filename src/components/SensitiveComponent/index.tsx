import { Dimmer } from 'semantic-ui-react';

import { useSensitiveMode } from '../../hooks';

// Blurs text for sensitive elements
// Such as balances, addresses, transactions, etc
function SensitiveComponent({ children }: { children: React.ReactNode }) {
  const { sensitiveModeEnabled } = useSensitiveMode();

  return (
    <Dimmer.Dimmable blurring dimmed={sensitiveModeEnabled}>
      <Dimmer inverted active={sensitiveModeEnabled} />
      <div>{children}</div>
    </Dimmer.Dimmable>
  );
}

export default SensitiveComponent;
