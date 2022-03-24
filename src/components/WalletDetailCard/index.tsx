import { Grid, Image, Segment } from 'semantic-ui-react';

import { Wallet } from '../../entities';
import walletImg from './wallet.svg';

interface Props {
  wallet: Wallet;
  attached?: boolean | 'top' | 'bottom' | undefined;
}

function WalletDetailCard({ wallet, attached }: Props) {
  return (
    // <Card onClick={() => null} style={{ boxShadow: 'none' }}>
    //   <Card.Content>
    //     <Image
    //       src={walletImg}
    //       size="mini"
    //       floated="left"
    //       style={{ marginRight: 20 }}
    //     />
    //     <Card.Header>{wallet.name}</Card.Header>
    //     <Card.Meta>3 Accounts · $1,000.00</Card.Meta>
    //   </Card.Content>
    // </Card>
    <Segment attached={attached}>
      <Grid stackable>
        <Grid.Column width={1}>
          <Image src={walletImg} size="mini" floated="left" />
        </Grid.Column>
        <Grid.Column verticalAlign="middle" floated="left">
          <Grid.Row>{wallet.name}</Grid.Row>
          <Grid.Row>3 Accounts · $1,000.00</Grid.Row>
        </Grid.Column>
        {/* Attempt at dropdown with wallets */}
        {/* <Grid.Column verticalAlign="middle">
          <Dropdown
            pointing="left"
            className="link item"
            icon="angle right"
            item
            simple
          >
            <Dropdown.Menu>
              <Dropdown.Item>Test</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column> */}
      </Grid>
    </Segment>
  );
}

export default WalletDetailCard;
