import { Box, Typography } from '@mui/material';
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
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        margin: 1,
      }}
    >
      <Image
        src={image.replace('mit110', 'mit250')}
        alt={title}
        width={200}
        height={287}
      />
      <Typography variant='body1' color='primary'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='primary'>
        {pubDate}
      </Typography>
    </Box>
  );
};

export default MovieCard;
