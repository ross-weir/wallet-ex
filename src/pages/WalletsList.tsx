import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Segment,
} from 'semantic-ui-react';
import { Container as IocContainer } from 'typedi';

import WalletsListPasswordModal from '@/components/WalletsListPasswordModal';
import { Wallet, WalletService } from '@/entities';
import { capitalize } from '@/utils/fmt';

function WalletsList() {
  const { t } = useTranslation(['walletsList', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>();
  const navigate = useNavigate();
  const walletService = IocContainer.get(WalletService);

  const getWallets = () => {
    walletService
      .list()
      .then(setWallets)
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    // walletService
    //   .list()
    //   .then(setWallets)
    //   .finally(() => setIsLoading(false));

    walletService.findOne(1).then(console.log);
  }, []);

  // return (
  //   <>
  //     <Button onClick={getWallets}>Click</Button>
  //     {wallets.length && <p>{wallets[0].name}</p>}
  //   </>
  // );

  return (
    <>
      <Container text style={{ marginTop: 30 }}>
        <Grid columns={2}>
          <Grid.Column verticalAlign="middle">
            <Header as="h2">{t('walletsList:walletsListTitle')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Button
              icon
              labelPosition="left"
              primary
              size="tiny"
              floated="right"
              onClick={() => navigate('/wallets/add')}
            >
              <Icon name="add" />
              {t('common:addWallet')}
            </Button>
          </Grid.Column>
        </Grid>
        <Divider />
        {!isLoading ? (
          // TODO: is it possible to be here with no wallets?
          <>
            <Card.Group centered itemsPerRow={1}>
              {wallets.map((wallet) => (
                <Card key={wallet.id} onClick={() => setSelectedWallet(wallet)}>
                  <Card.Content>
                    <Card.Header>{wallet.name}</Card.Header>
                    <Card.Description>wallet stuff</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
            {!!selectedWallet && (
              <WalletsListPasswordModal
                wallet={selectedWallet!}
                onCancel={() => setSelectedWallet(undefined)}
              />
            )}
          </>
        ) : (
          <Segment>
            <Dimmer active={isLoading} inverted>
              <Loader inverted content={capitalize(t('common:loading'))} />
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
      </Container>
    </>
  );
}

export default WalletsList;
