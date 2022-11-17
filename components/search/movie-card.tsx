import { Box, Typography, Tooltip, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import theme from '../../src/theme';

const MovieCard = ({
  title,
  release,
  poster,
  id,
  setIsLoading,
}: {
  title: string;
  release: string;
  poster: string;
  id: number;
  setIsLoading: Function;
}) => {
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();
  return (
    <Box
      sx={{
        userSelect: 'none',
        position: 'relative',
        width: isDownSm ? '160px' : '200px',
        hegiht: isDownSm ? '240px' : '300px',
        margin: '15px 10px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 5px 1px #333333',
        transition: '.2s',
        '& img': {
          filter: 'brightness(70%)',
          transition: '.3s',
        },
        '& div': {
          backgroundColor: '#222222',
          transition: '.3s',
        },
        '&:hover': {
          transform: 'scale(1.05)',
          '& img': {
            filter: 'brightness(100%)',
          },
          '& div': {
            backgroundColor: '#333333',
          },
        },
      }}
    >
      <Image src={poster} alt={title} width={200} height={287} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          position: 'absolute',
          width: '100%',
          height: '60px',
          padding: '5px 12px',
          bottom: '0',
          color: 'white',
        }}
      >
        <Typography
          onClick={async () => {
            setIsLoading(true);
            await router.replace(`/detail/${id}`);
            setIsLoading(false);
          }}
        >
          <Tooltip title={title}>
            <Typography
              sx={{
                fontSize: '.9rem',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
              }}
              noWrap={true}
            >
              {title}
            </Typography>
          </Tooltip>
        </Typography>
        <Typography
          sx={{
            fontSize: '.7rem',
            color: 'gray',
          }}
        >
          {release.match(/[0-9]{4}/)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;
