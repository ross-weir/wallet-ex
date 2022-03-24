import { Outlet, useLocation, useNavigate } from 'react-router';
import { Container, Header, Breadcrumb } from 'semantic-ui-react';
import { capitalize } from '../utils/fmt';

function AddWallet() {
  const navigate = useNavigate();
  const location = useLocation();

  const Breadcrumbs = () => {
    const parts = location.pathname.split('/');

    // remove empty leading element
    parts.shift();

    return (
      <Breadcrumb size="small">
        {parts.map((path, idx) => {
          const isLast = idx === parts.length - 1;
          let href = '';
          let onClick;

          if (!isLast) {
            href += '/';
            href += parts
              .reduce((prev: string[], curr: string, i) => {
                if (i > idx) {
                  return prev;
                }

                prev.push(curr);
                return prev;
              }, [])
              .join('/');

            onClick = () => navigate(href);
          }

          return (
            <>
              <Breadcrumb.Section
                link={!isLast}
                active={isLast}
                onClick={onClick}
              >
                {capitalize(path)}
              </Breadcrumb.Section>
              {!isLast && <Breadcrumb.Divider />}
            </>
          );
        })}
      </Breadcrumb>
    );
  };

  return (
    <>
      <Container style={{ marginTop: 30 }}>
        <Header as="h2" content="Add Wallet" />
        {Breadcrumbs()}
        <Outlet />
      </Container>
    </>
  );
}

export default AddWallet;
