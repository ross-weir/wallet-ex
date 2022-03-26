import { Outlet, useLocation } from 'react-router';
import { Container, Header } from 'semantic-ui-react';

import { capitalize } from '@/utils/fmt';

function AddWallet() {
  const location = useLocation();

  const urlParts = location.pathname.split('/');
  // This will be either 'Add' | 'Create' | 'Restore'
  const action = capitalize(urlParts[urlParts.length - 1]);

  return (
    <>
      <Container style={{ marginTop: 30 }}>
        <Header as="h2" content={`${action} Wallet`} />
        <Outlet />
      </Container>
    </>
  );
}

export default AddWallet;
