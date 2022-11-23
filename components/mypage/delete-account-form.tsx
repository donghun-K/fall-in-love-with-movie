import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import WarningIcon from '@mui/icons-material/Warning';
import theme from '../../src/theme';

const DeleteAccountForm = () => {
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
        onChange={(e) => {}}
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
    </Box>
  );
};

export default DeleteAccountForm;
