import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NextPage } from 'next/types';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const AuthPage: NextPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userConfirmPw, setUserConfirmPw] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  async function createUser(name: string, email: string, password: string) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setSnackbarMsg(data.message || 'Sign Up failed');
      setSnackbarOpen(true);
      return undefined;
    } else {
      return data;
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSignIn) {
      if (userEmail === '') {
        setSnackbarMsg('Enter your Email');
        setSnackbarOpen(true);
        return;
      }
      if (userPw.length < 8) {
        setSnackbarMsg('Check your Password!');
        setSnackbarOpen(true);
        return;
      }
      const result = await signIn('credentials', {
        redirect: false,
        email: userEmail,
        password: userPw,
      });
      if (result === undefined) {
        return;
      }
      if (!result.error) {
        setDialogOpen(true);
      } else {
        setSnackbarMsg(result.error);
        setSnackbarOpen(true);
      }
    }
    if (!isSignIn) {
      if (userName === '' || userName.length < 5) {
        setSnackbarMsg('Check your Username!');
        setSnackbarOpen(true);
        return;
      }
      if (userEmail === '') {
        setSnackbarMsg('Enter your Email');
        setSnackbarOpen(true);
        return;
      }
      if (userPw.length < 8) {
        setSnackbarMsg('Check your Password!');
        setSnackbarOpen(true);
        return;
      }
      if (userConfirmPw.length < 8) {
        setSnackbarMsg('Check your Confirm password!');
        setSnackbarOpen(true);
        return;
      }
      if (userPw !== userConfirmPw) {
        setSnackbarMsg('Password and Confirm password does not match!');
        setSnackbarOpen(true);
        return;
      }

      const result = await createUser(userName, userEmail, userPw);

      if (result) {
        setDialogOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const inputSx = {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'primary.main',
    },
    '& .MuiInput-root:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-root:hover:not(.Mui-diabled):before': {
      borderBottomColor: 'gray',
    },
    input: {
      color: 'white',
      '&::placeholder': {
        color: 'white',
      },
    },
    width: '400px',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '500px',
            ...(isSignIn ? {} : { height: '700px' }),
          }}
        >
          <Typography
            variant='h3'
            sx={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          {isSignIn ? null : (
            <TextField
              label='Username'
              type='text'
              variant='standard'
              placeholder='Enter your username'
              sx={inputSx}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          )}
          <TextField
            label='Email'
            type='email'
            variant='standard'
            placeholder='example@example.com'
            sx={inputSx}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <TextField
            label='Password'
            type='password'
            variant='standard'
            placeholder='Enter 8 character or more'
            sx={inputSx}
            onChange={(e) => {
              setUserPw(e.target.value);
            }}
          />
          {isSignIn ? null : (
            <TextField
              label='Confirm password'
              type='password'
              variant='standard'
              placeholder='Confirm your password'
              sx={inputSx}
              onChange={(e) => {
                setUserConfirmPw(e.target.value);
              }}
            />
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px',
            }}
          >
            <Button
              variant='contained'
              type='submit'
              sx={{
                p: 1.5,
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
                width: '130px',
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  mr: 1,
                  fontWeight: 'bold',
                }}
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </Typography>
              {isSignIn ? (
                <LoginIcon
                  sx={{
                    color: 'white',
                  }}
                />
              ) : (
                <HowToRegIcon
                  sx={{
                    color: 'white',
                  }}
                />
              )}
            </Button>
            <Link
              href='#'
              mt={1}
              underline='hover'
              sx={{
                color: 'gray',
                '&:hover': {
                  color: 'lightgray',
                },
              }}
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn
                ? "Don't have an account? Sign Up"
                : 'Sign In with existing account'}
            </Link>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert sx={{ width: '30rem' }} variant='filled' severity='error'>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#111111',
          },
        }}
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle sx={{ backgroundColor: '#111111', color: 'white' }}>
          {'Success!'}
        </DialogTitle>
        <DialogActions
          sx={{
            backgroundColor: '#111111',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => {
              handleDialogClose();
              if (isSignIn) {
                router.replace('/');
              } else {
                setIsSignIn(true);
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthPage;
