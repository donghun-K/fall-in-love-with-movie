import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Snackbar,
  useMediaQuery,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import theme from '../src/theme';
import Head from 'next/head';

const AuthPage: NextPage = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSignIn, setIsSignIn] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userConfirmPw, setUserConfirmPw] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.back();
    }
  }, [router, status]);

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
      setSnackbarMsg(data.message || '회원가입에 실패했습니다.');
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
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (isSignIn) {
      if (userEmail === '' || !regex.test(userEmail)) {
        setSnackbarMsg('이메일을 확인해주세요.');
        setSnackbarOpen(true);
        return;
      }
      if (userPw.length < 8) {
        setSnackbarMsg('비밀번호를 8자 이상 입력해주세요.');
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
        alert('반갑습니다 :)');
      } else {
        setSnackbarMsg(result.error);
        setSnackbarOpen(true);
      }
    }
    if (!isSignIn) {
      if (userName.length < 3) {
        setSnackbarMsg('이름을 3자 이상 입력해주세요.');
        setSnackbarOpen(true);
        return;
      }
      if (userEmail === '' || !regex.test(userEmail)) {
        setSnackbarMsg('이메일을 확인해주세요.');
        setSnackbarOpen(true);
        return;
      }
      if (userPw.length < 8) {
        setSnackbarMsg('비밀번호를 8자 이상 입력해주세요.');
        setSnackbarOpen(true);
        return;
      }
      if (userConfirmPw.length < 8) {
        setSnackbarMsg('비밀번호 확인을 8자 이상 입력해주세요.');
        setSnackbarOpen(true);
        return;
      }
      if (userPw !== userConfirmPw) {
        setSnackbarMsg('비밀번호와 비밀번호 확인의 값이 일치하지 않습니다.');
        setSnackbarOpen(true);
        return;
      }

      const result = await createUser(userName, userEmail, userPw);

      if (result) {
        alert('회원가입에 성공하였습니다!');
        setIsSignIn(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const inputSx = {
    '& label': {
      color: 'white',
    },
    '& .MuiInput-root:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-root:hover:not(.Mui-diabled):before': {
      borderBottomColor: 'white',
    },
    input: {
      color: 'white',
      '&::placeholder': {
        color: 'white',
      },
    },
    width: isDownSm ? '300px' : '400px',
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
      <Head>
        <title>Auth</title>
      </Head>
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
            type='text'
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
              {isSignIn ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
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
    </Box>
  );
};

export default AuthPage;
