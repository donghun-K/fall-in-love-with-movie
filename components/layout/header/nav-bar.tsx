import {
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  Grid,
  Button,
  List,
  useMediaQuery,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Image from 'next/image';
import { Box } from '@mui/system';
import SearchBar from './search-bar';
import theme from '../../../src/theme';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import DrawerSearchBar from './drawer-search-bar';

const NavBar = () => {
  const { data: session, status } = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Grid item xs={0} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link href={'/'}>
              <Button>
                <Image
                  src={'/images/logo/logo1.png'}
                  width={isDownSm ? 146 : 160}
                  height={isDownSm ? 54 : 60}
                  alt='FILM'
                />
              </Button>
            </Link>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {isDownSm ? (
                <Button
                  variant='text'
                  sx={buttonSx}
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                >
                  <SearchRoundedIcon fontSize='large' />
                </Button>
              ) : (
                <SearchBar />
              )}

              {status === 'authenticated' ? (
                <Button
                  variant='text'
                  sx={buttonSx}
                  onClick={() => {
                    signOut({ redirect: false });
                  }}
                >
                  <LogoutIcon fontSize='large' />
                  {isUpLg && (
                    <Typography variant='subtitle2' pt={2} ml={0.5}>
                      Sign Out
                    </Typography>
                  )}
                </Button>
              ) : (
                <Link href={'/auth'}>
                  <Button variant='text' sx={buttonSx}>
                    {isUpLg && (
                      <Typography variant='subtitle2' pt={2} mr={0.5}>
                        Sign In
                      </Typography>
                    )}
                    <LoginIcon fontSize='large' />
                  </Button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
      <Drawer
        anchor='top'
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#111111',
            padding: '2rem 0',
          }}
        >
          <DrawerSearchBar />
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
