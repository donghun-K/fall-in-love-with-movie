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
        sx={{ background: '#000000', minHeight: '100vh' }}
      >
        <Grid item xs={2} />
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Fragment>
  );
};
export default Layout;
