import { Outlet } from 'react-router-dom';
import AppBarTop from '../components/AppBarTop';

export function Root() {
  return (
    <>
      <AppBarTop />
      <Outlet />
    </>
  );
}
