import { Box, Typography, Tooltip } from '@mui/material';
import Image from 'next/image';

const MovieCard = ({
  title,
  pubDate,
  image,
}: {
  title: string;
  pubDate: string;
  image: string;
}) => {
  return (
    <Box
      sx={{
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
        <Tooltip title={title.replace('<b>', '').replace('</b>', '')}>
          <Typography
            sx={{
              fontSize: '.9rem',
            }}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
            noWrap={true}
          />
        </Tooltip>

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
