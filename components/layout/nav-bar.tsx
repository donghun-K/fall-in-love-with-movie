import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Image from 'next/image';
import { Box } from '@mui/system';

const NavBar = () => {
  return (
    <AppBar
      position='sticky'
      color='secondary'
      sx={{
        display: 'flex',
        height: '80px',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Image
              src={'/images/logo/logo1.png'}
              width={163}
              height={60}
              alt='FILM'
            />
            <Box></Box>
          </Toolbar>
        </Grid>

        <Grid item xs={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
