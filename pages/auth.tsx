import { Box, Button, Link, TextField, Typography } from '@mui/material';
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
  const [userPassword, setUserPassword] = useState('');
  const router = useRouter();

  async function createUser(email: string, password: string) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    return data;
  }

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // if (isSignIn) {
    //   const result = await signIn('credentials', {
    //     redirect: false,
    //     email: 'dora',
    //     password: 'dora',
    //   });
    // }
    if (!isSignIn) {
      try {
        const result = createUser(userEmail, userPassword);
      } catch (error) {
        console.log(error);
      }
    }
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
      <form onSubmit={submitHandler}>
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
              setUserPassword(e.target.value);
            }}
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
