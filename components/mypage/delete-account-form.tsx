import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import WarningIcon from '@mui/icons-material/Warning';
import theme from '../../src/theme';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import axios from 'axios';

const DeleteAccountForm = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: session } = useSession();

  const [userPw, setUserPw] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function deleteUser({
    password,
    username,
  }: {
    password: string;
    username: string;
  }) {
    if (userPw.length < 8) {
      setSnackbarMsg('비밀번호를 확인해주세요.');
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    const response = await axios.post('/api/mypage/withdrawal', {
      username,
      password,
    });
    setIsLoading(false);
    if (response.status === 211) {
      setSnackbarMsg(response.data.message || '회원 탈퇴 실패했습니다.');
      setSnackbarOpen(true);
      return;
    }

    alert('지금까지 이용해주셔서 감사합니다.');
    signOut({ redirect: false });
  }

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
    width: isDownSm ? '250px' : '400px',
  };
  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        if (!session?.user?.name) {
          return;
        }
        deleteUser({ username: session?.user?.name, password: userPw });
      }}
      sx={{
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <WarningIcon
          sx={{
            color: 'red',
            marginRight: '.5rem',
          }}
        />
        <Typography
          sx={{
            color: 'red',
            fontSize: '1rem',
            fontWeight: 'bolder',
          }}
        >
          회원 탈퇴 시 별점 평가와 코멘트가 전부 삭제됩니다.
        </Typography>{' '}
      </Box>

      <TextField
        label='비밀번호'
        type='password'
        variant='standard'
        placeholder='비밀번호를 입력해주세요.'
        sx={inputSx}
        onChange={(e) => {
          setUserPw(e.target.value);
        }}
      />
      <Button
        variant='contained'
        type='submit'
        sx={{
          p: 1.5,
          backgroundColor: 'darkred',
          '&:hover': {
            backgroundColor: 'red',
          },
          width: '150px',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            mr: 1,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          회원 탈퇴
        </Typography>
        <PersonRemoveRoundedIcon sx={{ color: 'white' }} />
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert sx={{ width: '30rem' }} variant='filled' severity='error'>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
      <Backdrop
        sx={{
          color: (theme) => theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress size={80} color='inherit' />
      </Backdrop>
    </Box>
  );
};

export default DeleteAccountForm;
