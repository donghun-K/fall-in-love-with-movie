import { Box, Button, Link, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NextPage } from 'next/types';
import { useState } from 'react';

const AuthPage: NextPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
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
            />
          )}
          <TextField
            label='Email'
            type='email'
            variant='standard'
            placeholder='example@example.com'
            sx={inputSx}
          />
          <TextField
            label='Password'
            type='password'
            variant='standard'
            placeholder='Enter 8 character or more'
            sx={inputSx}
          />
          {isSignIn ? null : (
            <TextField
              label='Confirm password'
              type='password'
              variant='standard'
              placeholder='Confirm your password'
              sx={inputSx}
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
    </Box>
  );
};

export default AuthPage;
