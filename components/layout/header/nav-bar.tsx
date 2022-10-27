import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Image from 'next/image';
import { Box } from '@mui/system';
import SearchBar from './search-bar';
import theme from '../../../src/theme';

const NavBar = () => {
  const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));

  const buttonSx = {
    height: 50,
    '&:hover': { color: 'primary.light' },
  };

  return (
    <AppBar
      position='sticky'
      color='nav'
      sx={{
        display: 'flex',
        height: '80px',
        justifyContent: 'center',
        boxShadow: (theme) => `0 10px 10px ${theme.palette.nav.main}`,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Image
              src={'/images/logo/logo1.png'}
              width={160}
              height={60}
              alt='FILM'
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <SearchBar />
              <Button variant='text' sx={buttonSx}>
                {isUpLg && (
                  <Typography variant='subtitle2' pt={2} mr={0.5}>
                    Sign In
                  </Typography>
                )}
                <LoginIcon fontSize='large' />
              </Button>
              <Button variant='text' sx={buttonSx}>
                {isUpLg && (
                  <Typography variant='subtitle2' pt={2} mr={0.5}>
                    Sign Up
                  </Typography>
                )}
                <HowToRegIcon fontSize='large' />
              </Button>
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
