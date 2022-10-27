import { Box } from '@mui/system';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const HomeUnverified = () => {
  const initialSx = { color: 'primary.main', display: 'inline' };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '500px',
        }}
      >
        <Image
          src={'/images/logo/logo3.png'}
          width={280}
          height={220}
          alt='FILM'
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant='h5'
            sx={{
              color: 'white',
            }}
          >
            영화 별점 평가 서비스
          </Typography>
          <Box
            sx={{
              fontSize: '2rem',
              color: 'white',
              fontWeight: '700',
            }}
          >
            <Typography variant='h2' sx={initialSx}>
              F
            </Typography>
            all{' '}
            <Typography variant='h2' sx={initialSx}>
              I
            </Typography>
            n{' '}
            <Typography variant='h2' sx={initialSx}>
              L
            </Typography>
            ove with{' '}
            <Typography variant='h2' sx={initialSx}>
              M
            </Typography>
            oney
          </Box>
        </Box>

        <Button
          variant='contained'
          sx={{
            p: 1.5,
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              mr: 1,
              fontWeight: 'bold',
            }}
          >
            시작하기
          </Typography>
          <HowToRegIcon
            sx={{
              color: 'white',
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default HomeUnverified;
