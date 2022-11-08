import { Box } from '@mui/system';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';
import theme from '../../src/theme';

const HomeUnauth = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const initialSx = {
    color: 'primary.main',
    display: 'inline',
    fontSize: isDownSm ? '3.5rem' : '4rem',
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
          width={isDownSm ? 252 : 280}
          height={isDownSm ? 198 : 220}
          alt='FILM'
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: isDownSm ? '1.2rem' : '1.6rem',
            }}
          >
            Movie Star Ratings
          </Typography>
          <Box
            sx={{
              fontSize: isDownSm ? '1.6rem' : '2rem',
              color: 'white',
              fontWeight: '700',
            }}
          >
            <Typography sx={initialSx}>F</Typography>
            all <Typography sx={initialSx}>I</Typography>n{' '}
            <Typography sx={initialSx}>L</Typography>
            ove with <Typography sx={initialSx}>M</Typography>
            ovie
          </Box>
        </Box>
        <Link href={'/auth'}>
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
              Get Started
            </Typography>
            <HowToRegIcon
              sx={{
                color: 'white',
              }}
            />
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomeUnauth;
