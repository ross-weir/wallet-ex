import { Container, Header } from 'semantic-ui-react';

export function FirstUse() {
  // 1. 'welcome' page, select language -> cta button: continue
  return (
    <>
      <Container>
        <Header>Welcome to Wallet Ex</Header>
        <p>Lets get started</p>
        version: {process.env.VERSION}
      </Container>
    </>
  );
}
