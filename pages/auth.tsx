import { Box, Button, Link, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { NextPage } from 'next/types';
import { flexbox } from '@mui/system';
import { withTheme } from '@emotion/react';

const AuthPage: NextPage = () => {
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
      color: 'theme.pallete.primary.main',
    },
    '& .MuiInput-root:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'primary.main',
    },
    '&:hover': {
      '& .MuiInput-root:before': {
        borderBottomColor: 'white',
      },
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
            Sign In
          </Typography>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
                width: '120px',
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  mr: 1,
                  fontWeight: 'bold',
                }}
              >
                Sign In
              </Typography>
              <LoginIcon
                sx={{
                  color: 'white',
                }}
              />
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
            >
              Create an Account
            </Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AuthPage;
