import { Box, Typography, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({
  title,
  pubDate,
  image,
  link,
}: {
  title: string;
  pubDate: string;
  image: string;
  link: string;
}) => {
  const cTitle = title.replace('<b>', '').replace('</b>', '');
  const re = /[0-9]{6}/;
  const movieId = link.match(re);
  console.log(image);
  return (
    <Box
      sx={{
        userSelect: 'none',
        position: 'relative',
        width: '200px',
        hegiht: '300px',
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
      <Image
        src={image.replace('mit110', 'mit250')}
        alt={title}
        width={200}
        height={287}
      />

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
        <Link href={`/detail/${movieId}`}>
          <Tooltip title={cTitle}>
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
              {cTitle}
            </Typography>
          </Tooltip>
        </Link>
        <Typography
          sx={{
            fontSize: '.7rem',
            color: 'gray',
          }}
        >
          {pubDate}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;
