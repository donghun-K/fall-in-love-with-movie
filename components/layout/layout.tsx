import type { FC } from 'react';
import { Fragment } from 'react';
import NavBar from './nav-bar';

interface layoutProps {
  children?: JSX.Element;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <main>{children}</main>
    </Fragment>
  );
};
export default Layout;
