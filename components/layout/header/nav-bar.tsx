import { AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Image from 'next/image';
import { Box } from '@mui/system';
import SearchBar from './search-bar';

const NavBar = () => {
  return (
    <AppBar
      position='sticky'
      color='nav'
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
              <Button
                variant='text'
                sx={{
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Log In
                <LoginIcon fontSize='large' />
              </Button>
              <Button
                variant='text'
                sx={{
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Sign Up
                <HowToRegIcon fontSize='large' />
              </Button>
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
