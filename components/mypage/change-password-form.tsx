import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import theme from '../../src/theme';
const ChangePasswordForm = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
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
        alert('추후 기능 추가 예정입니다.');
      }}
      sx={{
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <TextField
        label='현재 비밀번호'
        type='password'
        variant='standard'
        placeholder='현재 비밀번호를 입력해주세요.'
        sx={inputSx}
        onChange={(e) => {}}
      />
      <TextField
        label='새 비밀번호'
        type='password'
        variant='standard'
        placeholder='새로운 비밀번호를 입력해주세요.'
        sx={inputSx}
        onChange={(e) => {}}
      />
      <Button
        variant='contained'
        type='submit'
        sx={{
          p: 1.5,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
          width: '180px',
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
          비밀번호 변경
        </Typography>
        <PasswordRoundedIcon sx={{ color: 'white' }} />
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
