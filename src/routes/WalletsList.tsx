import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Container,
  Dimmer,
  Header,
  Loader,
  Segment,
  Image,
} from 'semantic-ui-react';
import AppBarTop from '../components/AppBarTop';
import { Wallet } from '../entities';
import { BackendProvider, SensitiveModeProvider, useBackend } from '../hooks';
import { capitalize } from '../utils/formatting';

interface WalletWithSummary extends Wallet {
  accountCount: number;
  balance: number;
}

function WalletsList() {
  const { t } = useTranslation(['walletsList', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  const [wallets, setWallets] = useState<WalletWithSummary[]>([]);
  const backend = useBackend();

  useEffect(() => {
    // perf: possible performance hotspot
    // First we fetch all wallets
    // then for each wallet we fetch all accounts to get accountCount + balance
    // This could be more efficient using a better query and SQL count+sum functions
    // I think users will likely use a small amount of wallets and small amount of accounts
    // per wallet so it may never be a problem
    const fetchEntities = async () => {
      const walletsResp = await backend.listWallets();
      const walletsWithSummary = await Promise.allSettled(
        walletsResp.map(async (wallet): Promise<WalletWithSummary> => {
          const accounts = await backend.accountsForWallet(wallet.id);
          const balance = 1337;

          return { ...wallet, accountCount: accounts.length, balance };
        }),
      );
      // TODO: handle failures
      const successWallets = walletsWithSummary
        .filter((p) => p.status === 'fulfilled')
        .map((w) => (w as PromiseFulfilledResult<WalletWithSummary>).value);

      setWallets(successWallets);
    };

    fetchEntities().finally(() => setIsLoading(false));
  }, [backend]);

  return (
    <>
      <BackendProvider>
        <SensitiveModeProvider>
          <AppBarTop />
          <Container text style={{ marginTop: 30 }}>
            <Header dividing as="h2">
              {t('walletsList:walletsListTitle')}
            </Header>
            {!isLoading ? (
              // TODO: is it possible to be here with no wallets?
              <Card.Group centered itemsPerRow={1}>
                {wallets.map((wallet) => (
                  <Card key={wallet.id}>
                    <Card.Content>
                      <Card.Header>{wallet.name}</Card.Header>
                      <Card.Description>wallet stuff</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            ) : (
              <Segment>
                <Dimmer active={isLoading} inverted>
                  <Loader inverted content={capitalize(t('common:loading'))} />
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            )}
          </Container>
        </SensitiveModeProvider>
      </BackendProvider>
    </>
  );
}

export default WalletsList;
