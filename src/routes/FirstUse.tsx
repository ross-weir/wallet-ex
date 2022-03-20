import { Container, Header } from 'semantic-ui-react';
import AppBarTop from '../components/AppBarTop';

export function FirstUse() {
  // 1. 'welcome' page, select language -> cta button: continue
  return (
    <>
      <AppBarTop />
      <Container>
        <Header>Welcome to Wallet Ex</Header>
        <p>Lets get started</p>
        version: {process.env.VERSION}
      </Container>
    </>
  );
}
