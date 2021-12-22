import { Button, Menu, Segment } from 'semantic-ui-react';
import { useSensitiveMode } from '../../hooks';

// placeholder
const getSettings = () => ({
  network: 'Testnet',
  operatingMode: 'Light',
});

export interface AppBarTopProps {
  attached?: boolean | 'top' | 'bottom' | undefined;
}

function AppBarTop({ attached }: AppBarTopProps) {
  const { sensitiveModeEnabled, setSensitiveMode } = useSensitiveMode();
  const { network, operatingMode } = getSettings();

  console.log(useSensitiveMode());
  console.log(sensitiveModeEnabled, setSensitiveMode);

  return (
    <>
      <Segment inverted attached={attached}>
        <Menu inverted secondary>
          <Menu.Item header>Wallet X</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>{network}</Menu.Item>
            <Menu.Item>{operatingMode} mode</Menu.Item>
            <Menu.Item icon="cog" />
            <Menu.Item
              icon={sensitiveModeEnabled ? 'eye slash' : 'eye'}
              onClick={() => setSensitiveMode(!sensitiveModeEnabled)}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
}

export default AppBarTop;
