import { Menu, Segment } from 'semantic-ui-react';

// placeholder
const getSettings = () => ({
  network: 'Testnet',
  operatingMode: 'Light',
});

export interface AppBarTopProps {
  attached?: boolean | 'top' | 'bottom' | undefined;
}

function AppBarTop({ attached }: AppBarTopProps) {
  const { network, operatingMode } = getSettings();

  return (
    <>
      <Segment inverted attached={attached}>
        <Menu inverted secondary>
          <Menu.Item header>Wallet X</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>{network}</Menu.Item>
            <Menu.Item>{operatingMode} mode</Menu.Item>
            <Menu.Item icon="cog" />
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
}

export default AppBarTop;
