import type { FC } from 'react';
import { Fragment } from 'react';
import NavBar from './header/nav-bar';
import Grid from '@mui/material/Grid';
interface layoutProps {
  children?: JSX.Element;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <Grid
        container
        spacing={3}
        sx={{
          background: '#000000',
          minHeight: 'calc(100vh - 56px)',
        }}
      >
        <Grid item xs={0} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8}>
          {children}
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </Fragment>
  );
};
export default Layout;
