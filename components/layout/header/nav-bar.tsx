import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Image from 'next/image';
import { Box } from '@mui/system';
import SearchBar from './search-bar';
import theme from '../../../src/theme';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { data: session, status } = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();

  const buttonSx = {
    height: 50,
    '&:hover': { color: 'primary.light' },
    h6: {
      fontWeight: 'bolder',
    },
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (searchInput === '') {
      return;
    }
    router.replace(`/search/${searchInput}`);
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
                  <MenuIcon fontSize='large' />
                </Button>
              ) : (
                <>
                  <SearchBar />
                  {status === 'authenticated' ? (
                    <>
                      <Link href={'/mypage'}>
                        <Button variant='text' sx={buttonSx}>
                          <AccountCircleIcon fontSize='large' />
                          {isUpLg && (
                            <Typography variant='subtitle2' pt={2} ml={0.5}>
                              My Page
                            </Typography>
                          )}
                        </Button>
                      </Link>
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
                    </>
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
                </>
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
        sx={{
          ul: {
            backgroundColor: (theme) => theme.palette.nav.main,
            color: (theme) => theme.palette.primary.light,
            'li div': {
              padding: '.5rem',
            },
            svg: {
              margin: '0 1rem',
              color: (theme) => theme.palette.primary.light,
            },
          },
        }}
      >
        {status === 'authenticated' ? (
          <>
            <Link href={'/mypage'}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Page' />
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setDrawerOpen(false);
                    signOut({ redirect: false });
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Sign Out' />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
          <Link href={'/auth'}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Sign In' />
                </ListItemButton>
              </ListItem>
            </List>
          </Link>
        )}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                setDialogOpen(true);
              }}
            >
              <ListItemIcon>
                <SearchRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Search' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#111111',
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Enter movie title'
              type='text'
              fullWidth
              variant='standard'
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              sx={{
                '& label': {
                  color: 'gray',
                },
                '& label.Mui-focused': {
                  color: 'primary.main',
                },
                '& .MuiInput-root:before': {
                  borderBottomColor: 'lightgray',
                },
                '& .MuiInputBase-root:hover:not(.Mui-diabled):before': {
                  borderBottomColor: 'gray',
                },
                input: {
                  color: 'white',
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type='submit' onClick={handleDialogClose}>
              Search
            </Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </AppBar>
  );
};

export default NavBar;
